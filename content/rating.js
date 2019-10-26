
function buildRating(obj){
    
    var picUrlPath = obj["picUrlPath"];
    var tblDefi = obj["defi"];
    var tblData = obj["data"];

    var pageHlTxt = "PicMash Rating Table";

    var containerTop = document.getElementById("containerTop");
    containerTop.innerHTML = "";

    var containerMain = document.getElementById("containerMain");
    containerMain.innerHTML = "";

    var pageHl = document.createElement("DIV");
    containerTop.appendChild(pageHl);
    pageHl.classList.add("pageHl");
    pageHl.innerHTML = pageHlTxt;

    var ratingTbl = document.createElement("TABLE");
    containerMain.appendChild(ratingTbl);
    ratingTbl.classList.add("stdTbl");
    ratingTbl.onclick = function(){
        rmByClass("actBtnFrame");
    }
    
    var tr = document.createElement("TR");
    ratingTbl.appendChild(tr);
    for(colNum in tblDefi){
        var curCol = tblDefi[colNum];

        var th = document.createElement("TH");
        tr.appendChild(th);
        th.style.textAlign = curCol["align"];
        th.style.width = curCol["width"];
        th.innerHTML = curCol["hl"];
    }

    for(rowNum in tblData){
        var curRow = tblData[rowNum];
        
        var tr = document.createElement("TR");
        ratingTbl.appendChild(tr);
        
        for(colNum in tblDefi){
            var curCol = tblDefi[colNum];
            var td = document.createElement("TD");
            tr.appendChild(td);
            td.style.textAlign = curCol["align"];
            var typ = curCol["typ"];
            var col = curCol["col"];
            fillCell[typ](td, curCol, curRow);
            //td.innerHTML = curRow[curCol["col"]];
        }
    }
}

//-Sub Functions--------------------------

var fillCell = {};
fillCell["static"] = function(cellElm, defi, row){
    cellElm.innerHTML = row[defi["col"]];
}
fillCell["thumb"] = function(cellElm, defi, row){
    
    cellElm.style.position = "relative";
    
    var thumb = document.createElement("IMG");
    cellElm.appendChild(thumb);
    thumb.setAttribute("thumb", "true");
    thumb.src = row["filepath"];
    thumb.onmouseenter = function(){
        thumbShow(this);
    }
    thumb.onmouseleave = function(){
        rmByClass("thumbImg");
    }

    function thumbShow(imgElm){
        cellElm = imgElm.parentNode;
        filePath = imgElm.src;

        var thumbImg = document.createElement("IMG");
        thumbImg.classList.add("thumbImg");
        thumbImg.src = filePath;
        cellElm.appendChild(thumbImg);
    }
}

fillCell["action"] = function(cellElm, defi, row){
    
    cellElm.style.position = "relative";
    cellElm.style.verticalAlign = "top";

    var picId = row["id"];
    var actAry = {
        "download" :{
            "lnk": "/api/pic/download/"+picId,
            "method": "GET"
        },
        "reset": {
            "lnk": "/api/pic/reset",
            "method": "POST"
        },
        "delete": {
            "lnk": "/api/pic/delete",
            "method": "POST"
        }
    }

    var Btn = document.createElement("DIV");
    cellElm.appendChild(Btn);
    Btn.innerHTML = "action";
    Btn.setAttribute("css", "button");
    Btn.setAttribute("picId", picId);
    Btn.onclick = function(){
        
        var picId = this.getAttribute("picId");
        var callBack = function(){

            var actBtnFrame = document.createElement("DIV");
            cellElm.appendChild(actBtnFrame);
            actBtnFrame.classList.add("actBtnFrame");
            
            for(var txt in actAry){
                var actBtn = document.createElement("DIV");
                actBtnFrame.appendChild(actBtn);
                actBtn.innerHTML = txt;
                
                actBtn.setAttribute("lnk", actAry[txt]["lnk"]);
                actBtn.setAttribute("method", actAry[txt]["method"]);
                actBtn.setAttribute("picId", picId);
                actBtn.onclick = function(){
                    var lnk = this.getAttribute("lnk");
                    var method = this.getAttribute("method");
                    var picId = this.getAttribute("picId");
                    
                    if(method == "GET"){
                        window.open(lnk);
                    }
                    else{
                        var fData = new FormData();
                        fData.append("picId", picId);
                        bgRequest("POST", lnk, fData, callRating);
                    }
                }
            }
        }
        setTimeout( function(){rmByClass("actBtnFrame", callBack);}, 10)
    }
}