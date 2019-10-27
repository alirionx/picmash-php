
function buildLogout(){

    var msgTxt = "Do you really want to leave the admin mode?" 
    var fwFunc = function(){
        var fData = new FormData();
        var fwFunc2 = function(){location.href = "/";} 
        bgRequest("POST", "/api/logout", fData, fwFunc2);
    }
    confirmBoxCall(msgTxt, fwFunc);
}