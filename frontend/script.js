const API_URL = "http://localhost:5000/tasks";

/* REGISTER */

function registerUser() {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    if(!name || !email || !password){
        alert("Please fill all fields");
        return;
    }

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Registration Successful");

    window.location.href = "login.html";
}

/* LOGIN */

function loginUser(){

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    const user =
        JSON.parse(localStorage.getItem("user"));

    if(
        user &&
        email === user.email &&
        password === user.password
    ){
        localStorage.setItem("loggedIn","true");

        alert("Login Successful");

        window.location.href = "dashboard.html";
    }
    else{
        alert("Invalid Credentials");
    }
}

/* LOGOUT */

function logout(){
    localStorage.removeItem("loggedIn");

    alert("Logged Out");

    window.location.href = "login.html";
}

/* LOAD TASKS */

async function loadTasks(){

    const response =
        await fetch(API_URL);

    const tasks =
        await response.json();

    const taskList =
        document.getElementById("taskList");

    if(document.getElementById("taskCount")){
        document.getElementById(
            "taskCount"
        ).innerText = tasks.length;
    }

    taskList.innerHTML = "";

    if(tasks.length === 0){
        taskList.innerHTML =
            "<p>No tasks available</p>";
        return;
    }

    tasks.forEach((task,index)=>{

        const li =
            document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.title}
            </span>

            <button onclick="markDone(${index})">
                ${task.completed ? "Undo" : "Done"}
            </button>
            <button onclick="editTask(${index})">
    Edit
</button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

/* ADD TASK */

async function addTask(){

    const taskInput =
        document.getElementById("taskInput");

    if(taskInput.value.trim() === ""){
        alert("Enter a task");
        return;
    }

    await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title:taskInput.value,
            completed:false
        })
    });

    taskInput.value = "";

    loadTasks();
}

/* COMPLETE TASK */

async function markDone(index){

    const response =
        await fetch(API_URL);

    const tasks =
        await response.json();

    tasks[index].completed =
        !tasks[index].completed;

    await fetch(
        `${API_URL}/${index}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(tasks[index])
        }
    );

    loadTasks();
}

/* DELETE TASK */

async function deleteTask(index){

    await fetch(
        `${API_URL}/${index}`,
        {
            method:"DELETE"
        }
    );

    loadTasks();
}

if(document.getElementById("taskList")){
    loadTasks();
}
