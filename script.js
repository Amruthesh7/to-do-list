const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

window.onload = () => {
  loadTasks();
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const task = {
    text: taskText,
    completed: false,
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  renderTasks(tasks);
  taskInput.value = "";
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks(tasks);
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    // ✅ or ❌ status icon
    const statusIcon = document.createElement("span");
    statusIcon.innerHTML = task.completed ? "✅" : "❌";
    statusIcon.style.cursor = "pointer";
    statusIcon.style.marginRight = "1rem";
    statusIcon.onclick = () => toggleTask(index);

    // Task text
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;

    // 🗑️ delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.style.marginLeft = "1rem";
    delBtn.onclick = (e) => {
      e.stopPropagation(); // Prevent status toggle
      deleteTask(index);
    };

    li.appendChild(statusIcon);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}


function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  renderTasks(tasks);
}
