
function buildLogin(){
    
    var containerTop = document.getElementById("containerTop");
    containerTop.innerHTML = "";

    var containerMain = document.getElementById("containerMain");
    containerMain.innerHTML = "";

    var FormHlTxt = "Admin Login";

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
    pwdIpt.id = "AdmPwdIpt";
    pwdIpt.type = "password";
    pwdIpt.placeholder = "enter admin password";

    var submitBtn = document.createElement("BUTTON");
    stdForm.appendChild(submitBtn);
    submitBtn.id = "FormSubmitBtn";
    submitBtn.innerHTML = "Submit";
    submitBtn.onclick = function(){
        var AdmPwdIpt = document.getElementById("AdmPwdIpt");
        if(AdmPwdIpt.value == "" ){
            AdmPwdIpt.style.borderColor = "red";
            setTimeout( function(){AdmPwdIpt.style.borderColor = "#3e4b5e";}, 500 );
            return null;
        }

        var AdmPwd = AdmPwdIpt.value;
        var fData = new FormData();
        fData.append("AdmPwd", AdmPwd);
        var fwFunc = function(){
            location.hash = "/mgmt";
        }
        bgRequest("POST", "/api/login", fData, fwFunc);
    }

    var cancelBtn = document.createElement("BUTTON");
    stdForm.appendChild(cancelBtn);
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.onclick = function(){ location.hash = "/mash";}
}