function register(){
alert("Registration Successful");
window.location.href="login.html";
}

function login(){
alert("Login Successful");
window.location.href="dashboard.html";
}

function addTask(){

let task=document.getElementById("taskInput").value;

if(task===""){
alert("Enter Task");
return;
}

let li=document.createElement("li");

li.innerHTML=`
${task}
<button onclick="this.parentElement.remove()">
Delete
</button>
`;

document.getElementById("taskList").appendChild(li);

document.getElementById("taskInput").value="";
}
