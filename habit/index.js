document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("habits")) {
    const initialHabits = [
      { id: Date.now(), title: "Träning", repetitions: 0, priority: "hög" },
      { id: Date.now() + 1, title: "Läsa bok", repetitions: 0, priority: "mellan" }
    ];
    localStorage.setItem("habits", JSON.stringify(initialHabits));
  }
  loadHabits();
});

function loadHabits() {
  const habitsList = document.getElementById("habitsList");
  habitsList.innerHTML = "";
  const habits = JSON.parse(localStorage.getItem("habits")) || []; 

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
  const habitTitle = document.getElementById("habitTitle");
  const habitPriority = document.getElementById("habitPriority");

  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  const newHabit = {
    id: Date.now(),
    title: habitTitle.value,
    repetitions: 0,
    priority: habitPriority.value
  };

  habits.push(newHabit);
  localStorage.setItem("habits", JSON.stringify(habits));
  habitTitle.value = "";
  loadHabits();
});

function incrementHabit(id) {
  let habits = JSON.parse(localStorage.getItem("habits"));
  habits = habits.map(habit => {
    if (habit.id === id) {
      habit.repetitions++;
    }
    return habit;
  });
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}

function decrementHabit(id) {
  let habits = JSON.parse(localStorage.getItem("habits"));
  habits = habits.map(habit => {
    if (habit.id === id) {
      if (habit.repetitions > 0) {
        habit.repetitions--;
      }
    }
    return habit;
  });
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}

function resetHabit(id) {
  let habits = JSON.parse(localStorage.getItem("habits"));
  habits = habits.map(habit => {
    if (habit.id === id) {
      habit.repetitions = 0;
    }
    return habit;
  });
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}

function deleteHabit(id) {
  let habits = JSON.parse(localStorage.getItem("habits"));
  habits = habits.filter(habit => habit.id !== id);
  localStorage.setItem("habits", JSON.stringify(habits));
  loadHabits();
}
