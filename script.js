<script>
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let filteredTasks = 'all';

  function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
  }

  function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    const filtered = tasks.filter(task => {
      if (filteredTasks === 'completed') return task.completed;
      if (filteredTasks === 'pending') return !task.completed;
      return true;
    });
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
    event.preventDefault();
    const taskDescription = document.getElementById('task').value;
    const priority = document.getElementById('priority').value;
    tasks.push({ description: taskDescription, priority, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    document.getElementById('task').value = '';
  }

  function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function editTask(index) {
    const newDescription = prompt('Edit Task:', tasks[index].description);
    if (newDescription) {
      tasks[index].description = newDescription;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function filterTasks(filter) {
    filteredTasks = filter;
    renderTasks();
  }

  function sortTasksByPriority() {
    tasks.sort((a, b) => {
      const priorities = { low: 1, medium: 2, high: 3 };
      return priorities[b.priority] - priorities[a.priority];
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  function saveProfile(event) {
    event.preventDefault();
    alert('Profile saved!');
  }

  function saveSettings(event) {
    event.preventDefault();
    const theme = document.getElementById('theme').value;
    document.body.classList.toggle('dark', theme === 'dark');
    alert('Settings saved!');
  }

  // Initialize the page
  renderTasks();
</script>
