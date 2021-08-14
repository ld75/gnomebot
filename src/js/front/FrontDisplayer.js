import {AddGnomePannel} from "./AddGnomePannel.js";

export var FrontDisplayer= {
    displayAddGnome() {
        let addGnomePannel = new AddGnomePannel();
        document.body.querySelector("#app").appendChild(addGnomePannel)
    }
}