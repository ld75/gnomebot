import Tooltip  from "./tooltip.js";
    export default  class Button extends Tooltip
        {
            constructor()
            {
                super();
                this.attachShadow({mode:'open'});
                    var monTemplate =document.createElement("template");
                    monTemplate.innerHTML=`
                           <style>
                                     :host .cliquable,:host slot
                                     {
                                         cursor: pointer;
                                     }
                                     :host(:hover) .button
                                     {
                                      box-shadow: 1px 1px 0px black;
                                      filter: brightness(120%);
                                      }
                                      .cliquable > * {
                                          pointer-events: none;
                                        }
                                      .button
                                      {
                                      max-width:100%;
                                      }
                                     :host .loopanim
                                     {
                                     background-image: none;
                                         animation-name: looping;
                                         animation-duration: 2s;
                                         animation-iteration-count: infinite;
                                         animation-timing-function: linear;
                                     }
                                     @-webkit-keyframes looping
                                     {
                                               0% { background:white; color:black}
                                               50% {background:black; color:white}
                                               100% {background:white;color:black}
                                               }
                                     			@-moz-keyframes looping
                                               {
                                               0% { background:white; color:black}
                                               50% {background:black; color:white}
                                               100% {background:white; color:black}
                                               }
                                               @-o-keyframes looping
                                               {
                                               0% { background:white; color:black}
                                               50% {background:black; color:white}
                                               100% {background:white; color:black}
                                               }
                                               @-ms-keyframes looping
                                               {
                                               0% { background:white; color:black}
                                               50% {background:black; color:white}
                                               100% {background:white; color:black}
                                               }
                                      .progressbar
                                      {
                                        background-color:red;
                                        width:0%;
                                        display:block;
                                      }
                                    .svgdivandobj
                                    {
                                        width:40px;
                                    }
                           </style>
                           <div class="progressbar"></div>
                           <div class="cliquable">
                               <div class="libelle"></div>
                               <img class="button"/>
                               <slot style="padding-bottom:15px; display:block"></slot>
                               <div id="svg" style="display:none" class="svgdivandobj"/>
                           </div>
                           `;
                var cloneDuTemplate = monTemplate.content.cloneNode(true);
                this.shadowRoot.appendChild(cloneDuTemplate);
                this.shadowRoot.querySelector("img").style.background="var(--button-background-default)";
             }
             static get observedAttributes()
            {
                    return ['src','status','onclick','progress','tooltip','libelle','svg','svgstyle'];
            }
            attributeChangedCallback(nameattr,oldval,newval) // exec chaque fois qu'un attrbt de observedAttributes change LINK77738
             {
                if (nameattr==='libelle')
                {
                    this.shadowRoot.querySelector(".libelle").innerHTML=newval;
                }
                if (nameattr==='src')
                {
                    try { //tryCatch to support jest
                        this.shadowRoot.querySelector("img").setAttribute("src", newval);
                        this.shadowRoot.querySelector("#svg").style.display="none";
                        this.shadowRoot.querySelector("img").style.display="inline";
                    } catch (e) {
                    }
                }
                if (nameattr=='svg')
                {
                    let svgobj = document.createElement("object");
                    svgobj.data=newval;
                    this.shadowRoot.querySelector("#svg").innerHTML="";
                    this.shadowRoot.querySelector("#svg").appendChild(svgobj);
                    this.shadowRoot.querySelector("#svg").style.display="block";
                    this.shadowRoot.querySelector("img").style.display="none";
                }
                 if (nameattr=='svgstyle' && this.shadowRoot.querySelector("#svg object")!=undefined)
                 {
                     this.shadowRoot.querySelector("#svg object").style=newval;
                 }
                 if (nameattr==='tooltip')
                                {
                                    super.defineTooltip(this,newval);
                                    if(this.isUniqueChildOfSlotIsATooltip()) this.shadowRoot.querySelector("slot").classList.remove("loopanim");
                                }
                else if (nameattr==='status')
                {
                    this["status"]=newval;
                    if (newval=="waiting"){
                        this.shadowRoot.querySelector("img").classList.remove('loopanim');
                        this.shadowRoot.querySelector("slot").classList.remove("loopanim");
                        this.shadowRoot.querySelector("img").style.background="url('"+pageContextRequestContextPath+"/img/spinnngwait.gif') center center no-repeat";
                         this.shadowRoot.querySelector("img").style.backgroundSize="104%";
                         this.shadowRoot.querySelector("img").style.opacity="1";
                         if (this["action"]==null)
                         {
                            if (!this.getAttribute("onclick")==false){
                                this["action"]=this.getAttribute("onclick");
                            }
                            else if (this["click"]!=undefined)
                            {
                                this["action"]=this["click"];
                            }
                         }
                         this.setAttribute("onclick","");
                    }
                    else if (newval=="clignote")
                    {
                        this.shadowRoot.querySelector("div").style.width = "0%";
                        this.shadowRoot.querySelector("img").classList.add("loopanim");
                        if(!this.isUniqueChildOfSlotIsATooltip()) this.shadowRoot.querySelector("slot").classList.add("loopanim");
                        this.shadowRoot.querySelector("img").style.background="";
                        this.shadowRoot.querySelector("img").style.opacity="1";
                        if (this["action"]!=undefined)
                        {
                            this.setAttribute("onclick",this["action"]);
                        }
                    }
                    else if (newval=="disabled")
                    {
                        this.shadowRoot.querySelector("div").style.width = "0%";
                        this.shadowRoot.querySelector("img").classList.remove('loopanim');
                        this.shadowRoot.querySelector("slot").classList.remove("loopanim");
                        this.shadowRoot.querySelector("img").style.background="var(--button-background-disabled)";
                        this.shadowRoot.querySelector("img").style.backgroundSize="";
                        this.shadowRoot.querySelector("img").style.opacity="0.5";
                        if (this["action"]==null)
                         {
                            if (!this.getAttribute("onclick")==false){
                                this["action"]=this.getAttribute("onclick");
                            }
                            else if (this["click"]!=undefined)
                            {
                                this["action"]=this["click"];
                            }
                         }
                        this.setAttribute("onclick","");
                    }
                    else if (newval=="transparent")
                    {
                        this.shadowRoot.querySelector("div").style.width = "0%";
                        this.shadowRoot.querySelector("img").classList.remove('loopanim');
                        this.shadowRoot.querySelector("slot").classList.remove("loopanim");
                        this.shadowRoot.querySelector("img").style.background="var(--button-background-default)";
                        this.shadowRoot.querySelector("img").style.backgroundSize="";
                        this.shadowRoot.querySelector("img").style.opacity="0.0";
                        this.shadowRoot.querySelector(".cliquable").style.cursor="default";
                        if (this["action"]==null)
                         {
                            if (!this.getAttribute("onclick")==false){
                                this["action"]=this.getAttribute("onclick");
                            }
                            else if (this["click"]!=undefined)
                            {
                                this["action"]=this["click"];
                            }
                         }
                        this.setAttribute("onclick","");
                    }
                    else if (newval=="red")
                    {
                        this.shadowRoot.querySelector("div").style.width = "0%";
                        this.shadowRoot.querySelector("img").classList.remove('loopanim');
                        this.shadowRoot.querySelector("slot").classList.remove("loopanim");
                        this.shadowRoot.querySelector("img").style.background="var(--button-background-important)";
                        this.shadowRoot.querySelector("img").style.backgroundSize="";
                        this.shadowRoot.querySelector("img").style.opacity="1";
                        this.setAttribute("onclick",this.action);
                    }
                    else{
                        this.shadowRoot.querySelector("div").style.width = "0%";
                        this.shadowRoot.querySelector("img").classList.remove('loopanim');
                        this.shadowRoot.querySelector("slot").classList.remove("loopanim");
                        this.shadowRoot.querySelector("img").style.background="var(--button-background-default)";
                        this.shadowRoot.querySelector("img").style.backgroundSize="";
                        this.shadowRoot.querySelector("img").style.opacity="1";
                        this.setAttribute("onclick",this.action);
                    }
                }
                else if (nameattr==='onclick' && newval!='' && newval!="undefined")
                {
                    this["action"]=newval;
                }
                  else if (nameattr=='progress')
                  {
                       /*if (this["status"]=="waiting")
                       {*/
                            let maxwith=this.shadowRoot.querySelector("img").width;
                            if (maxwith>0){
                                    this.shadowRoot.querySelector(".progressbar").style.height="5px";
                                    this.shadowRoot.querySelector(".progressbar").style.width = newval+ "%";
                                    if (newval>90 || newval==0)
                                    {this.shadowRoot.querySelector(".progressbar").style.height="";}

                            }
                       /*}*/
                  }
             }

            isUniqueChildOfSlotIsATooltip() {
                return this.shadowRoot.querySelector("slot").assignedElements().filter(function(element){return element.id=="tooltip"}).length == 1;
            }

            connectedCallback()
             {
                super.connectedCallback();
                 try {//tryCatch to support jest
                     if (this.shadowRoot.querySelector("img").src == "" && this.shadowRoot.querySelector(".svgdivandobj").style.display=="none") {
                         this.shadowRoot.querySelector(".cliquable").style.backgroundColor = "gray";
                         this.shadowRoot.querySelector(".cliquable").style.color = "white";
                         this.shadowRoot.querySelector(".cliquable").style.textAlign = "center";
                         this.style.width = "100%";
                     }
                 } catch (e) {
                 }
                 if(this.isUniqueChildOfSlotIsATooltip()) this.shadowRoot.querySelector("slot").classList.remove("loopanim");
             }

             /* pas reussi à faire marcher ça LinkKDKDKD
             addEventListener(type, fct, capture) {
               // init
               this.eventListenerList = this.eventListenerList || {};
               this.eventListenerList[type] = this.eventListenerList[type] || [];
               capture = capture || false;
               // appel fonction original
               this.parentElement.addEventListener( type, fct, capture);
               // sauvegarde dans liste
               this.eventListenerList[type].push({
                 listener: fct,
                 useCapture: capture
               });
             }*/
            }
             var montag =window.customElements.define('custom-button', Button);
