var service = require ('../back/service.js')
var status = require('../back/status.js')
import {Gnome} from "../back/beans/gnome.js"

it('positionGpsNonDisponible_ajouterUnGnome_ThrowErreur', function () {
    expect(()=>service.addAGnome("","",undefined)).toThrow(Error);

});
it('positionGpsDisponible_ajouterUnGnome_ajouteLeGnome', function () {
    let positiongps="123456.123456"
    service.addAGnome("","",positiongps);
    expect(status.gnomeList.length).toEqual(1)
});
it('should getNearby gnomes', function () {
    service.addAGnome("comment","mobilité",123)
    let res = service.getNearbyGnomes(2,2)
    console.log(res)
    expect(res[0].comment).toBeTruthy();
    expect(res[0].mobility).toBeTruthy();
    expect(res[0].gpsposition).toBeTruthy();
    expect(res[0].id).toBeTruthy();

});