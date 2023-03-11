/**find loginEmail  */
let loginEmail = (JSON.parse(sessionStorage.getItem("_auth_")))['email'];

/**  class fetch  */
window.onload = function () {
    let classes = JSON.parse(localStorage.getItem("classes"))[loginEmail];
    if (classes) {
        classes.forEach((element) => {
            let option = `<option>${element['class_name']} (${element['section_name'].toUpperCase()})</option>`;
            let select = document.querySelector(".class_filter");
            select.innerHTML += option;
        })
    }

    /** student fetch */
    let students = JSON.parse(localStorage.getItem("students"))[loginEmail];
    let student_main_div = document.querySelector(".student_main_div");
    /** date control  */
    let todayDate = new Date();
    let todayDate_div = document.querySelector(".today_date");
    let currentDate = `${todayDate.getDate()}-${String((todayDate.getMonth()+1)).length == 1 ? "0" + (todayDate.getMonth()+1) : (todayDate.getMonth()+1)}-${todayDate.getFullYear()}`;
    todayDate_div.innerHTML = "Date : " + currentDate;

    /************************* fetch student  */

    function fetchStudentDate(currentDate) {
        student_main_div.innerHTML = "";
        let check = localStorage.getItem("attandance");
        // alert(check);
        if (check && JSON.parse(check)[currentDate]) {
            students.forEach((element, index) => {
                attandanceObj[element['student_email']] = {
                    action: "no",
                    email: element['student_email'],
                    name: element['student_name'],
                    class: element['class'].toUpperCase(),
                    auth:loginEmail
                }
            })

            /** filter data  */
            let find = JSON.parse(check)[currentDate];
            /** add new student and fetch student  */
            Object.keys(attandanceObj).forEach((element) => {
                if (!find.hasOwnProperty(element)) {
                    find[element] = attandanceObj[element];
                }
            })

            Object.keys(find).forEach((element) => {
                // console.log(find[element]);
               if(find[element]['auth'] == loginEmail){
                let student = ` <div class="students">
                <div class="student_logo">${find[element]['name'][0].toUpperCase()}</div>
                <div class="student_title">
                    <h4>Name : <span class="red student_name_div">${find[element]['name'].toUpperCase()}</span></h4>
                    <h4>Class :  <span style="color:black" class="section_filter">${find[element]['class'].toUpperCase()}</span></h4>
                </div>
            
                <div class="action_div" email="${find[element]['email']}" name="${find[element]['name']}" section="${find[element]['class']}">
                    <div class="action present ${find[element]['action'] == "P" ? 'active' : ''}" name="present">P</div>
                    <div class="action absent ${find[element]['action'] == "AB" ? 'active' : ''}" name="absent">AB</div>
                    <div class="action leave ${find[element]['action'] == "L" ? 'active' : ''}" name="leave">L</div>
                </div>
            
            
            </div>`;

                student_main_div.innerHTML += student;
               }

                
            
            });
        }

        else {
            students.forEach((element) => {
                attandanceObj[element['student_email']] = {
                    action: "no",
                    email: element['student_email'],
                    name: element['student_name'],
                    class: element['class'].toUpperCase(),
                    auth:loginEmail

                }
                
                // if(element['student_email'] == loginEmail){
                    let student = ` <div class="students">
                <div class="student_logo">${element['student_name'][0].toUpperCase()}</div>
                <div class="student_title">
                    <h4>Name : <span class="red student_name_div">${element['student_name'].toUpperCase()}</span></h4>
                    <h4>Class :  <span style="color:black" class="section_filter">${element['class'].toUpperCase()}</span></h4>
                </div>
            
                <div class="action_div" email="${element['student_email']}" name="${element['student_name']}" section="${element['class']}">
                    <div class="action present" name="present">P</div>
                    <div class="action absent" name="absent">AB</div>
                    <div class="action leave" name="leave">L</div>
                </div>
            
            
            </div>`;

                student_main_div.innerHTML += student;
                // }

            })

        }

    }


    let attandanceObj = {};
    if (students) {
        /** student fetch */
        fetchStudentDate(currentDate);

        /** action btn clickable function */
        function actionBtnClick() {
            let action_btn = document.querySelectorAll(".action");
            action_btn.forEach((element) => {
                element.onclick = function (e) {
                    /** music play */
                    let audio = document.createElement("audio");
                    let dateField = document.querySelector(".filter_date");
                    audio.src = "../click_single.mp3";
                    audio.play();
                    /** control action btn */
                    let parent = this.parentElement;
                    let current_div = parent.querySelectorAll(".action");
                    current_div.forEach((curr_element) => {
                        curr_element.classList.remove("active");
                    })
                    this.classList.add("active");

                    /** attandance design */

                    let dateObj = {};
                    if (dateField.value) {
                        /** custom date wise attandance */
                        let setDate = dateField.value.split("-");
                        setDate = `${setDate[2]}-${setDate[1]}-${setDate[0]}`;
                        dateObj[setDate] = attandanceObj;
                        let actionData = this.innerText;
                        let email = this.parentElement.getAttribute("email");
                        let classes = this.parentElement.getAttribute("section");
                        let name = this.parentElement.getAttribute("name");

                        /** database  already check */
                        attandanceObj[email] = { action: actionData, email: email, class: classes, name: name,auth:loginEmail  };


                        if (localStorage.getItem("attandance")) {
                            /********************************today attandance found*/
                            let fetchObj = JSON.parse(localStorage.getItem("attandance"));
                            console.log(students);

                            if (fetchObj[setDate]) {
                                /** add new student and fetch student  */

                                Object.keys(attandanceObj).forEach((element) => {
                                    if (!fetchObj[setDate].hasOwnProperty(element)) {

                                        fetchObj[setDate][element] = attandanceObj[element];
                                    }
                                })

                                /** already attandance complete and update  */
                                fetchObj[setDate][email]['action'] = actionData;
                                localStorage.setItem("attandance", JSON.stringify(fetchObj));
                                console.log(fetchObj[setDate][email]);


                            }
                            else {
                                fetchObj[setDate] = attandanceObj;
                                localStorage.setItem("attandance", JSON.stringify(fetchObj));

                            }
                        }
                        else {
                            /**attandance not found */
                            localStorage.setItem("attandance", JSON.stringify(dateObj));
                        }



                    }
                    else {
                        /****************************** today date  attandance */
                        dateObj[currentDate] = attandanceObj;
                        let actionData = this.innerText;
                        /** database check already check */
                        let email = this.parentElement.getAttribute("email");
                        let classes = this.parentElement.getAttribute("section");
                        let name = this.parentElement.getAttribute("name");

                        /** database check already check */
                        attandanceObj[email] = { action: actionData, email: email, class: classes, name: name,auth:loginEmail };
                        if (localStorage.getItem("attandance")) {
                            /**attandance found*/
                            let fetchObj = JSON.parse(localStorage.getItem("attandance"));

                            if (fetchObj[currentDate]) {

                                /** add new student and fetch student  */

                                Object.keys(attandanceObj).forEach((element) => {
                                    if (!fetchObj[currentDate].hasOwnProperty(element)) {

                                        fetchObj[currentDate][element] = attandanceObj[element];
                                    }
                                })


                                /** already attandance complete and update  */
                                fetchObj[currentDate][email]['action'] = actionData;
                                localStorage.setItem("attandance", JSON.stringify(fetchObj));
                                console.log(fetchObj[currentDate]);

                            }
                            else {
                                fetchObj[currentDate] = attandanceObj;
                                localStorage.setItem("attandance", JSON.stringify(fetchObj));

                            }
                        }
                        else {
                            localStorage.setItem("attandance", JSON.stringify(dateObj));
                        }

                    }


                    /** prepare attandance obj */

                }
            });
        }
        actionBtnClick()


        /*** all filter function  */
        function allStudentFilter() {
            let filter = document.querySelector(".filter");
            let action_div = document.querySelectorAll(".action_div");
            action_div.forEach((element) => {
                let condition = element.querySelector(".active");
                let students = element.parentElement;

                /************************ other filter check and apply******* */
                if (condition) {
                    if (filter.value == "Present Student" && condition.innerText == "P") {
                        condition.parentElement.parentElement.style.display = "flex";
                    }
                    else if (filter.value == "Absent Student" && condition.innerText == "AB") {
                        condition.parentElement.parentElement.style.display = "flex";
                    }
                    else if (filter.value == "Leave Student" && condition.innerText == "L") {
                        condition.parentElement.parentElement.style.display = "flex";
                    }
                    else {
                        condition.parentElement.parentElement.style.display = "none";
                    }
                }
                else {
                    students.style.display = "none";
                }

                /***** all present ***** */
                if (filter.value == "All Student") {
                    // action_div.parentElement.style.display="flex";
                    element.parentElement.style.display = "flex";
                }


            });

        }

        /*** all class filter function  */

        function allClassFilter() {
            let classFilter = document.querySelector(".class_filter");
            let action_class = document.querySelectorAll(".section_filter");
            if (classFilter.value !== "All Class") {
                action_class.forEach((element) => {
                    let students_div = element.parentElement.parentElement.parentElement;
                    console.log(students_div.innerText);
                    if (classFilter.value == element.innerText) {
                        students_div.style.display = "flex";
                    }
                    else {
                        students_div.style.display = "none";
                    }

                })

            }
            else {
                action_class.forEach((element) => {
                    let students_div = element.parentElement.parentElement.parentElement;
                    students_div.style.display = "flex";

                })
            }





        }

        /*** all student search filter function  */

        function allStudentSearch() {
            let search = document.querySelector(".filter_search");
            search.oninput = function () {
                let typeName = this.value;
                let studentName = document.querySelectorAll(".student_name_div");
                studentName.forEach((element) => {
                    let students_div = element.parentElement.parentElement.parentElement;
                    if (element.innerText.match(typeName.toUpperCase())) {
                        students_div.style.display = "flex";
                    }
                    else {
                        students_div.style.display = "none";
                    }
                });
            }


        }
        allStudentSearch();



        /******* custom date change ********* */
        let customDate = document.querySelector(".filter_date");
        customDate.onchange = function () {
            let setDate = this.value.split("-");
            setDate = `${setDate[2]}-${setDate[1]}-${setDate[0]}`;
            fetchStudentDate(setDate);
            actionBtnClick()
            allStudentFilter();
            allClassFilter();
        }

        /******* student filter ********* */
        let studentFilter = document.querySelector(".filter");
        studentFilter.onchange = function () {
            allStudentFilter();
        }

        /******* custom class change ********* */
        let classSelect = document.querySelector(".class_filter");
        classSelect.onchange = function () {
            allClassFilter()

        }








    }
    else {
        student_main_div.innerHTML = "<h1>No Students</h1>"
    }
}


