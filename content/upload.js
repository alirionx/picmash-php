
function buildUpload(){

    var FormHlTxt = "Upload Images";

    var containerTop = document.getElementById("containerTop");
    containerTop.innerHTML = "";

    var containerMain = document.getElementById("containerMain");
    containerMain.innerHTML = "";

    var stdForm = document.createElement("DIV");
    containerMain.appendChild(stdForm);
    stdForm.classList.add("stdForm");

    var FormHl = document.createElement("DIV");
    stdForm.appendChild(FormHl);
    FormHl.setAttribute("css", "hl");
    FormHl.innerHTML = FormHlTxt;

    var fileInput = document.createElement("INPUT");
    stdForm.appendChild(fileInput);
    fileInput.id = "UploadFileInput";
    fileInput.type = "file";
    fileInput.setAttribute ("multiple", "multiple");
    fileInput.setAttribute ("accept", ".jpg,.jpeg,.png");
    fileInput.style.display = "none";
    fileInput.onchange = function(){

        var listBox = document.getElementById("UploadListBox");
        listBox.innerHTML = "";
        var fileAry = this.files;
        for (var i = 0; i < fileAry.length; i++) {
            var fDiv = document.createElement("DIV");
            listBox.appendChild(fDiv);
            fDiv.innerHTML = "- " + fileAry[i].name;
        }
    }

    var listBox = document.createElement("DIV");
    stdForm.appendChild(listBox);
    listBox.id = "UploadListBox";
    listBox.setAttribute("css", "listBox");
    listBox.innerHTML = "click for file selection";
    listBox.onclick = function(){
        var fileInput = document.getElementById("UploadFileInput"); 
        fileInput.click();
    }

    var submitBtn = document.createElement("BUTTON");
    stdForm.appendChild(submitBtn);
    submitBtn.innerHTML = "Submit";
    submitBtn.onclick = function(){
        
        var fileInput = document.getElementById("UploadFileInput"); 

        var fData = new FormData();
        var fileAry = fileInput.files;
        for (var i = 0; i < fileAry.length; i++) {
            fData.append("fileToUpload[]", fileAry[i]);
        }
        
        loaderCall(containerTop);
        var callBack = function(){ 
            callRating(); 
            location.hash = "/rating";
            setTimeout( function(){ window.scrollTo(0,document.body.scrollHeight) }, 100);
        }
        bgRequest("POST", "/api/pic/upload", fData, callBack);
        
    }

    var cancelBtn = document.createElement("BUTTON");
    stdForm.appendChild(cancelBtn);
    cancelBtn.innerHTML = "Cancel";
    cancelBtn.onclick = function(){
        
        var listBox = document.getElementById("UploadListBox");
        listBox.innerHTML = "click for file selection";

        var fileInput = document.getElementById("UploadFileInput"); 
        fileInput.value = "";
    }
}