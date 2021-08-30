const gnome = require('./beans/gnome')
const aeval = require('./beans/eval')
const service = require('./service.js')
module.exports.gnomeList=[]
module.exports.aevals=[]

module.exports.getGnomeById=function(id){
    return this.gnomeList.filter(gnome=>gnome.id==id)[0]
}
module.exports.createGnome=function(gnome) {
    let id = service.createNewId()
    gnome.setId(id)
    console.log(gnome)
    this.gnomeList.push(gnome)
    return id
}
module.exports.getEvalsByGnomeId=function(gnomeid)
{
    console.log(this.aevals,gnomeid)
    return this.aevals.filter(aeval=>aeval.gnomeid==gnomeid)
}
