import * as utils from "../../utils.js"
export class ListGnomePannel extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        var templatehtml = `
        <form>
        <div><span>Mes gnomes</span><br>
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

}
refresh(listeGnomes)
{
    let listeGnomesJson = JSON.parse(listeGnomes)
}
}
window.customElements.define('list-gnomes', ListGnomePannel);
