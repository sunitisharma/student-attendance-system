let signupForm = document.querySelector(".signup_form");
let notify = document.querySelector(".signup_alert");
signupForm.onsubmit=function(e){
    e.preventDefault();
    let signupObj = {};
    // iterate element
    Array.from(e.target).forEach((element)=>{
        /** filter obj  */
        element.name == "signup_btn" ? '' : signupObj[element.name] = element.value;  
    })

    /** data  Store in Database*/
    if(localStorage.getItem("users")){
        let arr = JSON.parse(localStorage.getItem("users"));
        let condition = true;
        /** user found or not check  */
        arr.forEach((users_data)=>{
            if(users_data['signup_username']==signupObj['signup_username']){
                condition = false;
            }
        });

        if(condition){
            /** user not found */
                arr.push(signupObj);
                localStorage.setItem("users",JSON.stringify(arr));   
                notify.textContent="User is Created !";
                notify.className="signup_alert green"; 
                removeAlert(notify); 
                location.href="../index.html";

        }
        else{
            /** user found  */
                 notify.textContent="User already Register !";
                notify.className="signup_alert red"; 
                removeAlert(notify); 

        }
    }
    else{
        localStorage.setItem("users",JSON.stringify([signupObj]));
        notify.textContent="User is Created !";
        notify.className="signup_alert green"; 
        removeAlert(notify); 
        location.href="../index.html";
    }

;}


/** remove alert */
function removeAlert(data){
    setTimeout(function(){
        data.innerHTML="";
    },2000)
}