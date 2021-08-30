import {AlertMessage} from "./front/webcomponents/alertmessage.js"
export function appendFromTo(tableFrom, tableTo) {
    Object.entries(tableFrom).forEach(entry=>{
        const destValue = this.getSecurrelyDeepValueFromTable(tableTo,entry[0]);
        const isEmptyIncoming = (!isDefined(entry[1]) || entry[1].length==0)
        console.log(destValue)
        const isDestEmtpyOrDifferent = (!isDefined(destValue) || destValue.length==0 || destValue!=entry[1])
        if (!isEmptyIncoming && isDestEmtpyOrDifferent) {
            console.log(entry);
            this.setSecurrelyDeepValueFromTable(tableTo,entry[1],entry[0])
        }
    });
}


export function getIdxExtrFromIdxExtrSec(idxfile_sec) {
    let indexOfUndrscre = idxfile_sec.indexOf("_");
    if (indexOfUndrscre==-1) return -1;
    return parseInt(idxfile_sec.substr(0,indexOfUndrscre));
}
export function getSecFromIdxExtrSec(idxfile_sec) {
    let indexOfUndrscre = idxfile_sec.indexOf("_");
    if (indexOfUndrscre==-1) return -1;
    return parseInt(idxfile_sec.substr(indexOfUndrscre+1));
}


export function truncateText(text, numberOfCharMax) {
    if (text.length<numberOfCharMax)return text;
    return text.substr(0,numberOfCharMax)+"..."
}


export function cleanDeleteWithNoEmptyListButNull(table, ...indexes) {
    let deep=0;
    let valueAtDeep=table;
    let parent;
    while (deep<indexes.length)
    {
        if ((typeof valueAtDeep != "object" || valueAtDeep==null) && deep!=indexes.length) return;
        parent=valueAtDeep
        valueAtDeep=valueAtDeep[indexes[deep]]
        if (!isDefined(valueAtDeep)) return;
        console.log(deep, indexes.length)
        if (deep == indexes.length-1)parent[indexes[deep]]=null
        //valueAtDeep=null;
        deep++;
    }
    return table;

}


export function greatest(...numbers) {
    let greatest=0;
    numbers.forEach(num=>{if(num>greatest){greatest=num}});
    return greatest;
}


