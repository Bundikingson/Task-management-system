// JavaScript for Task Management System

// DOM Elements
const dashboardSection = document.getElementById("dashboard");
const tasksSection = document.getElementById("tasks");
const settingsSection = document.getElementById("settings");
const profileSection = document.getElementById("profile");
const themeSelect = document.getElementById("theme");
const taskList = document.getElementById("taskList");
const profileImageInput = document.getElementById("profileImageInput");
const profileImage = document.getElementById("profileImage");
const bioInput = document.getElementById("bio");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Theme Toggle
const currentTheme = localStorage.getItem("theme") || "dark";
document.body.classList.add(currentTheme);
themeSelect.value = currentTheme;

themeSelect.addEventListener("change", (event) => {
  const selectedTheme = event.target.value;
  document.body.classList.remove("light", "dark");
  document.body.classList.add(selectedTheme);
  localStorage.setItem("theme", selectedTheme);
});

// Section Navigation
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetSection = event.target.getAttribute("href").substring(1);
    showSection(targetSection);
  });
});

function showSection(sectionId) {
  dashboardSection.classList.add("hidden");
  tasksSection.classList.add("hidden");
  settingsSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  
  if (sectionId === "dashboard") {
    dashboardSection.classList.remove("hidden");
  } else if (sectionId === "tasks") {
    tasksSection.classList.remove("hidden");
  } else if (sectionId === "settings") {
    settingsSection.classList.remove("hidden");
  } else if (sectionId === "profile") {
    profileSection.classList.remove("hidden");
  }
}

// Task Management
const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskDueDateInput = document.getElementById("taskDueDate");
const taskPriorityInput = document.getElementById("taskPriority");
const taskStatusInput = document.getElementById("taskStatus");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span>${task.title}</span>
      <span>${task.dueDate}</span>
      <span>${task.priority}</span>
      <span>${task.status}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const newTask = {
    title: taskTitleInput.value,
    description: taskDescriptionInput.value,
    dueDate: taskDueDateInput.value,
    priority: taskPriorityInput.value,
    status: taskStatusInput.value,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskForm.reset();
  displayTasks();
  updateTaskStats();
});

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  updateTaskStats();
}

function updateTaskStats() {
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter(task => task.status === "Completed").length;
  pendingTasks.textContent = tasks.filter(task => task.status !== "Completed").length;
}

displayTasks();
updateTaskStats();

// Profile Section
const profilePictureInput = document.getElementById("profilePictureInput");
const profilePicture = document.getElementById("profileImage");
const bioText = document.getElementById("bioText");

profilePictureInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profilePicture.src = reader.result;
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  }
});

const savedImage = localStorage.getItem("profileImage");
if (savedImage) {
  profilePicture.src = savedImage;
}

bioInput.addEventListener("input", () => {
  localStorage.setItem("bio", bioInput.value);
});

const savedBio = localStorage.getItem("bio");
if (savedBio) {
  bioInput.value = savedBio;
}
