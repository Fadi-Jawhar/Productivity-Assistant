let user = localStorage.getItem("user");

if (user) {
  let parsedUser = JSON.parse(user);
  document.getElementById(
    "welcomeMessage"
  ).innerHTML = `Hello ${parsedUser.name}`;
  document.getElementById("loginButton").classList.add("hidden");
  document.getElementById("logoutButton").classList.remove("hidden");
  document.getElementById("addTaskButton").classList.remove("hidden");
  document.getElementById("addEventButton").classList.remove("hidden");
  document.getElementById("addMenu").classList.remove("hidden");

  document.getElementById("addTaskButton").addEventListener("click", () => {
    let userTasklistUpdate = JSON.parse(localStorage.getItem("user"));
    userTasklistUpdate.tasklist.push("Lemon");
    localStorage.setItem("user", JSON.stringify(userTasklistUpdate));
    alert("Add successful!");
    window.location.href = "/index.html";
  });

  document.getElementById("addEventButton").addEventListener("click", () => {
    let userEventListUpdate = JSON.parse(localStorage.getItem("user"));
    let name = "Test Event";
    let start = new Date();
    let end = new Date();
    userEventListUpdate.eventlist.push({ id: Date.now(), name, start, end });
    localStorage.setItem("user", JSON.stringify(userEventListUpdate));
    alert("Add successful!");
    window.location.href = "/index.html";
  });
} else {
  document.getElementById("loginButton").classList.remove("hidden");
  document.getElementById(
    "welcomeMessage"
  ).innerHTML = `Hello, please <a href='/login/index.html'>login</a>.`;
}

document.getElementById("logoutButton").addEventListener("click", () => {
  let userUpdate = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem(userUpdate.username, JSON.stringify(userUpdate));
  localStorage.removeItem("user");
  window.location.href = "/index.html";
});

document.getElementById("loginButton").addEventListener("click", () => {
  window.location.href = "/login/index.html";
});
