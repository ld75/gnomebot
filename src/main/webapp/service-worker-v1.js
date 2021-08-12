class EssaisParUrl {
    constructor()
    {
        this.nbessaisParUrl=new Array();
    }
    clearForUrl(url)
    {
        delete(this.nbessaisParUrl[url]);
    }
    getNbForUrl(url)
    {
        let nbessais= this.nbessaisParUrl[url];
        if (nbessais==undefined){
            return 0;
        }
        else
        {
            return this.nbessaisParUrl[url];
        }
    }
    incrementNbForUrl(url)
    {
        let nb = this.nbessaisParUrl[url];
        if (nb==undefined) this.nbessaisParUrl[url]=1;
        else this.nbessaisParUrl[url]=nb+1;
    }
}

class RangedResponse {
    constructor()
    {
        this.CHUNK_SIZE= 1024 * 512;
    }
    static _isRangeRequest (request) {
        const header = request.headers.get('Range');
        if (!header) {
            return false;
        }

        const rangeHeader = header.trim().toLowerCase();
        // Not a range request
        if (!rangeHeader) {
            return false;
        }

        return true;
    }

    static getBestCacheMatch (request) {
        return caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                return caches.match(`${request.url}_0`, {cacheName: cacheName})
                    .then(response => {
                        if (response) {
                            return cacheName;
                        }

                        return null;
                    });
            }));
        }).then(possibleMatches => {
            let cachesWithMatch = possibleMatches.filter(m => m !== null);
            if (cachesWithMatch.length === 0) {
                return null;
            }

            // If there's more than one match, exclude the prefetch cache.
            if (cachesWithMatch.length > 1) {
                cachesWithMatch = cachesWithMatch.filter(m => m !== 'prefetch');
            }

            // Now pick the first possible match.
            return cachesWithMatch[0];
        });
    }

    static canHandle (request) {
        if (!RangedResponse._isRangeRequest(request)) {
            return Promise.resolve(false);
        }

        return this.getBestCacheMatch(request).then(cacheName => {
            if (!cacheName) {
                return false;
            }

            // Check for the first chunk in cache storage.
            return caches.match(`${request.url}_0`, {cacheName: cacheName})
                .then(firstChunk => {
                    if (!firstChunk) {
                        return false;
                    }

                    // Failing that, look up the chunks that would be needeed, and assume
                    // that if we need -- say -- chunks 1 to 10, that checking for 1 & 10
                    // is sufficient for success.
                    const header = request.headers.get('Range');
                    const rangeHeader = header.trim().toLowerCase();
                    const size = parseInt(firstChunk.headers.get('Content-Length'), 10);
                    if (!size) {
                        return false;
                    }

                    const {start, end} = this._getStartAndEnd(rangeHeader, size);
                    const startIndex = Math.floor(start / this.CHUNK_SIZE);
                    const endIndex = Math.floor(end / this.CHUNK_SIZE);

                    return Promise.all([
                        caches.match(`${request.url}_${startIndex}`, {cacheName: cacheName}),
                        caches.match(`${request.url}_${endIndex}`, {cacheName: cacheName})
                    ]).then(v => {
                        // Start by checking that there are at least two responses.
                        let hasData = v.every(r => !!r);

                        if (!hasData) {
                            return false;
                        }

                        // If both chunks exist, we need to refine the query further by
                        // ensuring that the endIndex chunk has actually got sufficient
                        // bytes to respond.
                        const chunkSize = parseInt(v[1].headers.get('x-chunk-size'), 10);
                        const finalByteInEndChunk =
                            endIndex * this.CHUNK_SIZE + chunkSize;

                        if (finalByteInEndChunk < end) {
                            console.log(`${request.url}
								  Cannot handle range request because unable to find
								  final chunk byte is at ${finalByteInEndChunk}, but end
								  requires ${end}.`);
                        }

                        return finalByteInEndChunk >= end;
                    });
                });
        });
    }

    static _isOpaqueOrError (response) {
        if (response.status != 200) {
            return response;
        }
    }

    static _getStartAndEnd (rangeHeader, size) {
        if (!rangeHeader.startsWith('bytes=')) {
            throw new Error('Invalid range unit');
        }

        const rangeParts = /(\d*)-(\d*)/.exec(rangeHeader);
        if (!rangeParts[1] && !rangeParts[2]) {
            throw new Error('Invalid range unit');
        }

        let start = 0;
        let end = 0;
        if (rangeParts[1] === '') {
            start = size - Number(rangeParts[2]);
            end = size;
        } else if (rangeParts[2] === '') {
            start = Number(rangeParts[1]);
            end = size;
        } else {
            start = Number(rangeParts[1]);
            // Range values are inclusive, so add 1 to the value.
            end = Number(rangeParts[2]) + 1;
        }

        if (start < 0) {
            throw new Error('Range not satisfiable');
        }

        return {
            start,
            end
        };
    }

    static _createRangedResponse (blob, headers, start, end, offset=0) {
        let s = start - offset;
        let e = end - offset;
        let total = parseInt(headers.get('Content-Length'), 10);

        if (Number.isNaN(total)) {
            throw new Error('Unable to create byte range: content-length not set.');
        }

        const slicedBlob = blob.slice(s, e);
        const slicedResponse = new Response(slicedBlob, {
            status: 206,
            headers
        });

        slicedResponse.headers.set('X-From-Cache', 'true');
        slicedResponse.headers.set('Content-Length', slicedBlob.size);
        slicedResponse.headers.set('Content-Range',
            `bytes ${start}-${end - 1}/${total}`);
        return slicedResponse;
    }

    static create (request) {
        if (!RangedResponse._isRangeRequest(request)) {
            return response;
        }

        return this.getBestCacheMatch(request).then(cacheName => {
            if (!cacheName) {
                return null;
            }

            return caches.match(request.url + '_0', {cacheName: cacheName})
                .then(chunkedResponse => {
                    if (chunkedResponse) {
                        return RangedResponse._createFromChunks(request, cacheName);
                    }

                    return RangedResponse._createFromEntireBuffer(request, cacheName);
                });
        });
    }

    static _createFromEntireBuffer (request, cacheName) {
        return caches.match(request, {cacheName: cacheName}).then(response => {
            if (RangedResponse._isOpaqueOrError(response)) {
                return response;
            }

            const header = request.headers.get('Range');
            const rangeHeader = header.trim().toLowerCase();

            try {
                const {start, end} = RangedResponse._getStartAndEnd(rangeHeader);

                return response.blob().then(blob => {
                    return this._createRangedResponse(blob,
                        response.headers, start, end);
                });
            } catch (e) {
                return new Response(e.message, {status: 400});
            };
        });
    }

    static _createFromChunks (request, cacheName) {
        try {
            const header = request.headers.get('Range');
            const rangeHeader = header.trim().toLowerCase();
            const {start, end} = RangedResponse._getStartAndEnd(rangeHeader);
            const startIndex = Math.floor(start / this.CHUNK_SIZE);
            const endIndex = Math.floor(end / this.CHUNK_SIZE);
            const offset = startIndex * this.CHUNK_SIZE;

            // If the start and end come from the same chunk then pull that chunk
            // from the cache and use it directly.
            if (startIndex === endIndex) {
                return caches.match(request.url + '_' + startIndex, {cacheName: cacheName})
                    .then(response => {
                        return response.blob().then(blob => {
                            return RangedResponse._createRangedResponse(blob,
                                response.headers, start, end, offset);
                        });
                    });
            }

            const bufferSize = (endIndex - startIndex + 1) * this.CHUNK_SIZE;
            const responseBuffer = new ArrayBuffer(bufferSize);
            const responseView = new Uint8Array(responseBuffer);
            const cachedResponses = [];

            for (let i = startIndex; i <= endIndex; i++) {
                cachedResponses.push(
                    caches.match(request.url + '_' + i, {cacheName: cacheName})
                );
            }

            let headers;
            return Promise.all(cachedResponses)
                .then(responses => {
                    if (responses.length === 0) {
                        return Promise.reject('Unable to locate chunks.');
                    }

                    // Take the first set of headers as representative.
                    headers = responses[0].headers;
                    return Promise.all(responses.map(r => r.arrayBuffer()));
                })
                .then(buffers => {
                    // Copy the buffers into the response buffer for us to slice.
                    let k = 0;
                    buffers.forEach(buffer => {
                        const view = new Uint8Array(buffer);
                        for (let j = 0; j < view.length; j++) {
                            responseView[k++] = view[j];
                        }
                    });
                }).then(_ => {
                    // The start and end indexes need shifting back because we're not
                    // slicing the entire array buffer, just the relevant chunks.
                    const blob = new Blob([responseBuffer]);
                    return RangedResponse._createRangedResponse(blob, headers,
                        start, end, offset);
                });
        } catch (e) {
            console.log(e);
            return new Response(e.message, {status: 400});
        };
    }
}

