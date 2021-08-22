class Gnome {
    constructor(comment, mobility, gpsposition) {
        this.gpsposition= gpsposition;
        this.comment=comment;
        this.mobility=mobility;
        this.id;
    }

    setId(id) {
        this.id=id;
    }
}
module.exports =  Gnome;