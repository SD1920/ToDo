const input = document.getElementById("input");
const listContainer = document.getElementById("ListContainer");

// Add a task
function addTask() {
    if (input.value.trim() === "") {
        alert("Please enter a task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = input.value.trim();
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Cross icon
        li.appendChild(span);

        input.value = "";
        saveData();
    }
}

// Toggle checked and delete tasks
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

// Save data to localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load data from localStorage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
}

// Show tasks on page load
showTask();

// Add task on pressing Enter key
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});