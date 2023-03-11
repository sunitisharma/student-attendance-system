/**session check */
if(!sessionStorage.getItem("_auth_")){
    location.replace("../index.html");
}
 
/** default function call */
function initialStart(){
    let profile_title = document.querySelector(".profile_title");
    profile_title.textContent = "Hello "+(JSON.parse(sessionStorage.getItem("_auth_")))['name']+" !";
}
initialStart();

/** bars click handle menubar */
let barIcon = document.querySelector(".bars_icon");
barIcon.onclick=function(){
    let menu = document.querySelector(".menubar");
    let dashboard_div = document.querySelector(".dashboard_div");
    if(menu.className.match("menu_open")){
        menu.className="menubar menu_close";
        dashboard_div.className="dashboard_div dashboard_full";
    }
    else{
        menu.className="menubar menu_open";
        dashboard_div.className="dashboard_div dashboard_minimum";
    }

}

/******* logout function ******* */
let logoutElement = document.querySelector(".logout");
logoutElement.onclick=function(){
    sessionStorage.removeItem("_auth_");
    location.reload();
}

