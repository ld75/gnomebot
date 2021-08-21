const status = require('./status.js');
const Gnome = require ('../beans/gnome.js')
    module.exports.addAGnome=function(commentaire, mobilite, gps) {
            console.log("gps: ",gps)
            let gnome = new Gnome(commentaire,mobilite,gps)
        if (gnome.gpsposition==undefined) throw Error("pas de position gps detectee");
        status.gnomeList.push(gnome)
    }
module.exports.getNearbyGnomes=function(lat, long) {
    return status.gnomeList;
}



