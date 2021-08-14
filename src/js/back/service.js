import {status} from "./status.js"
export class Service
{
    consoler()
    {
        console.log("hihi")

    }

    ajouterUnGnome(gnome) {
        if (gnome.positiongps==undefined) throw Error("pas de position gps detectee");
        status.gnomeList.push(gnome)
    }

    getStatus() {
        return
    }
}