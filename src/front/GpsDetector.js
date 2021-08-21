import * as utils from "../utils.js"
import {AlertMessage} from "./webcomponents/alertmessage.js";

export var GpsDetector= {
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
            var wpid = navigator.geolocation.watchPosition(this.findMatchingGnomesFromGpsPosition.bind(this), geo_error, geo_options);
        }
    },
    findMatchingGnomesFromGpsPosition(position) {
        utils.sendGetAjax("/getMatchingNomesFromGpsPosition?pos="+position,function(){
            console.log("actualiser gnomes à proximite")
        })
    }
}
