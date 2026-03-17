const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");


document.addEventListener("DOMContentLoaded", loadTasks);


addTask.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    addTaskToList(taskText, false);
    saveTask(taskText, false);
    taskInput.value = "";
  } else {
    alert("Please write a task first!");
  }
});

function addTaskToList(text, completed) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = text;

  if (completed) {
    span.classList.add("completed");
  }

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    updateTask(text, span.classList.contains("completed"));
  });


  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    deleteTask(text);
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToList(task.text, task.completed));
}


function updateTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task =>
    task.text === text ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
