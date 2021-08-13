const http=require('http')
const port = 8080
const fs=require('fs');

const server= http.createServer(function(request, response){
    console.log("reception requete"+request.url)
    //if (request.url=="/manifest.json") renderManifest(reponse);
        //else
            renderIndex(response)
    //  sendHelloWorld(response);
})

server.listen(port,function(error){
    if(error){
        console.log("erreur: ",error)
    }
    else
    {
        console.log("server ecoute sur port"+port)
    }
})

function outputFile(res, filePath) {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(filePath, function (error, data) {
        if (error) {
            console.log(error)
            res.writeHead(404)
            res.write("non trouvé")
        } else res.write(data)
        res.end();
    });
}

function renderIndex(res) {
    let filePath = "src/index.html";
    outputFile(res, filePath);
}
function renderManifest(reponse) {
    let filePath = "src/manifest.json";
    outputFile(res, filePath);
}

function sendHelloWorld(response) {
    response.write("hello node")
    response.end();
}
