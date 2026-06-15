// REGISTER

function registerUser(){

let name=document.getElementById("name").value;
let email=document.getElementById("email").value;
let password=document.getElementById("password").value;

localStorage.setItem(
"user",
JSON.stringify({
name,
email,
password
})
);

alert("Registered Successfully");

window.location.href="login.html";
}

// LOGIN

function loginUser(){

let email=document.getElementById("loginEmail").value;
let password=document.getElementById("loginPassword").value;

let user=
JSON.parse(localStorage.getItem("user"));

if(
user &&
user.email===email &&
user.password===password
){
alert("Login Successful");
window.location.href="dashboard.html";
}
else{
alert("Invalid Credentials");
}
}

// ADD TASK

async function addTask(){

let task=
document.getElementById("taskInput").value;

if(task===""){
alert("Enter Task");
return;
}

await fetch(
"http://localhost:5000/tasks",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title:task,
completed:false
})
}
);

alert("Task Added");

document.getElementById("taskInput").value="";
}

// LOGOUT

function logout(){

window.location.href="login.html";

}
