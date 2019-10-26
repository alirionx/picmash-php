//---Hash path to view call function ARRAY (URL Router)--------

var path2func = {
    '\/mash': callMash, 
    '\/rating': callRating, 
    '\/upload': callUpload, 
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
    var url = "/api/upload/get";
    var method = "GET";

    var callBack = function(){ buildUpload(); } 
    var scriptTag = appendScript("content/upload.js");
    scriptTag.onload = callBack;
    scriptTag.onreadystatechange = callBack;
}

//-------------------------------------------------------------------


function menuCall(){
    rmByClass("menuBar");
    bgRequest("GET", "/api/menu/get", "", menuBuild);

}

function menuBuild(obj){
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
            
            console.log(xhttp.responseText);
            if(callBack!=false){
                var obj = jsonToObj(xhttp.responseText);
                callBack(obj);
            }
        }
    };
    xhttp.open(method, url, true);
    xhttp.send(fData);
}

//-----------------------------------------------------------------------------