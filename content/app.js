//---Hash path to view call function ARRAY (URL Router)--------

var path2func = {
    '\/mash': callMash, 
    '\/rating': callRating, 
    '\/upload': callUpload, 
    '\/mgmt': callMgmt,
    '\/login': callLogin,
    '\/example\/(.*)': callExample
}

function callExample(){}

//---The View Caller via RegEx Match ;)------------------------
function viewCall(){
    viewMatch = false;
    
    hashStr = location.hash.substr(1);
    if(hashStr.indexOf("/") === -1 || hashStr == "/"){
        hashStr = "/mash";
        location.hash = "/mash";
    }

    for(var prop in path2func){
        var patt = new RegExp(prop, "i");
        //var patt = /\/tbl\/(.*)/i;
        var paras = hashStr.match(patt);
        
        if(paras != null ){
            viewMatch = true;
            paras.shift();
            path2func[prop](paras);
        }
    }
    
    if(viewMatch == false){
        alert("view not found");
    }
}

//------------------------

function callMash(paras){    
    
    menuCall();
    
    //-Define Vars for JSON API and build CallBack--------------
    var url = "/api/mash/get";
    var method = "GET";

    //-Dynamic Load JS File, Call JSON API and init View Build--
    var callBack = function(){ bgRequest(method, url, "", buildMash); } 
    var scriptTag = appendScript("content/mash.js");
    scriptTag.onload = callBack;
    scriptTag.onreadystatechange = callBack;
}

function callRating(paras){    
    
    menuCall();
    
    var url = "/api/rating/get";
    var method = "GET";

    var callBack = function(){ bgRequest(method, url, "", buildRating); } 
    var scriptTag = appendScript("content/rating.js");
    scriptTag.onload = callBack;
    scriptTag.onreadystatechange = callBack;
}

function callUpload(paras){

    menuCall();

    var callBack = function(){ buildUpload(); } 
    var scriptTag = appendScript("content/upload.js");
    scriptTag.onload = callBack;
    scriptTag.onreadystatechange = callBack;
}

function callMgmt(paras){

    menuCall();

    var callBack = function(){ buildMgmt(); } 
    var scriptTag = appendScript("content/mgmt.js");
    scriptTag.onload = callBack;
    scriptTag.onreadystatechange = callBack;
}

function callLogin(paras){

    menuCall();

    var callBack = function(){ buildLogin(); } 
    var scriptTag = appendScript("content/login.js");
    scriptTag.onload = callBack;
    scriptTag.onreadystatechange = callBack;
}

//-------------------------------------------------------------------


function menuCall(){
    rmByClass("menuBar");
    bgRequest("GET", "/api/menu/get", "", menuBuild);

}

function menuBuild(obj){

    rmByClass("menuBar");
    var headBlock = document.getElementById("headBlock");

    var menuBar = document.createElement("DIV");
    menuBar.classList.add("menuBar");
    headBlock.appendChild(menuBar);

    for(var cnt in obj){
        curElm = obj[cnt];
        var btn = document.createElement("DIV");
        menuBar.appendChild(btn);
        btn.innerHTML = curElm["txt"];
        var typ = curElm["typ"];
        mkLnk[typ](btn, curElm["lnk"]);
    }
}


//-Little Helpers--------------------------------------------------------------

function msgBoxCall(msgTxt, callBack = function(){}){
    
    var target = blockerCall();

    var FormHlTxt = "System Message";

    var stdForm = document.createElement("DIV");
    target.appendChild(stdForm);
    stdForm.classList.add("stdForm");
    stdForm.style.position = "relative";
    stdForm.style.top = "20vh";

    var FormHl = document.createElement("DIV");
    stdForm.appendChild(FormHl);
    FormHl.setAttribute("css", "hl");
    FormHl.innerHTML = FormHlTxt;

    var msgBox = document.createElement("DIV");
    stdForm.appendChild(msgBox);
    msgBox.setAttribute("css", "msgBox");
    msgBox.innerHTML = msgTxt;

    var okBtn = document.createElement("BUTTON");
    stdForm.appendChild(okBtn);
    okBtn.innerHTML = "Ok";
    okBtn.onclick = function(){
        rmByClass("blocker");
        this.parentNode.parentNode.removeChild(this.parentNode);
        callBack();
    }
}

