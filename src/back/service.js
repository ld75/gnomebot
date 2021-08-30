const status = require('./status.js');
const crypto = require('crypto')
const shortid = require('shortid');
const Gnome = require ('./beans/gnome.js')
const Eval = require ('./beans/eval.js')
const GnomeInfo = require ('./beans/gnomeInfos.js')
    module.exports.addAGnome=function(commentaire, mobilite, gps) {
            let gnome = new Gnome(commentaire,mobilite,gps)
        console.log(commentaire,gnome)
        if (gnome.gpsposition==undefined) throw Error("pas de position gps detectee");
        let newid= status.createGnome(gnome)
        console.log("laurent3")
        return newid;
    }
module.exports.getNearbyGnomes=function(lat, long) {
    return status.gnomeList;
}
module.exports.createNewId=function()
{
    let id = shortid.generate();
    return id;
}
module.exports.getGnomeInfosById=function(id)
{
    let gnomeFound = status.getGnomeById(id)
    if (gnomeFound==undefined) throw new Error("gnome non trouvé")
    let gnomeInfo = new GnomeInfo(gnomeFound);
    let evals = status.getEvalsByGnomeId(id)
    let likes = evals
                    .map(aeval=>aeval.likedislike==true?1:0)
                    .reduce(function(carry, number){
                        return carry + number;
                    }, 0)
    console.log(likes)
    let dislikes = evals
        .map(aeval=>aeval.likedislike==false?1:0)
        .reduce(function(carry, number){
            return carry + number;
        }, 0)

    gnomeInfo.setLikes(likes)
    gnomeInfo.setDislikes(dislikes)
    return gnomeInfo;
}




