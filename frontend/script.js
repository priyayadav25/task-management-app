const API_URL = "http://localhost:5000/tasks";

async function displayTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.title}
            </span>

            <button onclick="completeTask(${index})">
                Done
            </button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() === "") {
        alert("Enter a task");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: taskInput.value,
            completed: false
        })
    });

    taskInput.value = "";

    displayTasks();
}

async function completeTask(index) {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    tasks[index].completed = true;

    await fetch(`${API_URL}/${index}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tasks[index])
    });

    displayTasks();
}

async function deleteTask(index) {
    await fetch(`${API_URL}/${index}`, {
        method: "DELETE"
    });

    displayTasks();
}

function logout() {
    alert("Logged Out");
    window.location.href = "login.html";
}

displayTasks();
