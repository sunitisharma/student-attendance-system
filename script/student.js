    /**find loginEmail  */
    let loginEmail = (JSON.parse(sessionStorage.getItem("_auth_")))['email'];

    /**  class fetch  */
window.onload=function(){
    let classes = JSON.parse(localStorage.getItem("classes"))[loginEmail];
    if(classes){
        classes.forEach((element)=>{
            let option = `<option>${element['class_name']} (${element['section_name'].toUpperCase()})</option>`;
            let select = document.querySelector(".classSelect");
            select.innerHTML += option;
        })
    }
}

/** class Add functon */
let classForm = document.querySelector(".studentForm");
let notify = document.querySelector(".student_alert");
classForm.onsubmit=function(e){
    e.preventDefault();
    let studentObj = {};
    Array.from(e.target).forEach((element)=>{
        element.name !== "student_btn" ? studentObj[element.name] = element.value : '';
    });

    /** check classess */
        if(localStorage.getItem("students")){
            let students = JSON.parse(localStorage.getItem("students"));         
            let loginProfile = students[loginEmail];
            if(loginProfile){
                let check = false;
                loginProfile.forEach((element)=>{
                    if(element['student_email'] == studentObj['student_email']){
                        check = true;
                    }
                });

                if(!check){
                    loginProfile.push(studentObj);
                students[loginEmail] = loginProfile;
                /** update database */
                localStorage.setItem("students",JSON.stringify(students));
                notify.textContent="Student Add successfully !";
                notify.className="signup_alert green"; 
                removeAlert(notify); 
                }
                else{
                    notify.textContent="Email already exists !";
                    notify.className="signup_alert red"; 
                    removeAlert(notify);

                }

            }
            else{
                students[loginEmail] = [studentObj];
                localStorage.setItem("students",JSON.stringify(students));
                notify.textContent="Students Add successfully !";
                notify.className="signup_alert green"; 
                removeAlert(notify); 


            }

        }
        else{
            let finalObj = {
                [loginEmail]:[studentObj]
            }

        /** store classess */
            localStorage.setItem("students",JSON.stringify(finalObj));
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