export function sendGetAjax(url,callbackwhenload) {
    //callbackwhenload.bind({status:200, response:"bonjour"});//mock
    //(function(){callbackwhenload({response:"{\"content\":\"hello\",\"url\":\"0_0_0\"}",status:200})})(); return; //mock
    var xhr = new XMLHttpRequest();
    xhr.open("GET",url, true);
    xhr.onload = callbackwhenload;
    xhr.send();
}
export function hashCode(unstring) {
    var hash = 0, i, chr;
    if (unstring.length === 0) return hash;
    for (i = 0; i < unstring.length; i++) {
        chr   = unstring.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export function sigmoid(number,poids) {
    return 1 / (1 + Math.exp(-number/poids));
}
export function returnValueButNull(x) {
    if (x==null) return "";
    else return x;
}

export function isNotAFloat(value)
{
    return (isNaN(value) && value.indexOf(".")==-1);
}
export async function existResource(resource) {
    const response = await fetch(resource);
    const status = await response.status;
    if (status=="404") return false
    else if (status=="200") return true;
    else return null;
}
export async function isDirectoryFilledOnServer(path){
    const response = await fetch("/isDirFilled?path="+path);
    return await response.json();
}
export async function getResourceContent(resource){
    const response = await fetch(resource);
    const content  = await response.text();
    return content
}


export function returnExtraitTitleOrReturnLeft(astring) {
    if (astring.trim().substring(0,1)=="(" && astring.indexOf(")")!=-1) return returnTitle(astring);
    return returnLeft(astring,56);
}


export function removeEndingNullFromTable(tableWithPotentialNullTail) {
    for (let i=tableWithPotentialNullTail.length; i>-1; i--)
    {
        if (!isDefined(tableWithPotentialNullTail[i])){
            tableWithPotentialNullTail.splice(i,1)
        }
        else break;
    }
    return tableWithPotentialNullTail;
}
export function buildUploadFileForm(fileinputaccept) {
    let htmlForm = document.createElement("form");
    htmlForm.id = "temp";
    let fileinput = document.createElement("input");
    fileinput.type="file"; fileinput.name="files";
    fileinput.accept=fileinputaccept;
    htmlForm.appendChild(fileinput)
    return htmlForm;
}

export function removeAccents(strAccents) {
    return strAccents.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

}


export function sendajax(formData, url, callbackwhenstart,callbackwhenprogress, callbackwhenload,callbackwhenerror, object) {
    var xhr = new XMLHttpRequest();
    xhr.onloadstart=function(e){
        if (isDefined(callbackwhenstart)) {
            let methcallbackwhenstart = callbackwhenstart.bind(this);
            methcallbackwhenstart();
        }
    }.bind(object);
    xhr.upload.onprogress = function(event) {
        if (isDefined(callbackwhenprogress)){
            let methcallbackwhenrun = callbackwhenprogress.bind(this);
            methcallbackwhenrun(Math.round(event.loaded / event.total * 100));
        }
    }.bind(object);
    xhr.onload = function(event) {
        if (xhr.status == 200)
        {
            if  (isDefined(callbackwhenload)){
                let methcallbackwhendone= callbackwhenload.bind(this);
                methcallbackwhendone(xhr)
            }
        }
        else if (xhr.status == 401)
        {
            alert("Votre session a expiré. Reconnectez-vous.");
        }
        else if (xhr.status!=undefined  && isDefined(callbackwhenerror))
        {
            let methcallbackwhenerror= callbackwhenerror.bind(this)
            methcallbackwhenerror(xhr)

        }
        else if (isDefined(callbackwhenerror))
        {
            let methcallbackwhenerror= callbackwhenerror.bind(this)
            methcallbackwhenerror(xhr)
        }
    }.bind(object);
    xhr.open('POST', url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    try{xhr.send(formData);}catch(e){console.log(e);}
}


export function getFormatNumberAndForceFromZero(chiffre)
{
    if (chiffre==null || chiffre=="" || isNaN(chiffre) || chiffre<0){
        return 0;
    }
    return chiffre;
}
export function formToString(firstchar,formdata)
{
    let res=firstchar;
    for (const[key,value] of formdata.entries())
    {
        res=res+key+"="+value+"&";
    }
    return res.substring(0,res.length-1);

}

export function updateStyleSheet(selector, text)
{
    for (let i=0; i<document.styleSheets[0].cssRules.length; i++)
    {
        if (document.styleSheets[0].cssRules[i].selectorText==selector)
        {
            document.styleSheets[0].cssRules[i].style.cssText=text;
            break;
        }
    }
}
export function deleteStyleSheet(selector)
{
    for (let i=0; i<document.styleSheets[0].cssRules.length; i++)
    {
        if (document.styleSheets[0].cssRules[i].selectorText==selector)
        {
            document.styleSheets[0].deleteRule(i);
            break;
        }
    }
}
export function addStyleSheet(text)
{
    var sheet = document.createElement('style');
    sheet.innerHTML = text;
    document.body.appendChild(sheet);
}
export function removeExtensionFromFileName(filename)
{
    let sep = filename.lastIndexOf(".");
    if (sep==-1) return filename;
    return filename.substr(0,sep);
}
export function setSendGetAjax(newgetAjaxMethod)
{
    sendGetAjax=newgetAjaxMethod;
}
export function getOffset(evt,xandycoordTableByDefaultIfError) {
    let  xScrollPos = 0,
        yScrollPos = 0;
    try{
        let el = evt.target;
        while (el && !isNaN(el.offsetLeft)) {
            if (el.scrollLeft==0&& window.scrollX!=0)
            {
                xScrollPos += el.offsetLeft - window.scrollX;
                break;
            }
            xScrollPos += el.offsetLeft - el.scrollLeft;
            el = el.offsetParent;
        }
        el = evt.target;
        while (el  && !isNaN(el.offsetTop)){
            if (el.scrollTop==0&& window.scrollY!=0)
            {
                yScrollPos += el.offsetTop - window.scrollY;
                break;
            }
            yScrollPos += el.offsetTop - el.scrollTop;

            el = el.offsetParent;
        }
        let xCursPos=isDefined(evt.clientX)?evt.clientX:evt.touches[0].clientX;
        let yCursPos=isDefined(evt.clientY)?evt.clientY:evt.touches[0].clientY;
        if (evt.target instanceof HTMLCanvasElement){
            xCursPos = xCursPos - xScrollPos;
            yCursPos = yCursPos - yScrollPos;
        }
        return { x: xCursPos, y: yCursPos };
    }
    catch(e){
        console.log("ERROR COORD")
        return xandycoordTableByDefaultIfError;
    }
}
// recuperer la taille d'un tableau
export function getNumberByIndex(myArray, index)
{
    let number=0
    for (let i =0; i<myArray.length; i++)
    {
        if (myArray[i]!=undefined)
        {
            number=number+1;
        }
        if (i==index)
        {
            break;
        }
    }
    return number;
}
export function loadImage(imageUrl){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', (err) => reject(err));
        img.src =imageUrl;
    });
}

export function getIndexByNumber(myArray, number)
{
    let numberinc=0
    for (let i =0; i<myArray.length; i++)
    {
        if (myArray[i]!=undefined)
        {
            numberinc=numberinc+1;
        }
        if (numberinc==number)
        {
            break;
        }
    }
    return numberinc;
}
export function getSizeOfArray(myArray)
{
    let ret=0;
    for ( var indx in myArray)
    {
        if ( ! isNaN(indx) && myArray[indx]!=null)
        {
            ret ++;
        }
    }
    return ret;
}
export function isDefined(value)
{
    if (value===0) return true;
    if (value==undefined || value=="undefined" || value==null || value=="null" || value=="") return false;

    else return true;
}
export function getSecureTotalDurationFromLecteurAudio()
{
    let duration = document.getElementById("lecteurAudio").duration;
    if (isDefined(duration)) return duration;
    return 0;
}
export function returnDisplayTable(table)
{
    let ret="";
    for (let i =0; i<table.length; i++)
    {
        if (table[i]!=undefined && table[i]!=null)
        {
            ret=ret+i+"-"+table[i]+",";
        }
    }
    ret=ret.substring(0,ret.length-1);
    return ret;
}
export function erreur(e)
{

    console.log("erreur");
//console.log(e);
}
export function onError(e)
{

    console.log(e);
}

export function fromFormToFormData(form){
    let formData = new FormData();
    Array.from(form.querySelectorAll("input,textarea")).forEach((e)=>{
        if (e.type=="radio")
        {
            if(e.checked) formData.append(e.name,e.value)
        }
        else{
            formData.append(e.name,e.value)
        }
    });
    return formData;
}


export function radioValue(name)
{

    var value=-1;
    var elements = document.getElementsByName(name);
    for (let i=0; i < elements.length; i++)
    {
        if (elements[i].checked)
        {
            value = elements[i].value;
            break;
        }
    }
    return value;
}

export function radioValueFromRadioElementsList(elementlist)
{
    var value=-1;
    for (let i=0; i < elementlist.length; i++)
    {
        if (elementlist[i].checked)
        {
            value = elementlist[i].value;
            break;
        }
    }
    return value;
}

export function selectOption(element, value)
{

    for(var i = 0; i < element.options.length; i++)
    {
        if (element.options[i].value==value)
        {
            element.options[i].selected=true;
        }
    }
}

export function isNull(element, index, array) {

    return (element == null);
}
export function existvalueStartFromEnd(tableau, valeur)
{

    let ret= -1;
    if (tableau!=undefined)
    {
        for (let i=tableau.length-1; i>-1; i--)
        {
            if (tableau[i]==valeur)
            {
                ret = i;
                break;
            }
        }
    }
    return ret;
}
export function removePrefix(value,prefix){

    let indexOfPrefix = value.indexOf(prefix);
    if (indexOfPrefix==-1) return value;
    return value.substring(0,indexOfPrefix);
}

export function existvalues (tableau1, tableau2)
{

    let ret= -1;
    for (let i=0; i<tableau1.length; i++)
    {
        for (let j=0; j<tableau2.length; j++)
        {
            if (tableau1[i]==tableau2[j])
            {
                ret = i;
                break;
            }
        }
    }
    return ret;
}
export function existvalueRandom(tableau, valeur)
{

    let ret= -1;
    var dejavu = new Array();
    for (let i=-1; i<tableau.length; i = Math.floor(Math.random()*tableau.length))
    {
        if (i==-1){ i = Math.floor(Math.random()*tableau.length);}
        if (getIndexFromTableByElementValueWithUndefinedSecurity(dejavu,i)==-1)
        {
            if (tableau[i]==undefined)
            {
                dejavu.push(i);
            }
            else if (tableau[i]==valeur)
            {
                ret = i;
                break;
            }
            else if (dejavu.length==tableau.length)
            {
                break;
            }
            else
            {
                dejavu.push(i);
            }
        }
    }
    return ret;
}


export function existObjectValue(tableau, valeur,field)
{
    let ret= -1;
    if (tableau!=null)
    {
        for (let i=0; i<tableau.length; i++)
        {
            if (tableau[i][field]==valeur)
            {
                ret = tableau[i];
                break;
            }
        }
    }
    return ret;
}
export function existObjectValueGetIndex(tableau, valeur,field)
{
    let ret= -1;
    if (tableau!=null)
    {
        for (let i=0; i<tableau.length; i++)
        {
            if (tableau[i][field]==valeur)
            {
                ret = i;
                break;
            }
        }
    }
    return ret;
}
export function unescapeHtml(askhtml) {
    return askhtml.replace(new RegExp("&gt;", 'g'), ">").replace(new RegExp("&lt;", 'g'), "<");
}
export function existRegexpObjectValue(tableau, valeur,field)
{
    let ret= -1;
    if (tableau!=null)
    {
        for (let i=0; i<tableau.length; i++)
        {
            if (valeur.search(tableau[i][field])!=-1)
            {
                ret = tableau[i];
                break;
            }
        }
    }
    return ret;
}
export function existRegexpValue(expr, tableauValeurs)
{
    let ret= -1;
    try
    {
        if (tableauValeurs!=null)
        {
            for (let i=0; i<tableauValeurs.length; i++)
            {
//if (valeur.search(tableau[i])!=-1)
                var valeur= tableauValeurs[i].toString()
//if (expr.search(valeur)!=-1) recemment modifie
                if (valeur.search(expr)!=-1)
                {
                    ret = valeur;
                    break;
                }
            }
        }
    }
    catch(e)
    {
        console.log(e);
    }
    return ret;
}
export function existIsTrue(tableau, valeur,condition)
{
    let ret= -1;
    try
    {
        if (tableau!=null)
        {
            for (let i=0; i<tableau.length; i++)
            {
//if (valeur.search(tableau[i])!=-1)
                var expr = tableau[i].toString()
                if (eval(expr+condition+valeur)==true)
                {
                    ret = expr;
                    break;
                }
            }
        }
    }
    catch(e)
    {
        console.log(e);
    }
    return ret;
}




//pour comparer deux dates :Retourne:
//   0 si date_1=date_2
//   1 si date_1>date_2
//  -1 si date_1<date_2
export function compare(date_1, date_2){

    let diff = date_1.getTime()-date_2.getTime();
    diff=diff==0?diff:diff/Math.abs(diff);
    return diff;
}
//pour convertir un string en date :
//On suppose que la date entr�e a �t� valid�e auparavant
//au format YYYY-mm-dd hh:mm:ss
export function getDate(strDate){

    let year = strDate.substring(0,4);
    let month = strDate.substring(5,7);
    let day = strDate.substring(8,10);
    let hour = strDate.substring(11,13);
    let min = strDate.substring(14,16);
    let sec = strDate.substring(17,19);
    let d = new Date();
    d.setDate(day);
    d.setMonth(month);
    d.setFullYear(year);
    d.setMinutes(min);
    d.setSeconds(sec);
    return d;
}

export function dateToMs(date)
{

    date = date+"";
    date=date.replace(" ","");
    date=date.replace(":","");
    date=date.replace("-","");
    date=date.replace("-","");
    date=date.replace(":","");
    if(date.length==0)
    {
        date=0;
    }
    return date;
}

export function printStacktrace(nom)
{

    /*if (arguments.callee.caller.arguments.callee.caller!=undefined)
    {
      //console.log(arguments.callee.caller.arguments.callee.caller.name+"->"+arguments.callee.caller.name);
    }
    else if (nom!=undefined)
    {
        //		console.log(nom+"->");
    }*/
}
export function getIndexFromTableByElementValue(arrayName,arrayElement)
{
    let ret=-1;
    for(var i=0; i<arrayName.length;i++ )
    {
        if(arrayName[i]==arrayElement)
        {
            ret=i;
            break;
        }
    }
    return ret;
}
export function getIndexDeepFromTableByElementValue(arrayName,arrayElement)
{
    let ret=-1;
    for(var i=0; i<arrayName.length;i++ )
    {
        if(arrayName[i]===arrayElement)
        {
            ret=i;
            break;
        }
    }
    return ret;
}

export function getIndexFromTableByElementValueWithUndefinedSecurity (tableau, valeur)
{
    if (tableau!=undefined) {
        return getIndexFromTableByElementValue(tableau, valeur);
    }
    else return -1;
}
export function getLastIndexFromTableByElementValue(arrayName,arrayElement)
{

    let ret=-1;
    for(var i=arrayName.length; i>-1;i-- )
    {
        if(arrayName[i]==arrayElement)
        {
            ret=i;
            break;
        }
    }
    return ret;
}
export function getIndexFromTableByObjectFieldElementValue(arrayName,arrayObjectFieldElement,fieldName)
{

    let ret=-1;
    for(var i=0; i<arrayName.length;i++ )
    {
        if(arrayName[i][fieldName]==arrayObjectFieldElement[fieldName])
        {
            ret=i;
            break;
        }
    }
    return ret;
}


export function getIndexFromTableByFieldElementValue(arrayName,fieldElement,fieldName)
{

    let ret=-1;
    for(var i=0; i<arrayName.length;i++ )
    {
        if(arrayName[i][fieldName]==fieldElement)
        {
            ret=i;
            break;
        }
    }
    return ret;
}



export function getFirstKeyFromTable(arrayName)
{

    let ret=-1;
    for(var i=0; i<arrayName.length;i++ )
    {
        if (arrayName[i]!=undefined)
        {
            ret=i;
            break;
        }
    }
    return ret;
}
export function removeFromTableByElementValue(arrayName,arrayElement)
{
    for(var i=0; i<arrayName.length;i++ )
    {
        if(arrayName[i]==arrayElement)
            arrayName.splice(i,1);
    }
    return arrayName;
}
export function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}
export function setSecurrelyDeepValueFromTable(table,newvalue,...indexes)
{
    let deep=0;
    let valueAtDeep=table;
    while (deep<indexes.length)
    {
        let indexToGoInto=indexes[deep]
        for (let actualindex=0; actualindex<=indexToGoInto; actualindex++)
        {
            if (deep<indexes.length-1)
            {
                if (actualindex<indexToGoInto && valueAtDeep[actualindex]==undefined) valueAtDeep[actualindex]=null;
                else if(actualindex==indexToGoInto) {
                    if (valueAtDeep[indexToGoInto]==undefined || !valueAtDeep[indexToGoInto] instanceof Array) valueAtDeep[indexToGoInto]=new Array();
                    valueAtDeep=valueAtDeep[indexToGoInto];
                    break;
                }
            }
            else if (deep==indexes.length-1)
            {
                if (actualindex<indexToGoInto && valueAtDeep[actualindex]==undefined)  valueAtDeep[actualindex]=null;
                else if(actualindex==indexToGoInto){
                    valueAtDeep[actualindex]=newvalue; break;
                }
            }
        }
        deep++;
    }
    return table;
}
export function getSecurrelyDeepValueFromTable(table, ...indexes)
{
    let deep=0;
    let valueAtDeep=table;
    while (deep<indexes.length)
    {
        if ((typeof valueAtDeep != "object" || valueAtDeep==null) && deep!=indexes.length) return null;
        valueAtDeep=valueAtDeep[indexes[deep]]
        if (!isDefined(valueAtDeep)) return null;
        deep++;
    }
    return valueAtDeep;
}
function displayProgressionEventSourceText(event) {
    let progressiontext = document.createElement("span");
    progressiontext.innerText = " ..." + event.data;
    document.body.querySelector("#prompt div div").appendChild(progressiontext);
}

