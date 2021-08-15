import {Service} from "../back/service.js"
import {status} from "../back/status.js"
import {Gnome} from "../beans/gnome.js"

it('positionGpsNonDisponible_ajouterUnGnome_ThrowErreur', function () {
    let service = new Service();
    let positiongps=undefined
    let gnome = new Gnome();
    gnome.setPositionGps(positiongps);
    expect(()=>service.addAGnome(gnome)).toThrow(Error);

});
it('positionGpsDisponible_ajouterUnGnome_ajouteLeGnome', function () {
    let service = new Service();
    let positiongps="123456.123456"
    let gnome = new Gnome();
    gnome.setPositionGps(positiongps);
    service.addAGnome(gnome);
    expect(status.gnomeList.length).toEqual(1)
});
