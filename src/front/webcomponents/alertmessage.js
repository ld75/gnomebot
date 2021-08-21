import Button from './button.js';
import * as utils from '../../utils.js';
export class AlertMessage extends HTMLElement
    {
            constructor(endessousde)
            {
                super();
                 var maclasse=this;
                 var timeoutAppearDissapear=null;
                 this.endessousde=endessousde;
                 this.fullScreenCloseable=true;
                 this.appearAndDissapearCloseable=false;
                 var timeoutDissapear=null;
                 var fullscreen = false;
                this.attachShadow({mode:'open'});
                    var monTemplate =document.createElement("template");
                    monTemplate.innerHTML=`
                    <style>
                    custom-button
                            {
                            --button-background-default:#888da8;
                            --button-background-disabled:#d0c5c5;
                            --button-background-important:#1e73be;
                            }
                        :host div
                        {
                                transition: margin-top 1s ease-out, opacity 2s ease;
                            -moz-transition: margin-top 1s ease-out, opacity 2s ease;
                            -webkit-transition: margin-top 1s ease-out, opacity 2s ease;
                            -o-transition: margin-top 1s ease-out, opacity 2s ease;
                            background-image: url("${pageContextRequestContextPath}/img/bulle.png");
                            background-repeat: no-repeat;
                            background-size: 20px auto;
                            background-color: #FFFFFF;
                            border: 1px solid #adb8c0;
                            color: #000000;
                            margin: 40%;
                            position: fixed;
                            opacity=0.0;
                        }
                        :host h3
                        {
                           font-family: Helvetica;
                           font-size: 1.4em;
                           margin: 0px 5px 0px 40px;
                           float:right;
                        }
                        .fullscreen
                        {
                            width: 100%;
                            height: 100%;
                            border: 1px solid;
                            margin:0% !important;
                            left:0px;
                        }
                        .fullscreen h3
                         {
                            text-align:center !important;
                             margin:0% !important;
                             float:none !important;
                         }
                    </style>
                    <div>
                    <custom-button src="${pageContextRequestContextPath}/img/delete.png" style="float:right; top:0px"></custom-button>
        <h3></h3>
                    </div>
                           `;
                           //<h3>${message}</h3>
                           //<div class="message ${cible}" style="margin-top:${top}; margin-left:${left}">
                var cloneDuTemplate = monTemplate.content.cloneNode(true);
                this.shadowRoot.appendChild(cloneDuTemplate);
             }
             connectedCallback()
                {
                    if (this.fullscreen==true)
                    {
                        this.style.position="absolute";
                        this.shadowRoot.querySelector("div").classList.add('fullscreen');
                    }
                    this.shadowRoot.querySelector("custom-button").addEventListener('click',function(evt){
                        console.log("closeAlert");
                        clearTimeout(this.timeoutDissapear);
                        clearTimeout(this.timeoutAppearDissapear);
                        this.parentNode.removeChild(this);
                        this.deleteMessageFromStackMessages(this.shadowRoot.querySelector("h3").innerHTML);
                        }.bind(this));
                }
           appear(message)
           {
               return new Promise((resolve)=>{
                   console.log(message)
                if (message!=undefined && this.isMessageExistsInStackMessage(message)==-1)
                {
                    //let positionIntrinseque=3;
                    //let decallement=positionIntrinseque+memoclap.alertMessagesStack.length*20;
                    //if (this.endessousde!=undefined)
                    //{
                    //    this.endessousde.insertAdjacentElement('afterbegin', this);
                    //}
                    //else
                    //{
                    //    document.body.insertAdjacentElement('afterbegin', this);
                    //}
                    //this.shadowRoot.querySelector("h3").innerHTML=message;
                    //this.shadowRoot.querySelector("div").style.opacity=0.0;
                    //this.shadowRoot.querySelector("div").style.marginTop=decallement+"px";
                    //if (this.fullscreen) {
                    //    window.scrollTo(0,0);
                    //    if (this.fullScreenCloseable==false)
                    //    {
                    //        this.shadowRoot.querySelector("custom-button").style.display="none";
                    //    }
                    //}
                    //var timeoutMessage1=setTimeout(function(){
                    //    this.shadowRoot.querySelector("div").style.opacity=1.0;
                    //    let actualMarginTop=this.shadowRoot.querySelector("div").style.marginTop;
                    //    this.shadowRoot.querySelector("div").style.marginTop=parseInt(actualMarginTop,10)-3+"px";
                    //    this.shadowRoot.querySelector("div").style.zIndex=memoclap.alertMessagesStack.length+memoclap.zIndexOfPrompt+1;
                    //    if (this.fullscreen) window.scrollTo(0,0);
                    //    return resolve(this.shadowRoot.querySelector("h3"));
                    //    }.bind(this),200);
                    //this.addMessageInStackMessages(this.shadowRoot.querySelector("h3").innerHTML);
                  }
               })
            }
            deleteMessageFromStackMessages(message)
            {
            //    let indexPreviousMessage = utils.getIndexFromTableByElementValueWithUndefinedSecurity(memoclap.alertMessagesStack,message);
            //    if (indexPreviousMessage!=-1) memoclap.alertMessagesStack.splice(indexPreviousMessage,1);
            }
            addMessageInStackMessages(message)
            {
            //  if (utils.getIndexFromTableByElementValueWithUndefinedSecurity(memoclap.alertMessagesStack,message)==-1)
            //  memoclap.alertMessagesStack.splice(0,0,message);
            }
            isMessageExistsInStackMessage(message)
            {
             // return utils.getIndexFromTableByElementValueWithUndefinedSecurity(memoclap.alertMessagesStack,message);
            }
            dissappear (message)
            {
                if (message!=undefined)
               {
                    if (this.parentNode==null)
                    {document.body.insertAdjacentElement('afterbegin', this);}
                    this.deleteMessageFromStackMessages(this.shadowRoot.querySelector("h3").innerHTML);
                    if (message==""){this.parentNode.removeChild(this);return;}
                        this.shadowRoot.querySelector("h3").innerHTML=message;
                        if (this.appearAndDissapearCloseable==false)
                        {
                            this.shadowRoot.querySelector("custom-button").style.display="none";
                        }
                        this.shadowRoot.querySelector("div").style.opacity=1.0;
                        if (this.fullscreen) {window.scrollTo(0,0);}
                        this.timeoutDissapear=setTimeout(function(){
                            this.shadowRoot.querySelector("div").style.opacity=0.0;
                            this.shadowRoot.querySelector("div").style.marginTop=memoclap.alertMessagesStack.length*3+"px";
                            this.deleteMessageFromStackMessages(message);
                            setTimeout(function(){
                                    try{
                                        this.parentNode.removeChild(this);
                                        }catch(e){}
                                    }.bind(this),1000);
                            if (this.fullscreen){ document.body.scrollIntoView(true)};
                            }.bind(this),2000);
               }
            }
            appearAndDissappearCloseable(message)
            {
                this.appearAndDissapearCloseable=true;
                this.appearAndDissappear(message);
            }
            appearAndDissappear (message)
            {
                if (this.appearAndDissapearCloseable==false)
                {
                    this.shadowRoot.querySelector("custom-button").style.display="none";
                }
                this.appear(message);
                this.timeoutAppearDissapear=setTimeout(function(){
                    this.dissappear(message);
                }.bind(this),2000);
            }
            progress(percent)
            {
                if (this.shadowRoot.querySelector("progress")==null)
                {
                    var progressbar = document.createElement('progress');
                    progressbar.setAttribute("min","0");
                    progressbar.setAttribute("max","100");
                    progressbar.setAttribute("value","0");
                    progressbar.textContent="0%";
                    progressbar.style.marginTop="10%";
                    progressbar.style.width="100%";
                    this.shadowRoot.querySelector("div").appendChild(progressbar);
                }
                var progressBar = this.shadowRoot.querySelector("progress");
                progressBar.value = percent;
                progressBar.textContent = progressBar.value+"%";
            }
             attributeChangedCallback(nameattr,oldval,newval)
              {
                if (nameattr==='fullscreencloseable'){
                            if (newval=="true"){
                                 this.shadowRoot.querySelector("custom-button").style.display="block";
                             }
                            else if (newval=="false")
                            {
                                 this.shadowRoot.querySelector("custom-button").style.display="none";
                            }
                    }
              }

              static get observedAttributes()
              {
                return ['fullscreencloseable'];
              }
    }

var montag =window.customElements.define('alert-message', AlertMessage);

