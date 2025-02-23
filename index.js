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
  getAdvice();

  document.getElementById("navLogoutButton").classList.remove("hidden");
  document.getElementById("navLink").classList.remove("hidden");
  document.getElementById("loginButton").classList.add("hidden");
  document.getElementById("logoutButton").classList.remove("hidden");
  document.getElementById("addTaskButton").classList.remove("hidden");
  document.getElementById("addEventButton").classList.remove("hidden");
  document.getElementById("addMenu").classList.remove("hidden");

  let loggedInUser = JSON.parse(localStorage.getItem(user));
  let eventList = document.getElementById("event-list");
  var ul = document.createElement("ul");
  loggedInUser.eventlist.forEach((event) => {
    var li = document.createElement("li");
    li.innerHTML = `Event: ${event.start}`;
    ul.appendChild(li);
  });
  eventList.appendChild(ul);

  document.getElementById("addTaskButton").addEventListener("click", () => {
    let userTasklistUpdate = JSON.parse(localStorage.getItem(user));
    userTasklistUpdate.tasklist.push("Lemon");
    localStorage.setItem(user, JSON.stringify(userTasklistUpdate));
    alert("Add successful!");
    window.location.href = "/index.html";
  });

  document.getElementById("addEventButton").addEventListener("click", () => {
    let userEventListUpdate = JSON.parse(localStorage.getItem(user));
    let name = "Test Event";
    let start = new Date();
    let end = new Date();
    userEventListUpdate.eventlist.push({ id: Date.now(), name, start, end });
    localStorage.setItem(user, JSON.stringify(userEventListUpdate));
    alert("Add successful!");
    window.location.href = "/index.html";
  });
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
