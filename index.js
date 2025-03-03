let user = JSON.parse(sessionStorage.getItem("user"));

if (user) {
  let getData = async (url) => {
    try {
      let response = await fetch("https://api.adviceslip.com/advice");
      let json = await response.json();
      return json;
    } catch (error) {
      let h2 = document.createElement("h2");
      h2.innerText =
        "Oj, något gick fel! Testa igen senare eller kontakta webbutvecklaren som tabbat sig. Error meddelande: " +
        error;
      document.body.append(h2);
    }
  };

  let getAdvice = async () => {
    let advice = await getData("https://api.adviceslip.com/advice");
    console.log(advice.slip.advice);
    let loggedInUser = JSON.parse(localStorage.getItem(user));
    document.getElementById(
      "welcomeMessage"
    ).innerHTML = `Hello ${loggedInUser.name},<br> ${advice.slip.advice}`;
  };

  getAdvice();

  document.getElementById("navLogoutButton").classList.remove("hidden");
  document.getElementById("navLink").classList.remove("hidden");
  document.getElementById("loginButton").classList.add("hidden");
  document.getElementById("logoutButton").classList.remove("hidden");
  document.getElementById("addMenu").classList.remove("hidden");
  document.getElementById("task-list-button").classList.remove("hidden");
  document.getElementById("habit-list-button").classList.remove("hidden");
  document.getElementById("event-list-button").classList.remove("hidden");
  document.getElementById("lists").classList.remove("hidden");

  let loggedInUser = JSON.parse(localStorage.getItem(user));

  let filteredTaskList = loggedInUser.tasklist.filter((task) => {
    if (task.completed === false) return true;
  });
  const reversedFilteredTaskList = filteredTaskList.reverse();
  let taskList = document.getElementById("task-list");
  var ul = document.createElement("ul");
  for (let i = 0; i < 3; i++) {
    if (reversedFilteredTaskList[i]) {
      var li = document.createElement("li");
      li.innerHTML = `${reversedFilteredTaskList[i].title}
        <br><br>Category: ${reversedFilteredTaskList[i].category}
        <br>Deadline: ${reversedFilteredTaskList[i].deadline} 
        <br>Lasts: ${reversedFilteredTaskList[i].timeEstimate} min`;
      ul.appendChild(li);
    }
  }
  taskList.appendChild(ul);

  sortedHabitList = loggedInUser.habitlist.sort(
    (a, b) => b.repetitions - a.repetitions
  );
  let habitList = document.getElementById("habit-list");
  var ul = document.createElement("ul");
  for (let i = 0; i < 3; i++) {
    if (sortedHabitList[i]) {
      var li = document.createElement("li");
      li.innerHTML = `${sortedHabitList[i].title}<br><br>Priority: ${sortedHabitList[i].priority}<br>Repetitions: ${sortedHabitList[i].repetitions}`;
      ul.appendChild(li);
    }
  }
  habitList.appendChild(ul);

  let filteredEventList = loggedInUser.eventlist.filter((event) => {
    if (new Date(event.end) > new Date()) return true;
  });
  sortedEventList = filteredEventList.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );
  let eventList = document.getElementById("event-list");
  var ul = document.createElement("ul");
  for (let i = 0; i < 3; i++) {
    if (sortedEventList[i]) {
      var li = document.createElement("li");
      li.innerHTML = `${sortedEventList[i].name}<br><br>Start: ${sortedEventList[i].start.replace("T"," ").replace(":00.000Z", "")}<br>End: ${sortedEventList[i].end.replace("T"," ").replace(":00.000Z", "")}`;
      ul.appendChild(li);
    }
  }
  eventList.appendChild(ul);
} else {
  document.getElementById("navLoginButton").classList.remove("hidden");
  document.getElementById("loginButton").classList.remove("hidden");
  document.getElementById(
    "welcomeMessage"
  ).innerHTML = `Welcome to your Productivity Assistant. <br> <a href='/login/index.html'>Login</a>.`;
}

document.getElementById("navLogoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("user");
  window.location.href = "/index.html";
});

document.getElementById("navLoginButton").addEventListener("click", () => {
  window.location.href = "/login/index.html";
});

document.getElementById("logoutButton").addEventListener("click", () => {
  sessionStorage.removeItem("user");
  window.location.href = "/index.html";
});

document.getElementById("loginButton").addEventListener("click", () => {
  window.location.href = "/login/index.html";
});

document.getElementById("task-list-button").addEventListener("click", () => {
  window.location.href = "/task/index.html";
});

document.getElementById("habit-list-button").addEventListener("click", () => {
  window.location.href = "/habit/index.html";
});

document.getElementById("event-list-button").addEventListener("click", () => {
  window.location.href = "/event/index.html";
});
