const API_URL = "http://localhost:5000/tasks";

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        document.getElementById("taskCount").innerText = tasks.length;

        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">
                    ${task.title}
                </span>

                <button onclick="markDone(${index})">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            `;

            taskList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");

    if (taskInput.value.trim() === "") {
        alert("Enter a task");
        return;
    }

    const newTask = {
        title: taskInput.value,
        completed: false
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    });

    taskInput.value = "";
    loadTasks();
}

async function markDone(index) {

    const response = await fetch(API_URL);
    const tasks = await response.json();

    tasks[index].completed = !tasks[index].completed;

    await fetch(`${API_URL}/${index}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tasks[index])
    });

    loadTasks();
}

async function deleteTask(index) {

    await fetch(`${API_URL}/${index}`, {
        method: "DELETE"
    });

    loadTasks();
}

function logout() {
    alert("Logged Out Successfully");
    window.location.href = "login.html";
}

loadTasks();
