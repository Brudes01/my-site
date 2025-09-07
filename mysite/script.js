// Editable text elements
const elements = ["name", "bio", "about", "updates"];

// Load saved content from localStorage
elements.forEach(id => {
  const saved = localStorage.getItem(id);
  if (saved) document.getElementById(id).innerHTML = saved;
});

// Save button
document.getElementById("saveBtn").addEventListener("click", () => {
  // Save text elements
  elements.forEach(id => {
    const content = document.getElementById(id).innerHTML;
    localStorage.setItem(id, content);
  });

  // Save projects
  const projectItems = [];
  document.querySelectorAll("#projects li").forEach(li => {
    projectItems.push(li.innerHTML);
  });
  localStorage.setItem("projects", JSON.stringify(projectItems));

  alert("Changes saved locally! Reload to see them persist.");
});

// Projects dynamic functionality
const projectsList = document.getElementById("projects");
const newProjectInput = document.getElementById("newProject");
const addProjectBtn = document.getElementById("addProjectBtn");

// Load saved projects
const savedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
savedProjects.forEach(item => addProjectItem(item));

// Add new project
addProjectBtn.addEventListener("click", () => {
  const value = newProjectInput.value.trim();
  if (value) {
    addProjectItem(value);
    newProjectInput.value = "";
  }
});

// Function to add project item with inline edit and delete
function addProjectItem(text) {
  const li = document.createElement("li");
  li.contentEditable = "true";
  li.innerHTML = text;

  // Delete on double-click
  li.addEventListener("dblclick", () => {
    if (confirm("Delete this project?")) {
      li.remove();
    }
  });

  projectsList.appendChild(li);
}
