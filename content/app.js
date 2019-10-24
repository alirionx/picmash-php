
function viewCall(){
    var target = document.getElementById("containerMain");
    target.innerHTML = "";
    var hl = document.createElement("h2");
    hl.innerHTML = "Hallo Welt";
    target.appendChild(hl);
}