//-------------------FIN CLASSES



var cacheVersion='v1';
var cacheFiles=[
    '/offline.html',
    '/*'

];

var nbEssaisParUrl=new EssaisParUrl();
var neverCachedUrls="nevercachedUrl1,nevercachedUrl2";

var FALLBACK ='/offline.html';
/*'<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" stroke-linejoin="round">' +
'  <path stroke="#DDD" stroke-width="25" d="M99,18 15,162H183z"/>' +
'  <path stroke-width="17" fill="#FFF" d="M99,18 15,162H183z" stroke="#eee"/>' +
'  <path d="M91,70a9,9 0 0,1 18,0l-5,50a4,4 0 0,1-8,0z" fill="#aaa"/>' +
'  <circle cy="138" r="9" cx="100" fill="#aaa"/>' +
'</svg>';
*/

self.addEventListener('install', function(evt) {
    console.log('WORKER: The service worker is being installed.');
    evt.waitUntil(precache());
});
function precache() {
    return caches.open(cacheVersion).then(function (cache) {
        return cache.addAll(cacheFiles);
    }).catch(err=>{console.log("WORKER ERR: "+err)})
}

self.addEventListener("activate", function(event) {
    console.log('WORKER: The service worker is being activated.');
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(
                    keys.filter(function (key) {
                        return !key.startsWith(cacheVersion);
                    })
                        .map((key)=>{
                            console.log('WORKER: version '+key+' supprimee.');
                            return caches.delete(key); // on supprime une vieille version
                        })
                );
            })
            .then(function() {
                console.log('WORKER: activate completed.');
            })
    );
});


