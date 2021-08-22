const gnome = require('./beans/gnome')
const service = require('./service.js')
module.exports.createGnome=function(gnome) {
    let id = service.createNewId()
    gnome.setId(id)
    console.log(gnome)
    this.gnomeList.push(gnome)

}

module.exports.gnomeList=[]

