let loginForm = document.querySelector(".login_form");
let notify = document.querySelector(".login_alert");
loginForm.onsubmit=function(e){
    e.preventDefault();
    let username = document.querySelector(".login_username");
    let password = document.querySelector(".login_password");
    let database = JSON.parse(localStorage.getItem("users"));
    let user_obj = {check:false};
    database.forEach((element)=>{
        if(element.signup_username == username.value){
            user_obj['check'] = true;
            user_obj['password'] = element.signup_password;
            user_obj['name'] = element.signup_name;

        }
    });
    /** user found or not */
    if(user_obj['check']){
        /**password check  */
            if(password.value == user_obj['password']){
                /** password match and login success */
                /** session is created */
                sessionStorage.setItem("_auth_",JSON.stringify({name:user_obj['name'],email:username.value}));
                /** password match */
               location.replace("./public/dashboard.html");

            }
            else{
                /** password not match */
                notify.textContent="password not match !";
                notify.className="login_alert red";
                removeAlert(notify);
                
            }
    }
    else{
        notify.textContent="user not found !";
        notify.className="login_alert red";
        removeAlert(notify);

    }

}


/** remove alert */
function removeAlert(data){
    setTimeout(function(){
        data.innerHTML="";
    },2000)
}