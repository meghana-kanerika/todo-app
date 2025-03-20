const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = "";
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    
    if (task.editing) {
      li.innerHTML = `
        <input type="text" class="edit-input" id="editInput${index}" value="${task.text}">
        <div class="btn-group">
          <button onclick="saveTask(${index})">💾 Save</button>
          <button onclick="cancelEdit(${index})">❌ Cancel</button>
        </div>
      `;
    } else {
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="btn-group">
          <button onclick="editTask(${index})">✏️ Edit</button>
          <button onclick="deleteTask(${index})">❌ Delete</button>
        </div>
      `;
    }
    
    taskList.appendChild(li);
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  if (taskInput.value.trim() !== "") {
    tasks.push({
      text: taskInput.value,
      editing: false
    });
    taskInput.value = ""; 
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function editTask(index) {
  tasks[index].editing = true;
  renderTasks();
}

function saveTask(index) {
  const editInput = document.getElementById(`editInput${index}`);
  const newText = editInput.value;
  if (newText.trim() !== "") {
    tasks[index].text = newText;
    tasks[index].editing = false;
    renderTasks();
  }
}

function cancelEdit(index) {
  tasks[index].editing = false;
  renderTasks();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

renderTasks();
