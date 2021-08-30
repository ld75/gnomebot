const Gnome = require('./gnome.js')
class GnomeInfos {
    constructor(Gnome) {
        this.id=Gnome.id;
        this.comment=Gnome.comment;
    }
    setLikes(likes) {this.likes=likes}
    setDislikes(dislikes) {this.dislikes=dislikes}
}
module.exports =  GnomeInfos;