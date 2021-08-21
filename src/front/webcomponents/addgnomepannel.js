import * as utils from "../../utils.js"
import {GpsDetector} from "../GpsDetector.js";
import {AlertMessage} from "./alertmessage.js";
export class AddGnomePannel extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        this.gpsDetector = GpsDetector;
        var templatehtml = `
        <form>
        <div><span>Ajouter un gnome</span><br>
        <table>
        <tr><td><input type="radio" value="fixe" name="mobilite"></td><td>Gnome fixe</td></tr>
        <tr><td><input type="radio" value="mobile" name="mobilite"></td><td>Gnome mobile</td></tr>
        <tr><td colspan="2">Commentaires</td> </tr>          
        <tr><td colspan="2"><input type="textarea" name="commentaires"></td> </tr>          
        <tr><td colspan="2"><input type="button" value="Valider"></td> </tr>          
          </table>
        
        </div>
        </form>
        `
        const template=document.createElement("template");
        template.innerHTML=templatehtml
        var cloneDuTemplate = template.content.cloneNode(true);
        this.shadowRoot.appendChild(cloneDuTemplate);
    }
        connectedCallback()
{
    this.shadowRoot.querySelector("input[type=button]").addEventListener("click",function(){
        this.addGnome();
    }.bind(this))
}

    async addGnome() {

        let formData = new FormData(this.shadowRoot.querySelector("form"))
        try{
        let position = await this.gpsDetector.getCurrentPosition()
        formData.append("gps",position.coords.latitude+" "+position.coords.longitude);
        utils.sendajax(formData, "./addgnome", null,null,null,
            function(e){
                (new AlertMessage()).appear(e.response);
        },this);
        }
        catch(err){
            (new AlertMessage()).appear("position gps non detectée pour pouvoir ajouter un gnome")
        }
        }
}
window.customElements.define('add-gnome', AddGnomePannel);
