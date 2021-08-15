const express = require('express')
const path = require('path')
const fs = require('fs')
const http = require('http')

const service = require('./back/service.js')
const httpPort = 8080

//const httpsPort = 443
//const key = fs.readFileSync('./certs/localhost.key');
//const cert = fs.readFileSync('./certs/localhost.crt');
const app = express()

const server = http.createServer(app);

app.use((req, res, next) => {
    next();
})

app.use(express.static(path.join(__dirname, '.')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.post('/addgnome', function(req, res) {
    let commentaire = req.paragetParameter("commentaire") //TODO: a faire marcher....
    let mobilite=req.getParameter("mobilite")
    let gps=req.getParameter("gps")
    service.addAGnome({}) //TODO: instancier le gnome dans service plutot: donc changer les tests unitaires. (il faut les refaire marcher car KO depuis migration vers require)
})

app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
})
