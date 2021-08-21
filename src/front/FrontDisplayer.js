import {AddGnomePannel} from "./webcomponents/addgnomepannel.js";
import {ListGnomePannel} from "./webcomponents/listegnomespannel.js";

export var FrontDisplayer= {

    emptyDisplayApp() {
     document.body.querySelector("#app").innerHTML="";
    },
    displayAddGnome() {
        this.emptyDisplayApp();
        let addGnomePannel = new AddGnomePannel();
        document.body.querySelector("#app").appendChild(addGnomePannel)
    },
    displayListeGnomes() {
        this.emptyDisplayApp();
        let listGnomePannel = new ListGnomePannel();
        document.body.querySelector("#app").appendChild(listGnomePannel)
    },
    isListGnomesDisplayed() {
        return document.querySelector("list-gnomes")!=undefined
    },
    getListGnomesPannel() {
        return document.querySelector("list-gnomes")
    }
}