let user = localStorage.getItem("user");

if (user) {
  let parsedUser = JSON.parse(user);
  document.getElementById(
    "welcomeMessage"
  ).innerHTML = `Hello ${parsedUser.name}`;
  document.getElementById("logoutButton").classList.remove("hidden");

  document.getElementById("addButton").addEventListener("click", () => {
    let userTasklistUpdate = JSON.parse(localStorage.getItem("user"));

    userTasklistUpdate.tasklist.push("Lemon");
    localStorage.setItem("user", JSON.stringify(userTasklistUpdate));
    alert("Add successful!");
    window.location.href = "/index.html";
  });
} else {
  document.getElementById(
    "welcomeMessage"
  ).innerHTML = `Hello, please <a href='/login/index.html'>login</a>.`;
}

document.getElementById("logoutButton").addEventListener("click", () => {
  let userUpdate = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem(userUpdate.username, JSON.stringify(userUpdate));
  localStorage.removeItem("user");
  window.location.href = "/login/index.html";
});