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

  // Aktivera senare för api anrop
  //getAdvice();

  document.getElementById("navLogoutButton").classList.remove("hidden");
  document.getElementById("navLink").classList.remove("hidden");
  document.getElementById("loginButton").classList.add("hidden");
  document.getElementById("logoutButton").classList.remove("hidden");
  document.getElementById("addMenu").classList.remove("hidden");
  document.getElementById("task-list-button").classList.remove("hidden");
  document.getElementById("habit-list-button").classList.remove("hidden");
  document.getElementById("event-list-button").classList.remove("hidden");

  let loggedInUser = JSON.parse(localStorage.getItem(user));

  let taskList = document.getElementById("task-list");
  var ul = document.createElement("ul");
  loggedInUser.tasklist.forEach((task) => {
    var li = document.createElement("li");
    li.innerHTML = `Task: ${task.title}`;
    ul.appendChild(li);
  });
  taskList.appendChild(ul);

  let eventList = document.getElementById("event-list");
  var ul = document.createElement("ul");
  loggedInUser.eventlist.forEach((event) => {
    var li = document.createElement("li");
    li.innerHTML = `Event: ${event.name}, Start: ${event.start}, End: ${event.start}`;
    ul.appendChild(li);
  });
  eventList.appendChild(ul);

  let habitList = document.getElementById("habit-list");
  var ul = document.createElement("ul");
  loggedInUser.habitlist.forEach((habit) => {
    var li = document.createElement("li");
    li.innerHTML = `Title: ${habit.title}, Repetitions: ${habit.priority}`;
    ul.appendChild(li);
  });
  habitList.appendChild(ul);

} else {
  document.getElementById("navLoginButton").classList.remove("hidden");
  document.getElementById("loginButton").classList.remove("hidden");
  document.getElementById(
    "welcomeMessage"
  ).innerHTML = `Hello, please <a href='/login/index.html'>login</a>.`;
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
