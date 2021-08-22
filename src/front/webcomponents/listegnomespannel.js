import * as utils from "../../utils.js"
export class ListGnomePannel extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        var templatehtml = `
        <form>
        <div><span>Mes gnomes</span><br>
        <div id="list" style="display: flex; flex-wrap: wrap"; flex-direction="row"></div>
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
    this.shadowRoot.querySelector("#list").innerHTML="";
    let listeGnomesJson = JSON.parse(listeGnomes)
    listeGnomesJson.forEach(gnome=>this.addNewGnome(gnome));
}
addNewGnome(gnome)
{
    let template= document.createElement("template");
    template.innerHTML=`<div style="width:30%">${gnome.mobility}</div><div style="width:50%">${gnome.comment}</div><div style="width:20%"><a id="${gnome.id}">voir</a></div>`
    this.shadowRoot.querySelector("#list").appendChild(template.content.cloneNode(true))
    this.shadowRoot.querySelector("#"+gnome.id).addEventListener("click",function(evt){frontDisplayer.displaySee(evt.target.id)})
}
}
window.customElements.define('list-gnomes', ListGnomePannel);
