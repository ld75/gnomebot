import * as utils from "../utils.js"
import {AlertMessage} from "./webcomponents/alertmessage.js";

export var GpsDetector= {
    gpsPid:null,
    activateGps: function(){
        if (!navigator.geolocation) {
            (new AlertMessage).appear("Votre navigateur ne permet pas d'utiliser la fonctionnalité GPS")
        } else {
            function geo_error() {
                (new AlertMessage).appear("Ce contenu fonctionne avec la localisation GPS. Veuillez activer la localisation GPS et rechargez la page.");
            }
            var geo_options = {
                enableHighAccuracy: true,
                maximumAge        : 30000,
                timeout           : 27000
            };
            this.gpsPid = navigator.geolocation.watchPosition(this.findMatchingGnomesFromGpsPosition.bind(this), geo_error, geo_options);
        }
    },
    findMatchingGnomesFromGpsPosition(position) {
        if (!frontDisplayer.isListGnomesDisplayed()) return;
        utils.sendGetAjax("/getMatchingGnomesFromGpsPosition?lat="+position.coords.latitude+"&long="+position.coords.longitude,function(e){
            if (frontDisplayer.isListGnomesDisplayed()) frontDisplayer.getListGnomesPannel().refresh(e.response)
        })
    },
    getCurrentPosition()
    {
        return new Promise((resolve,reject)=>{
            navigator.geolocation.getCurrentPosition(
                function(position){return resolve(position)}
            ,function(error){(new AlertMessage()).appear(error); return reject()})
        });
    }
}
