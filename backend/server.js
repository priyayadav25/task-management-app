const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";

function getTasks() {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(tasks, null, 2)
    );
}

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

app.get("/tasks", (req, res) => {
    res.json(getTasks());
});

app.post("/tasks", (req, res) => {

    const tasks = getTasks();

    tasks.push(req.body);

    saveTasks(tasks);

    res.json({
        message: "Task Added"
    });
});

app.put("/tasks/:id", (req, res) => {

    const tasks = getTasks();

    tasks[req.params.id] = req.body;

    saveTasks(tasks);

    res.json({
        message: "Task Updated"
    });
});

app.delete("/tasks/:id", (req, res) => {

    const tasks = getTasks();

    tasks.splice(req.params.id, 1);

    saveTasks(tasks);

    res.json({
        message: "Task Deleted"
    });
});

app.listen(5000, () => {
    console.log("Server Running");
});
