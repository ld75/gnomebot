import * as utils from "../../utils.js"
export class ViewGnomePannel extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        var templatehtml = `
        <style>
        #content{
        grid-template-areas: 
            "title pouces"
            "description description"
            "commentaires commentaires";
        }
</style>
        <form>
        <div style="display: grid;" id="content">
                <div style="grid-area:title">ttttttt</div><div style="grid-area:pouces" id="pouces">ppppppp</div>
                <div style="grid-area:description" id="description"></div>
                <div style="grid-area:commentaires" id="commentaires"></div>
        </div>
        </div>
        </form>
        `
        const template=document.createElement("template");
        template.innerHTML=templatehtml
        var cloneDuTemplate = template.content.cloneNode(true);
        this.shadowRoot.appendChild(cloneDuTemplate);
    }
    static get observedAttributes()
    {
        return ['gnomeid'];
    }
    attributeChangedCallback(nameattr,oldval,newval)
    {
        if (nameattr==='gnomeid'){
            this[nameattr]=newval;
            this.displayGnome(newval)
        }
    }

    displayGnome(idgnome) {
        utils.sendGetAjax("/getgnomeinfobyid?="+idgnome,function(e){
            console.log("aaaaaaaaaaaaaaaaaaaa",e.response)
            this.shadowRoot.querySelector("#description").innerText="lmqksdflmkj"

        }.bind(this))
    }
}
window.customElements.define('view-gnome', ViewGnomePannel);
