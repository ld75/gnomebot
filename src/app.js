//import {Service} from './js/service.js'
const http=require('http')
const port = 8080
const fs=require('fs');


const server= http.createServer(function(request, response){
    console.log("reception requete"+request.url)
    let service = new Service();
    if(request.url=="/") renderIndex(response)
    else if (request.url=="/addgnome") addgnome(request,response)
    else if (request.url=="/hello")  sendHelloWorld(response);
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
    console.log("raaaaaaaaaaa")
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
function addgnome(request, response) {
    let commentaire = request.getParameter("commentaire")
    let mobilite=request.getParameter("mobilite")
    let gps=request.getParameter("gps")
}
