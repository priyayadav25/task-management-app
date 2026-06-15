// ---------------- REGISTER ----------------

function registerUser() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    let user = {
        name,
        email,
        password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful");

    window.location.href = "login.html";
}

// ---------------- LOGIN ----------------

function loginUser() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (
        user &&
        user.email === email &&
        user.password === password
    ) {

        localStorage.setItem("loggedIn", "true");

        alert("Login Successful");

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Email or Password");

    }
}

// ---------------- TASKS ----------------

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {

    if (document.getElementById("taskList")) {
        displayTasks();
    }

};

// Add Task

function addTask() {

    let taskInput = document.getElementById("taskInput");

    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        title: task,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
}

// Display Tasks

function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        let li = document.createElement("li");

        li.innerHTML = `
            ${task.completed ? "✅" : "❌"} ${task.title}

            <button onclick="completeTask(${index})">
                Complete
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

// Complete Task

function completeTask(index) {

    tasks[index].completed = true;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

// Edit Task

function editTask(index) {

    let updatedTask = prompt(
        "Edit Task",
        tasks[index].title
    );

    if (updatedTask !== null && updatedTask !== "") {

        tasks[index].title = updatedTask;

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

        displayTasks();
    }
}

// Delete Task

function deleteTask(index) {

    tasks.splice(index, 1);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    displayTasks();
}

// Logout

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
}
