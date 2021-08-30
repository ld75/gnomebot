var service = require ('../back/service.js')
var status = require('../back/status.js')
var Gnome = require('../back/beans/gnome.js')
var Eval = require('../back/beans/eval.js')


it('positionGpsNonDisponible_ajouterUnGnome_ThrowErreur', function () {
    expect(()=>service.addAGnome("","",undefined)).toThrow(Error);

});
it('positionGpsDisponible_ajouterUnGnome_ajouteLeGnome', function () {
    let positiongps="123456.123456"
    service.addAGnome("","",positiongps);
    expect(status.gnomeList.length).toEqual(1)
});
it('should getNearby gnomes', function () { //TODO a faire avec Turf
    service.addAGnome("comment","mobilité",123)
    let res = service.getNearbyGnomes(2,2)
    console.log(res)
    expect(res[0].comment).toBeTruthy();
    expect(res[0].mobility).toBeTruthy();
    expect(res[0].gpsposition).toBeTruthy();
    expect(res[0].id).toBeTruthy();
});
it('should generate id', function () {
    let newid = service.createNewId();
    console.log(newid)
});
it('gnomeDontExist_should getGnomeInfosById_returnException', function () {
    let id = service.addAGnome("comment","mobilité",123)
    console.log(id)
    expect(()=>service.getGnomeInfosById("321")).toThrow(Error);

});
it('gnomeExists_should getGnomeInfosById', function () {
    let id = service.addAGnome("comment","mobilité",123)
    for (let i=0; i<5; i++) {
        status.aevals.push(new Eval(id, true))
    }
    for (let i=0; i<6; i++) {
        status.aevals.push(new Eval(id, false))
    }
    let gnomeInfos = service.getGnomeInfosById(id);
    expect(gnomeInfos.comment).toEqual("comment")
    expect(gnomeInfos.likes).toEqual(5)
    expect(gnomeInfos.dislikes).toEqual(6)
    expect(gnomeInfos.comments.length).toEqual(3)
});