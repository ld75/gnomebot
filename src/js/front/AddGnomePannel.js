export class AddGnomePannel extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        var templatehtml = `
        <div><span>Ajouter un gnome</span><br>
        <table>
        <tr><td><input type="radio" value="fixe" name="mobilite"></td><td>Gnome fixe</td></tr>
        <tr><td><input type="radio" value="mobile" name="mobilite"></td><td>Gnome mobile</td></tr>          
          </table>
        
        </div>
        `
        const template=document.createElement("template");
        template.innerHTML=templatehtml
        var cloneDuTemplate = template.content.cloneNode(true);
        this.shadowRoot.appendChild(cloneDuTemplate);
    }
        connectedCallback()
{

}
}
window.customElements.define('gnomebot-addgnome', AddGnomePannel);
