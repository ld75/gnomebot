import * as utils from "../../utils.js"
export class Addgnomepannel extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
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

    addGnome() {
        let formData = new FormData(this.shadowRoot.querySelector("form"))
                utils.sendajax(formData, "./addgnome", null,null,null,null,this);

        }
}
window.customElements.define('add-gnome', Addgnomepannel);
