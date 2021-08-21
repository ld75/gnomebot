import * as utils from "../../utils.js"
export class MenuGnome extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        var templatehtml = `
<style>
div {
display:flex;
cursor:pointer;
color:blue;
justify-content: space-around;
}
</style>
        <div>
            <a>Home</a><a>Ajouter un gnome </a>
        </div>
        `
        const template=document.createElement("template");
        template.innerHTML=templatehtml
        var cloneDuTemplate = template.content.cloneNode(true);
        this.shadowRoot.appendChild(cloneDuTemplate);
    }
    connectedCallback()
    {
        this.shadowRoot.querySelectorAll("a")[0].addEventListener("click",function(){
            frontDisplayer.displayListeGnomes()
        }.bind(this))
        this.shadowRoot.querySelectorAll("a")[1].addEventListener("click",function(){
            frontDisplayer.displayAddGnome()
        }.bind(this))
    }
}
window.customElements.define('menu-gnome', MenuGnome);

