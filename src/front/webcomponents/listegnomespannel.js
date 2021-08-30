import * as utils from "../../utils.js"
export class ListGnomePannel extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        var templatehtml = `
        <style>a{cursor:pointer}</style>
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
    template.innerHTML=`<div style="width:30%">${gnome.mobility}</div><div style="width:50%">${gnome.comment}</div><div name="link" style="width:20%"><a>voir</a></div>`
    let newChild = template.content.cloneNode(true);
    this.shadowRoot.querySelector("#list").appendChild(newChild)
    this.shadowRoot.querySelector("#list div[name=link]:last-of-type>a").addEventListener("click",function(){frontDisplayer.displaySee(gnome.id)})
}
}
window.customElements.define('list-gnomes', ListGnomePannel);
