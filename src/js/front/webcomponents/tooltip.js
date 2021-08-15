export default class Tooltip extends HTMLElement
        {
            constructor()
            {
                super();
                    var monTemplate =document.createElement("template");
                    monTemplate.innerHTML=`
                           <style>
                                #tooltip
                                {
                                position:absolute;
                                display:none;
                                background-color: rgba(255, 255, 255, 0.7);
                                color:black;
                                }
                                #tooltip:hover
                                {
                                display:block;
                                }
                           </style>
                           <span id="tooltip"></span>
                           </div>
                           `;
                this.cloneDuTemplate = monTemplate.content.cloneNode(true);
             }
             defineTooltip(buttonchild,tooltipattribute)
             {
             this.child=buttonchild;
             this.tooltip=tooltipattribute;
             if (this.tooltip!=null && this.querySelector("#tooltip")!=null)
             {
                this.querySelector("#tooltip").innerHTML=tooltipattribute;
             }
             }
             connectedCallback()
             {
                 if (this.cloneDuTemplate!=undefined){
                         this.appendChild(this.cloneDuTemplate);
                 }
                  if(this.querySelector("#tooltip")!=null && this.child!=null){
                                    this.querySelector("#tooltip").innerHTML=this.tooltip;
                                    this.child.addEventListener("mouseover", function (event){
                                        this.querySelector("#tooltip").style.display="block";
                                    }.bind(this));
                                    this.child.addEventListener("mouseleave", function (event){
                                         this.querySelector("#tooltip").style.display="none";
                                     }.bind(this));
                                 }
             }

            }
            var montag =window.customElements.define('custom-tooltip', Tooltip);
