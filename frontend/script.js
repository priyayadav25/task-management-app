const API_URL = "http://localhost:5000/tasks";

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

    localStorage.setItem(
        "user",
        JSON.stringify({
            name,
            email,
            password
        })
    );

    alert("Registration Successful");

    window.location.href =
        "login.html";
}

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
        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
            "dashboard.html";
    }
    else{
        alert("Invalid Credentials");
    }
}

function logout(){

    localStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
        "login.html";
}

async function loadTasks(){

    const response =
        await fetch(API_URL);

    const tasks =
        await response.json();

    document.getElementById(
        "taskCount"
    ).innerText = tasks.length;

    document.getElementById(
        "completedCount"
    ).innerText =
        tasks.filter(
            t => t.completed
        ).length;

    const taskList =
        document.getElementById(
            "taskList"
        );

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li =
            document.createElement("li");

        li.innerHTML = `
            <span class="${
                task.completed
                ? "completed"
                : ""
            }">
                ${task.title}
            </span>

            <button onclick="editTask(${index})">
                Edit
            </button>

            <button onclick="markDone(${index})">
                ${task.completed ? "Undo" : "Done"}
            </button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

async function addTask(){

    const taskInput =
        document.getElementById(
            "taskInput"
        );

    if(taskInput.value.trim() === ""){
        alert("Enter Task");
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

async function editTask(index){

    const response =
        await fetch(API_URL);

    const tasks =
        await response.json();

    const newTitle =
        prompt(
            "Edit Task",
            tasks[index].title
        );

    if(!newTitle) return;

    tasks[index].title =
        newTitle;

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
