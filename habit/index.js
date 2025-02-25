document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("habits")) {
    const initialHabits = [
      { id: Date.now(), title: "Träning", repetitions: 0, priority: "hög" },
      { id: Date.now() + 1, title: "Läsa bok", repetitions: 0, priority: "mellan" }
    ];
    localStorage.setItem("habits", JSON.stringify(initialHabits));
  }

  loadHabits();
  setupFilters();
  setupSorting();
});

function loadHabits(habits = null) {
  const habitsList = document.getElementById("habitsList");
  habitsList.innerHTML = "";
  habits = habits || JSON.parse(localStorage.getItem("habits")) || [];

  habits.forEach(habit => {
    const habitDiv = document.createElement("div");
    habitDiv.classList.add("habit");
    habitDiv.innerHTML = `
      <span>${habit.title} (Prioritet: ${habit.priority}) - Reps: ${habit.repetitions}</span>
      <div class="habit-buttons">
        <button onclick="incrementHabit(${habit.id})">+1</button>
        <button onclick="decrementHabit(${habit.id})">-1</button>
        <button onclick="resetHabit(${habit.id})">0</button>
        <button onclick="deleteHabit(${habit.id})">❌</button>
      </div>
    `;
    habitsList.appendChild(habitDiv);
  });
}

document.getElementById("habitForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const habitTitle = document.getElementById("habitTitle").value;
  const habitPriority = document.getElementById("habitPriority").value;

  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  const newHabit = {
    id: Date.now(),
    title: habitTitle,
    repetitions: 0,
    priority: habitPriority
  };

  habits.push(newHabit);
  localStorage.setItem("habits", JSON.stringify(habits));
  document.getElementById("habitTitle").value = "";
  loadHabits();
});

function incrementHabit(id) {
  updateHabit(id, habit => habit.repetitions++);
}

function decrementHabit(id) {
  updateHabit(id, habit => {
    if (habit.repetitions > 0) habit.repetitions--;
  });
}

function resetHabit(id) {
  updateHabit(id, habit => habit.repetitions = 0);
}

function deleteHabit(id) {
  let habits = JSON.parse(localStorage.getItem("habits"));
  habits = habits.filter(habit => habit.id !== id);
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}

function updateHabit(id, callback) {
  let habits = JSON.parse(localStorage.getItem("habits"));
  habits = habits.map(habit => {
    if (habit.id === id) callback(habit);
    return habit;
  });
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}

function setupFilters() {
  document.getElementById("priorityFilter").addEventListener("change", (e) => {
    const selectedPriority = e.target.value;
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    const filteredHabits = selectedPriority !== "alla"
      ? habits.filter(habit => habit.priority === selectedPriority)
      : habits;
    loadHabits(filteredHabits);
  });
}

function setupSorting() {
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    const sortOption = e.target.value;
    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    if (sortOption === "repetitions-asc") {
      habits.sort((a, b) => a.repetitions - b.repetitions);
    } else if (sortOption === "repetitions-desc") {
      habits.sort((a, b) => b.repetitions - a.repetitions);
    } else if (sortOption === "priority-asc") {
      const priorityOrder = { "hög": 1, "mellan": 2, "låg": 3 };
      habits.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sortOption === "priority-desc") {
      const priorityOrder = { "hög": 1, "mellan": 2, "låg": 3 };
      habits.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    loadHabits(habits);
  });
}
