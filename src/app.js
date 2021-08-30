const express = require('express')
const path = require('path')
const fs = require('fs')
const http = require('http')
var formidable = require('formidable')
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
app.get('/getMatchingGnomesFromGpsPosition', function(req, res) {
    let latitude= req.lat;
    let longitude= req.long;
    res.statusCode=200;
    res.contentType("application/json")
    res.write(JSON.stringify(service.getNearbyGnomes(latitude,longitude)))
    res.end();
})
app.get('/getgnomeinfobyid', function(req, res) {
    let gnomeId= req.id;
    service.getGnomeInfosById(gnomeId);
    res.statusCode=200;
    res.contentType("application/json")
    res.write(JSON.stringify(service.getNearbyGnomes(latitude,longitude)))
    res.end();
})
app.post('/addgnome', function(req, res) {
    console.log("lauren1")
    let form = new formidable.IncomingForm();
    console.log("lauren1")
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.error(err.message);
            return;
        }
        let commentaire = fields.commentaire
        let mobilite=fields.mobilite
        let gps=fields.gps
        try {
            console.log("lauren1")
            service.addAGnome(commentaire, mobilite, gps)
            console.log("laurent4")
            res.statusCode=200;
            res.end();
        }
        catch(err)
        {
            res.statusCode = 500;
            console.log(err.message+":"+gps);
            res.write(err.message)
            res.end();
        }

    });
})

app.listen(httpPort, function () {
    console.log(`Listening on port ${httpPort}!`)
})
