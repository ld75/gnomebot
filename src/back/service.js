const status = require('./status.js');
class Service
{
    addAGnome(gnome) {
        if (gnome.positiongps==undefined) throw Error("pas de position gps detectee");
        status.gnomeList.push(gnome)
    }

}