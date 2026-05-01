const API = "https://team-task-manager-s6gy.onrender.com";

// SIGNUP
async function signup(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    await fetch(API + "/auth/signup", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name,email,password})
    });

    alert("Signup done");
}


// LOGIN
async function login(){
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let res = await fetch(API + "/auth/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email,password})
    });

    let data = await res.json();

    if(data.message !== "Login successful"){
    alert(data.message);
    return;
}

    // 🔐 Save token
    localStorage.setItem("token", data.token);

    // 🔥 DEBUG
    console.log("Token after login:", localStorage.getItem("token"));

    // 🔄 Redirect
    window.location.href = "dashboard.html";
}


// GET TASKS
async function getTasks(){

    let res = await fetch(API + "/task/all", {
        headers:{
            "Authorization": localStorage.getItem("token")
        }
    });

    let data;
    try {
        data = await res.json();
    } catch {
        alert("Server error aa raha hai — backend check karo");
        return;
    }
    let total = data.length;
    let done = 0;
    let pending = 0;
    let overdue = 0;

    let today = new Date();

    let div = document.getElementById("tasks");
    div.innerHTML = "";

    data.forEach(task => {

        let box = document.createElement("div");
        box.className = "task-item";

        box.innerHTML = `
            <b>${task.title}</b> <br>
            ${task.description} <br>
            Assigned to: ${task.assignedUser || "Me"}
            Status: ${task.status} <br><br>

            <button onclick="toggleTask('${task._id}')">✔ Done</button>
            <button onclick="deleteTask('${task._id}')">🗑 Delete</button>
        `;

        if(task.status === "Done"){
            box.style.borderLeft = "5px solid green";
        } else {
            box.style.borderLeft = "5px solid red";
        }

        div.appendChild(box);
    });
 
    document.getElementById("totalTasks").innerText = total;
    document.getElementById("doneTasks").innerText = done;
    document.getElementById("pendingTasks").innerText = pending;
    document.getElementById("overdueTasks").innerText = overdue;
}


// CREATE TASK
async function createTask(){

    let title = document.getElementById("title").value;
    let description = document.getElementById("desc").value;
    let dueDate = document.getElementById("date").value;
    let priority = document.getElementById("priority").value;
    let assignedUser = document.getElementById("assignedUser").value;

    let res = await fetch(API + "/task/create", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
            title,
            description,
            dueDate,
            priority,
            assignedUser 
        })
    });

    // 🔥 YEH ADD KARNA HAI (IMPORTANT)
    let data = await res.json();
    console.log("Task response:", data);

    alert("Task added");

    // 🔄 tasks reload
    getTasks();
}

// 🔁 Toggle Done
async function toggleTask(id){
    await fetch(API + "/task/update/" + id, {
        method: "PUT",
        headers:{
            "Authorization": localStorage.getItem("token")
        }
    });

    getTasks();
}


// 🗑 Delete
async function deleteTask(id){
    await fetch(API + "/task/delete/" + id, {
        method: "DELETE",
        headers:{
            "Authorization": localStorage.getItem("token")
        }
    });

    getTasks();
}
async function createProject(){
    let name = document.getElementById("projectName").value;

    let res = await fetch(API + "/project/create", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({ name })
    });

    let data = await res.json();
    console.log(data);

    alert("Project created!");
}