self.addEventListener('fetch', function(evt) {
    try{
        if (evt.request.method==="GET" && urlmustbecached(evt.request.url)) // attention si je traite fais un fetch de requete post ça va poster 2 fois!! une fois sans passer par le service-worker et une fois via le service-worker
        {
            let response = proceedFetch(evt.request,evt);
            evt.respondWith(response);
        }
    }
    catch(err)
    {
        console.log("WORKER ERR"+err);
        console.trace();
    }
});
function urlmustbecached(url)
{
    return url.lastIndexOf(neverCachedUrls)==-1
}

function proceedFetch(request,event) {
    let requestClone=request.clone();
    console.log("WORKER: url: "+request.url);
    console.log("WORKER: range: "+request.headers.get("range"));
    console.log("WORKER proceedFetch");
    return getResponseFromNetworkAndCachit(requestClone,1000)
        .then(function(response){
            console.log("WORKER: responsestatus: "+response.status+" requesturl "+ requestClone.url);
            nbEssaisParUrl.clearForUrl(requestClone.url);
            return response;
        })
        .catch(function(err){
            let nbessais=nbEssaisParUrl.getNbForUrl(requestClone.url)
            let res=null;
            if (nbessais<4){
                console.log("WORKER: echoue "+nbessais+ " for request " +requestClone.url+" retry...");
                nbEssaisParUrl.incrementNbForUrl(requestClone.url);
                res=proceedFetch(request,event);
            }
            else
            {
                nbEssaisParUrl.clearForUrl(requestClone.url);
                console.log("WORKER: error! "+err+ " for request " +requestClone.url+" try in cache...");
                res = fromCacheButFallback(event.request,event);
                console.log("WORKER fallback is "+res);

            }
            return res;
        });
}
function sendMessageToUserAgent(messageType,detail)
{
    self.clients.matchAll().then(function (clients){
        clients.forEach(function(client){
            client.postMessage({ // voir LINKServiceworkerinitializer
                msg: messageType,
                url: detail
            });
        });
    });
}
function fetchWithTimeout (request, timeout = 7000) {
    return Promise.race([// execute toutes les promesses du tableau mais seul le resultat de la plus rapide est retourné
        fetch(request),
        new Promise((_, reject) =>
            setTimeout(() => reject( new Error("WORKER: Network TimedOut")), timeout)
        )
    ]);
}

