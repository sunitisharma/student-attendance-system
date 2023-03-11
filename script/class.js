/** class Add functon */
let classForm = document.querySelector(".classForm");
let notify = document.querySelector(".class_alert");
classForm.onsubmit=function(e){
    e.preventDefault();
    let classObj = {};
    Array.from(e.target).forEach((element)=>{
        element.name !== "class_btn" ? classObj[element.name] = element.value : '';
    });

    /**find loginEmail  */
    let loginEmail = (JSON.parse(sessionStorage.getItem("_auth_")))['email'];
    /** check classess */
        if(localStorage.getItem("classes")){
            let classess = JSON.parse(localStorage.getItem("classes"));
            let loginClassess = classess[loginEmail];
            if(loginClassess){

                loginClassess.push(classObj);
                classess[loginEmail] = loginClassess;
                /** update database */
                localStorage.setItem("classes",JSON.stringify(classess));
                notify.textContent="Class Add successfully !";
                notify.className="signup_alert green"; 
                removeAlert(notify); 

            }
            else{
                classess[loginEmail] = [classObj];
                localStorage.setItem("classes",JSON.stringify(classess));
                notify.textContent="Class Add successfully !";
                notify.className="signup_alert green"; 
                removeAlert(notify); 


            }

        }
        else{
            let finalObj = {
                [loginEmail]:[classObj]
            }

        /** store classess */
            localStorage.setItem("classes",JSON.stringify(finalObj));
            notify.textContent="Class Add successfully !";
                notify.className="signup_alert green"; 
                removeAlert(notify); 

        }
}


/** remove alert */
function removeAlert(data){
    setTimeout(function(){
        data.innerHTML="";
    },2000)
}