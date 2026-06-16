async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value;

    if (!task) {
        alert("Enter Task");
        return;
    }

    await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: task,
            completed: false
        })
    });

    taskInput.value = "";
    loadTasks();
}

async function loadTasks() {
    const response = await fetch("http://localhost:5000/tasks");
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${task.title}
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(li);
    });
}

async function deleteTask(index) {
    await fetch(`http://localhost:5000/tasks/${index}`, {
        method: "DELETE"
    });

    loadTasks();
}

function logout() {
    window.location.href = "login.html";
}

window.onload = loadTasks;
