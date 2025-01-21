let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filteredTasks = 'all';

function showSection(sectionId) {
  // Hide all sections and show the one selected
  document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear the list before re-rendering
  const filtered = tasks.filter(task => {
    if (filteredTasks === 'completed') return task.completed;
    if (filteredTasks === 'pending') return !task.completed;
    return true; // Show all tasks
  });

  // Render filtered tasks
  filtered.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.description} (Priority: ${task.priority})</span>
      <button onclick="toggleTaskStatus(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

function addTask(event) {
  event.preventDefault(); // Prevent form submission
  const taskInput = document.getElementById('task');
  const prioritySelect = document.getElementById('priority');
  
  const task = {
    description: taskInput.value,
    completed: false,
    priority: prioritySelect.value
  };
  
  tasks.push(task); // Add task to the list
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
  renderTasks(); // Re-render tasks
  taskInput.value = ''; // Clear input field
  prioritySelect.value = 'low'; // Reset priority to 'low'
}

function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed; // Toggle task status
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
  renderTasks(); // Re-render tasks
}

function deleteTask(index) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1); // Remove task from the list
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
    renderTasks(); // Re-render tasks
  }
}

function editTask(index) {
  const newDescription = prompt('Edit Task:', tasks[index].description);
  if (newDescription !== null) {
    tasks[index].description = newDescription; // Update task description
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to localStorage
    renderTasks(); // Re-render tasks
  }
}

function saveProfile(event) {
  event.preventDefault(); // Prevent form submission
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  alert(`Profile saved: ${username}, ${email}`); // Alert the user
}

function saveSettings(event) {
  event.preventDefault(); // Prevent form submission
  const theme = document.getElementById('theme').value;
  // Apply theme change
  document.body.style.backgroundColor = theme === 'dark' ? '#000' : '#fff';
  localStorage.setItem('theme', theme); // Save theme setting to localStorage
}

function filterTasks(status) {
  filteredTasks = status; // Set filter criteria
  renderTasks(); // Re-render tasks
}

function sortTasksByPriority() {
  tasks.sort((a, b) => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    return priorityOrder[b.priority] - priorityOrder[a.priority]; // Sort tasks by priority
  });
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save sorted tasks to localStorage
  renderTasks(); // Re-render tasks
}

// Initial render of tasks when the page loads
renderTasks();