function getResponseFromNetworkAndCachit(request, timeout)
{

    sendMessageToUserAgent("Info:query_network",request.url);
    return fetchWithTimeout(request,timeout)
        .then((response)=>{
            let responseToCach=response.clone();
            if (request.headers.get('range')) { // aujourd'hui on a plus besoin de toute cette partie les services wokers dans le browser savent gerer les reponses 206 desormais
                let promiseWithResponseRanged = cacheAndModifyResponseForRange(request,response);
                console.log("WORKER:rangedResponseReturned: "+promiseWithResponseRanged);
                return promiseWithResponseRanged;
            }
            else{
                console.log("pas range audio "+ request.url);
                cachIt(request,responseToCach)
                return responseToCach.clone();
            }
        })
        .then((response)=>{
            console.log("WORKER: ResponseRgetResponseFromNetworkAndCachit returns:"+response);
            sendMessageToUserAgent("Info:response_network",request.url);
            return response;
        });
}

function cacheAndModifyResponseForRange(request,response)
{
    return new Promise((resolve,reject)=>{
        try{
            cachIt(request,response);
            console.log("WORKER: RangeRequest cached. Response is:"+response);
            let range = request.headers.get('range');
            let rangePos =Number(/^bytes\=(\d+)\-$/g.exec(range)[1]);
            let responseHeader = {"status": "206","statusText": "Partial Content","headers": []};
            resolve(buildResponseWithRangeHeader(response,responseHeader,rangePos));
        }
        catch(e){reject(e);}
    })

}
function buildResponseWithRangeHeader(response,responseHeader,rangePos)
{
    return response.arrayBuffer().then(arrayBuffer=>{
        try{
            responseHeader.headers.push(["Content-Range", "bytes " + rangePos + "-" +(arrayBuffer.byteLength - 1) + "/" + arrayBuffer.byteLength])
            let rangedResponse = new Response(arrayBuffer.slice(rangePos),responseHeader);
            console.log("WORKER: ResponseHeaderBuilt: "+responseHeader);
            console.log("WORKER: ResponseHeaderAndBodyBuilt: "+rangedResponse);
            return rangedResponse;
        }
        catch(e) {throw new Error(e)}
    });

}
function cachIt(request,responseToCache){
    let cloneResponseToCache= responseToCache.clone();
    caches.open(cacheVersion)
        .then(function(cache){
            try{
                cache.put(request,cloneResponseToCache);
            }
            catch(err){console.log("WORKER ERR "+err)}
        }).catch(err=>{console.log("WORKER ERR "+err);})
    return responseToCache;
}


function fromCacheButFallback(request,event){
    let res= caches.open(cacheVersion)
        .then(cache=>{
                let res = cache.match(request)
                    .then(response=>{
                        if (!response)
                        {
                            let res = useFallback(event).then(res=>{
                                return res;
                            });
                            return res;
                        }
                        else
                        {
                            sendMessageToUserAgent("Warn:response_cache",request.url);
                            return response;
                        }
                    })
                    .catch(err=>{ // n'arrive jamais car cache.match n'envoie jamais une exception mais une response undefined si KO
                        console.log("WORKER ERR"+err);
                        let res = useFallback(event).then(res=>res);
                        return res;
                    });
                return res;
            }
        );
    return res;
}


function useFallback(event) {
    if (!event.clientId)
    {
        let res = returnImageKO().then(res=>{
            return res;
        });
        return res;
    }
    clients.get(event.clientId)
        .then(function(client){
            if (!client) {
                let res = returnImageKO().then(res=>{
                    return res;
                });
                return res;
            }
            else{
                sendMessageToUserAgent("Err:no_network_no_cache",event.request.url);
            }

        })
}
function returnImageKO()
{
    return caches.open(cacheVersion).then(cache=>{
        return cache.match(FALLBACK)
            .then(response=> {
                if (!response) {
                    let image = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" stroke-linejoin="round">  <path stroke="#DDD" stroke-width="25" d="M99,18 15,162H183z"/>'+
                        '<style>'+
                        '.heavy { font: italic bold 30px sans-serif; }'+
                        '.rouge { font: bold 40px serif; fill: red; }'+
                        '</style>'+
                        '<path stroke-width="17" fill="#FFF" d="M99,18 15,162H183z" stroke="#eee"/>  <path d="M91,70a9,9 0 0,1 18,0l-5,50a4,4 0 0,1-8,0z" fill="#aaa"/>  <circle xmlns="http://www.w3.org/2000/svg" cy="138" r="9" cx="100" fill="#aaa"/>'+
                        '<text x="40" y="100" class="rouge">Pas de réseau</text>'+
                        '<text x="40" y="150" class="heavy">Réessayez plus tard.</text>'+
                '</svg>';
                let response = new Response(image,{ headers: {'Content-Type': 'image/svg+xml'}});
        return Promise.resolve(response);
    }
    return Promise.resolve(response);
})
})
}