function displayEventSourceMsgOfParseText() {
    var eventSource = new EventSource("/bigSablierParseTexte");
    eventSource.onmessage = function (event) {
        (new AlertMessage()).appearAndDissappear(event.data);
    };
    eventSource.addEventListener("phraseLue", function (event) {
        (new AlertMessage()).appearAndDissappear(event.data);
    });
    eventSource.addEventListener("progressionAvancementParseText", function (event) {
        displayProgressionEventSourceText(event);
        if (event.data=="FIN") {
            eventSource.close();
            (new AlertMessage()).appearAndDissappear("Traitement terminé!");
        }
    });
}

export function WorkerMessage(cmd, parameter, title) {
    this.cmd = cmd;
    this.parameter = parameter;
    this.title = title;
}
export function incrementToButNotGreaterThen(aincrementer, aajouter, limite)
{
    let ret= aincrementer+aajouter;
    if (ret>limite) return limite;
    return ret;
}
export function decrementButNotLowerThan(adecrementer, aretirer, limite)
{
    let ret= adecrementer-aretirer;
    if (ret<limite) return limite;
    return ret;
}
export function WorkerRecordFunctionArgument(methode, argument) {
    this.methode = methode;
    this.argument= argument;
}
export function quiParlePourUnExtrait(acteurSilence,sec)
{
    var idActors = new Array();
    for (let indexActor=0;indexActor<acteurSilence.length;indexActor++)
    {
        for (let seconde=sec+1; seconde--; seconde>-1)
        {
            if (getSecurrelyDeepValueFromTable(acteurSilence,indexActor,seconde)==0){
                idActors.push(indexActor);
                break;
            }
            else if (getSecurrelyDeepValueFromTable(acteurSilence,indexActor,seconde)==1) break;
        }
    }

    return idActors;
}
export function removeAllEventListnerAndReplaceWithBindingfunction(element, deepclone, typeOfInteraction, replacingfunction,eventLisnterCaptureOption)
{
    let newElement = element.cloneNode(deepclone);
    element.parentNode.replaceChild(newElement, element);
    newElement.addEventListener(typeOfInteraction, replacingfunction.bind(newElement),eventLisnterCaptureOption);
}
export function removeRetourChariots(string)
{
    return string.replace(new RegExp('\n', 'g'),'');
}
export function removeAllEventListnerAndReplaceWithNoBindingFunction(element, deepclone, typeOfInteraction, replacingfunction,eventLisnterCaptureOption)
{
    let newElement = element.cloneNode(deepclone);
    element.parentNode.replaceChild(newElement, element);
    newElement.addEventListener(typeOfInteraction, replacingfunction,eventLisnterCaptureOption);
}
export function removeLastComma(returningCode) {
    if (returningCode.endsWith(",")) return returningCode.substring(0, returningCode.length - 1);
    return returningCode;
}
export function returnLeft(astring, number) {
    if (astring.length<=number) return astring;
    return astring.substring(0,number);
}

export function returnTitle(astring) {
    return astring.substring(0,astring.indexOf(")")+1);
}


