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
    let commentaire = req.commentaire
    let mobilite=req.mobilite
    let gps=req.gps
    service.addAGnome(commentaire, mobilite, gps)
})

app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
})
