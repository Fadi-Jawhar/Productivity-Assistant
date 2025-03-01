let user = JSON.parse(sessionStorage.getItem("user"));

if (user) {
  document.querySelector("#navLogoutButton").classList.remove("hidden");
  document.querySelector("#navLink").classList.remove("hidden");
  document.querySelector("#loginButton").classList.add("hidden");
  document.querySelector("#logoutButton").classList.remove("hidden");
  document.querySelector("#addMenu").classList.remove("hidden");

  document.querySelector("#userLoggedIn").classList.remove("hidden");

  document.addEventListener("DOMContentLoaded", () => {
    loadHabits();
    setupFilters();
    setupSorting();
  });

  function loadHabits(habits = null) {
    const habitsList = document.getElementById("habitsList");
    habitsList.innerHTML = "";
    let userHabits = JSON.parse(localStorage.getItem(user));
    habits = habits || userHabits.habitlist || [];

    habits.forEach((habit) => {
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

    let habits = JSON.parse(localStorage.getItem(user));

    const newHabit = {
      id: Date.now(),
      title: habitTitle,
      repetitions: 0,
      priority: habitPriority,
    };

    habits.habitlist.push(newHabit);
    localStorage.setItem(user, JSON.stringify(habits));
    document.getElementById("habitTitle").value = "";
    loadHabits();
  });

  function incrementHabit(id) {
    updateHabit(id, (habit) => habit.repetitions++);
  }

  function decrementHabit(id) {
    updateHabit(id, (habit) => {
      if (habit.repetitions > 0) habit.repetitions--;
    });
  }

  function resetHabit(id) {
    updateHabit(id, (habit) => (habit.repetitions = 0));
  }

  function deleteHabit(id) {
    let habits = JSON.parse(localStorage.getItem(user));
    //let habits = JSON.parse(localStorage.getItem("habits"));
    habits.habitlist = habits.habitlist.filter((habit) => habit.id !== id);
    localStorage.setItem(user, JSON.stringify(habits));
    loadHabits();
  }

  function updateHabit(id, callback) {
    let habits = JSON.parse(localStorage.getItem(user));
    habits.habitlist = habits.habitlist.map((habit) => {
      if (habit.id === id) callback(habit);
      return habit;
    });
    localStorage.setItem(user, JSON.stringify(habits));
    loadHabits();
  }

  function setupFilters() {
    document
      .getElementById("priorityFilter")
      .addEventListener("change", (e) => {
        const selectedPriority = e.target.value;
        let habits = JSON.parse(localStorage.getItem(user));
        const filteredHabits =
          selectedPriority !== "alla"
            ? habits.habitlist.filter(
                (habit) => habit.priority === selectedPriority
              )
            : habits.habitlist;
        console.log(
          habits.habitlist.filter(
            (habit) => habit.priority === selectedPriority
          )
        );
        loadHabits(filteredHabits);
      });
  }

  function setupSorting() {
    document.getElementById("sortSelect").addEventListener("change", (e) => {
      const sortOption = e.target.value;
      let habits = JSON.parse(localStorage.getItem(user));

      if (sortOption === "repetitions-asc") {
        habits.habitlist.sort((a, b) => a.repetitions - b.repetitions);
      } else if (sortOption === "repetitions-desc") {
        habits.habitlist.sort((a, b) => b.repetitions - a.repetitions);
      } else if (sortOption === "priority-asc") {
        const priorityOrder = { hög: 1, mellan: 2, låg: 3 };
        habits.habitlist.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
      } else if (sortOption === "priority-desc") {
        const priorityOrder = { hög: 1, mellan: 2, låg: 3 };
        habits.habitlist.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      }

      loadHabits(habits.habitlist);
    });
  }

  document.querySelector("#navLogoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("user");
    window.location.href = "/index.html";
  });

  document.querySelector("#navLoginButton").addEventListener("click", () => {
    window.location.href = "/login/index.html";
  });

  document.querySelector("#logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem("user");
    window.location.href = "/index.html";
  });

  document.querySelector("#loginButton").addEventListener("click", () => {
    window.location.href = "/login/index.html";
  });
}
