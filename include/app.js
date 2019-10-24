//---Hash path to view call function ARRAY (URL Router)--------
var path2func = {
    '\/home': callHome, 
    '\/example\/(.*)': callExample
}


//---The View Caller via RegEx Match ;)------------------------
function viewCall(){
    viewMatch = false;
    
    hashStr = location.hash.substr(1);
    if(hashStr.indexOf("/") === -1 || hashStr == "/"){
        hashStr = "/home";
        location.hash = "/home";
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
//-------------------------------------------------------------------

//---Example functions called by the View Caller---------------------

function callHome(paras){
    console.log(paras);
    console.log("Call Home");
}

function callExample(paras){    
    //-Define Vars for JSON API and build CallBack--------------
    exPara = paras[0];
    var url = "/api/example/get/"+exPara;
    var method = "GET";

    //-Dynamic Load JS File, Call JSON API and init View Build--
    var callBack = function(){ reqCall(url, method, buildExample); } 
    var scriptTag = appendScript("content/example.js");
    scriptTag.onload = callBack;
    scriptTag.onreadystatechange = callBack;
}
//-------------------------------------------------------------------



//---Some Little Helpers (e.g. HttpXMLReq instead of fuggin Ajax-----

function reqCall(url, method, callBack=false){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            console.log(xhttp.responseText);
            try{
                var fw_data = JSON.parse(xhttp.responseText);
            }
            catch(err) {
                var fw_data = xhttp.responseText;
            }

            if(callBack!=false){
                callBack(fw_data);
            }
        }
    }
    xhttp.open(method, url, true);
    xhttp.send();
}

//--------------------------------

function appendScript(lnk){
    scriptTag = document.createElement("SCRIPT");
    scriptTag.src = lnk;
    scriptTag.type = "text/javascript";
    scriptTag.setAttribute("dyn", "1");
    document.head.appendChild(scriptTag);
    
    return scriptTag;
}

//-------------------------------------------------------------------