function confirmBoxCall(msgTxt, fwFunc){
    
    var target = blockerCall();

    var FormHlTxt = "System Confirmation";

    var stdForm = document.createElement("DIV");
    target.appendChild(stdForm);
    stdForm.classList.add("stdForm");
    stdForm.style.position = "relative";
    stdForm.style.top = "20vh";

    var FormHl = document.createElement("DIV");
    stdForm.appendChild(FormHl);
    FormHl.setAttribute("css", "hl");
    FormHl.innerHTML = FormHlTxt;

    var msgBox = document.createElement("DIV");
    stdForm.appendChild(msgBox);
    msgBox.setAttribute("css", "msgBox");
    msgBox.innerHTML = msgTxt;

    var okBtn = document.createElement("BUTTON");
    stdForm.appendChild(okBtn);
    okBtn.innerHTML = "Ok";
    okBtn.onclick = function(){
        rmByClass("blocker");
        this.parentNode.parentNode.removeChild(this.parentNode);
        fwFunc();
    }

    var cancelBtn = document.createElement("BUTTON");
    stdForm.appendChild(cancelBtn);
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.onclick = function(){
        rmByClass("blocker");
        this.parentNode.parentNode.removeChild(this.parentNode);
    }
}


var mkLnk = {};
mkLnk["href"] = function(btn, lnk){
    btn.onclick = function(){
        window.location.href = lnk;
    }
}
mkLnk["hash"] = function(btn, lnk){
    btn.onclick = function(){
        location.hash = lnk;
    }
}
mkLnk["func"] = function(btn, lnk){
    btn.onclick = function(){
        mFwFuncAry[lnk]();
    }
}

var mFwFuncAry = [];
mFwFuncAry["logout"] = logOut;


function rmByClass(clName, callBack=false){
    
    var elmList = document.getElementsByClassName(clName);
    for (var i = 0; i < elmList.length; i++) {
        elmList[i].parentNode.removeChild(elmList[i]);
    }
    
    if(callBack!=false){
        callBack();
    }
}

//---------------------------------

function jsonToObj(str){
    try{
        var obj = JSON.parse(str);
    }
    catch(err) {
        //console.log(err.message);
        obj = {};
    }
    return obj;
}

//---------------------------------

function blockerCall(){
    var containerTop = document.getElementById("containerTop");
    
    var blocker = document.createElement("DIV");
    containerTop.appendChild(blocker);
    blocker.classList.add("blocker");

    return blocker;
}

//---------------------------------

function appendScript(lnk){
    scriptTag = document.createElement("SCRIPT");
    scriptTag.src = lnk;
    scriptTag.type = "text/javascript";
    scriptTag.setAttribute("dyn", "1");
    document.head.appendChild(scriptTag);
    
    return scriptTag;
}

//---------------------------------

function bgRequest(method, url, fData, callBack=false){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            console.clear();
            console.log(xhttp.responseText);
            if(callBack!=false){
                var obj = jsonToObj(xhttp.responseText);
                callBack(obj);
            }
        }
        
        var staStr = this.status.toString();
        if (this.readyState == 4 && ( staStr.startsWith("4") || staStr.startsWith("5") ) ){
            msgBoxCall("Background API Request went wrong", function(){ location.reload();} );
        }
        if (this.readyState == 4 && this.status == 303) {
            msgBoxCall("Wrong Password", function(){ location.hash = "/mash";} );
        }
    };
    xhttp.open(method, url, true);
    xhttp.send(fData);
}

//---------------------------------

function loaderCall(target=document.body){
		
    var blocker = document.createElement("div");
    blocker.classList.add("blocker");

    var loader_frame = document.createElement("div");
    loader_frame.classList.add("spinner");

    for (var i = 1; i < 4; i++) {

        var loader_bounce = document.createElement("div");
        loader_bounce.classList.add("bounce"+i);
        loader_frame.appendChild(loader_bounce);
    }

    blocker.appendChild(loader_frame);
    target.appendChild(blocker);
}

//---------------------------------

function logOut(){

    var msgTxt = "Do you really want to leave the admin mode?" 
    var fwFunc = function(){
        var fData = new FormData();
        var fwFunc2 = function(){location.href = "/";} 
        bgRequest("POST", "/api/logout", fData, fwFunc2);
    }
    confirmBoxCall(msgTxt, fwFunc);
}


//-----------------------------------------------------------------------------