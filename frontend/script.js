function addTask(){

let task=document.getElementById("taskInput").value;

let li=document.createElement("li");

li.innerHTML=
task+
` <button onclick="this.parentElement.remove()">Delete</button>`;

document.getElementById("taskList").appendChild(li);

}
