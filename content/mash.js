
function buildMash(obj){
    
    var pageHlTxt = "Choose your favorite picture";

    var picUrlPath = obj["picUrlPath"];
    var picAry = obj["pics"];
    var pic1Ary = obj["pics"][0];
    var pic2Ary = obj["pics"][1];
     
    var containerTop = document.getElementById("containerTop");
    containerTop.innerHTML = "";

    var containerMain = document.getElementById("containerMain");
    containerMain.innerHTML = "";

    var pageHl = document.createElement("DIV");
    containerTop.appendChild(pageHl);
    pageHl.classList.add("pageHl");
    pageHl.innerHTML = pageHlTxt;

    var mashTbl = document.createElement("TABLE");
    containerMain.appendChild(mashTbl);
    mashTbl.classList.add("mashTbl");
    var tr = document.createElement("TR");
    mashTbl.appendChild(tr);
    //mashTbl.border = 1;

    for( var nbr in picAry ){
        var loss = 0;
        if(nbr == 0){ loss = 1}

        var td = document.createElement("TD");
        tr.appendChild(td);
        var pic = document.createElement("IMG");
        td.appendChild(pic);
        pic.src = picUrlPath + picAry[nbr]["filename"];
        pic.setAttribute("win", picAry[nbr]["id"]);
        pic.setAttribute("loss", picAry[loss]["id"]);
        pic.onclick = function(){

            var win = this.getAttribute("win");
            var loss = this.getAttribute("loss");
            var fData = new FormData();
            fData.append("win", win);
            fData.append("loss", loss);
            bgRequest("POST", "/api/mash/vote", fData, callMash);
        }
    }
}