const input = document.getElementById("input");
const listContainer = document.getElementById("ListContainer");
const progressBar = document.querySelector(".progress");
const taskCounter = document.getElementById("numbers");

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
    updateStats();
  }
}

// Toggle checked and delete tasks
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
    updateStats();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
    updateStats();
  }
});

// Save data to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Load data from localStorage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  updateStats(); // Update progress after loading saved tasks
}

// Add task on pressing Enter key
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});


// Show tasks on page load
showTask();

// Update progress bar and task count
function updateStats() {
  const tasks = document.querySelectorAll("#ListContainer li");
  const completedTasks = document.querySelectorAll("#ListContainer li.checked").length;
  const totalTasks = tasks.length;

  // Update progress bar width
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  progressBar.style.width = `${progress}%`;

  // Update task count
  taskCounter.textContent = `${completedTasks} / ${totalTasks}`;
  if (tasks.length && completedTasks === totalTasks) {
    blast();
  }
}
const blast =()=>{
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
    confetti(
        Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
        })
    );
    }

    fire(0.25, {
    spread: 26,
    startVelocity: 55,
    });

    fire(0.2, {
    spread: 60,
    });

    fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    });

    fire(0.1, {
    spread: 120,
    startVelocity: 45,
    });
}