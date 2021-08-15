import {Addgnomepannel} from "./webcomponents/addgnomepannel.js";

export var FrontDisplayer= {
    displayAddGnome() {
        let addGnomePannel = new Addgnomepannel();
        document.body.querySelector("#app").appendChild(addGnomePannel)
    }
}