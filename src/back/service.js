const status = require('./status.js');
const crypto = require('crypto')
const shortid = require('shortid');
const Gnome = require ('./beans/gnome.js')
    module.exports.addAGnome=function(commentaire, mobilite, gps) {
            let gnome = new Gnome(commentaire,mobilite,gps)
        console.log(commentaire,gnome)
        if (gnome.gpsposition==undefined) throw Error("pas de position gps detectee");
        status.createGnome(gnome)
        console.log("laurent3")
    }
module.exports.getNearbyGnomes=function(lat, long) {
    return status.gnomeList;
}
module.exports.createNewId=function()
{
    console.log("laurent2")
    let id = shortid.generate();
    console.log("laurent2")
    return id;
}



