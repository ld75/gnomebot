import * as utils from '../../utils.js';
export class AlertMessage extends HTMLElement {
    constructor(endessousde) {
        super();
    }

    connectedCallback() {

    }

    appear(message) {
        document.querySelector("#alertmessage").innerHTML = message;
    }
}

var montag =window.customElements.define('alert-message', AlertMessage);

