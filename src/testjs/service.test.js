var service = require ('../back/service.js')
var status = require('../back/status.js')
import {Gnome} from "../beans/gnome.js"

it('positionGpsNonDisponible_ajouterUnGnome_ThrowErreur', function () {
    expect(()=>service.addAGnome("","",undefined)).toThrow(Error);

});
it('positionGpsDisponible_ajouterUnGnome_ajouteLeGnome', function () {
    let positiongps="123456.123456"
    service.addAGnome("","",positiongps);
    expect(status.gnomeList.length).toEqual(1)
});
