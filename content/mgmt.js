function buildMgmt(){

    var pageHlTxt = "Web App Management";

    var mgmtActs = {
        "Change Admin Passord": mgmt_ResPwdCall,
        "Reset Rating": mgmt_ResRatingCall,
        "Delete all Pictures": mgmt_DelPicsCall,
        "Reset the WebApp": mgmt_ResAppCall 
    }

    var containerTop = document.getElementById("containerTop");
    containerTop.innerHTML = "";

    var containerMain = document.getElementById("containerMain");
    containerMain.innerHTML = "";

    var pageHl = document.createElement("DIV");
    containerTop.appendChild(pageHl);
    pageHl.classList.add("pageHl");
    pageHl.innerHTML = pageHlTxt;

    for(btnTxt in mgmtActs){
        var curFunc = mgmtActs[btnTxt];

        var mgmtBtn = document.createElement("DIV");
        containerMain.appendChild(mgmtBtn);
        mgmtBtn.classList.add("meinBtn");
        mgmtBtn.innerHTML = btnTxt;
        mgmtBtn.onclick = curFunc;
    }


}

//-----------------------------------

function mgmt_ResPwdCall(){
    
    var containerMain = document.getElementById("containerMain");
    containerMain.innerHTML = "";

    var FormHlTxt = "Change Admin Password";

    var stdForm = document.createElement("DIV");
    containerMain.appendChild(stdForm);
    stdForm.classList.add("stdForm");
    stdForm.onkeyup = function(ev){
        if (ev.keyCode === 13) {
            document.getElementById("FormSubmitBtn").click();
        }
    }

    var FormHl = document.createElement("DIV");
    stdForm.appendChild(FormHl);
    FormHl.setAttribute("css", "hl");
    FormHl.innerHTML = FormHlTxt;

    var pwdIpt = document.createElement("INPUT");
    stdForm.appendChild(pwdIpt);
    pwdIpt.id = "newAdmPwdIpt";
    pwdIpt.type = "password";
    pwdIpt.placeholder = "enter new password";
    
    var pwdIpt = document.createElement("INPUT");
    stdForm.appendChild(pwdIpt);
    pwdIpt.id = "repAdmPwdIpt";
    pwdIpt.type = "password";
    pwdIpt.placeholder = "repeate new password";

    var submitBtn = document.createElement("BUTTON");
    stdForm.appendChild(submitBtn);
    submitBtn.id = "FormSubmitBtn";
    submitBtn.innerHTML = "Submit";
    submitBtn.onclick = function(){
        var newAdmPwdIpt = document.getElementById("newAdmPwdIpt");
        var repAdmPwdIpt = document.getElementById("repAdmPwdIpt");
        if(newAdmPwdIpt.value == "" || newAdmPwdIpt.value != repAdmPwdIpt.value){
            repAdmPwdIpt.innerHTML = "";
            repAdmPwdIpt.style.borderColor = "red";
            setTimeout( function(){repAdmPwdIpt.style.borderColor = "#3e4b5e";}, 500 );
            return null;
        }

        var newAdmPwd = newAdmPwdIpt.value;
        var fData = new FormData();
        fData.append("newAdmPwd", newAdmPwd);
        bgRequest("POST", "/api/mgmt/admpwd", fData, pwdChangeOk);
    }

    var cancelBtn = document.createElement("BUTTON");
    stdForm.appendChild(cancelBtn);
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.onclick = buildMgmt;

}
function pwdChangeOk(obj){
    if(obj["state"] == true){
        var msgTxt = "Password successfully changed.";
    }
    else{
        var msgTxt = "Something went wrong while changing the Password.";
    }
    msgBoxCall(msgTxt, buildMgmt);
}

//-------------------

function mgmt_ResRatingCall(){

    var fData = new FormData();
    var fwFunc = function(){
        var msgTxt = "Rating successfully reseted";
        var mgsFunc = msgBoxCall(msgTxt, buildMgmt);
        bgRequest("POST", "/api/mgmt/resrating", fData, mgsFunc);
    }

    var msgTxt = "Do you really want to reset the pictute rating?";
    confirmBoxCall(msgTxt, fwFunc);
}

//-------------------

function mgmt_DelPicsCall(){

    var fData = new FormData();
    var fwFunc = function(){
        var msgTxt = "All pictures successfully deleted";
        var mgsFunc = msgBoxCall(msgTxt, buildMgmt);
        bgRequest("POST", "/api/mgmt/delpics", fData, mgsFunc);
    }

    var msgTxt = "Do you really want to delete all pictutes?";
    confirmBoxCall(msgTxt, fwFunc);
}

//-------------------

function mgmt_ResAppCall(){

}

//-------------------



