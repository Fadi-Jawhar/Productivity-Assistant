document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let habitlist = [];
    let tasklist = [];
    let eventlist = [];

    let user = {
      name: name,
      username: username,
      password: password,
      habitlist: habitlist,
      tasklist: tasklist,
      eventlist: eventlist,
    };

    localStorage.setItem(username, JSON.stringify(user));
    alert("Registration successful! Please login.");
    window.location.href = "/login/index.html";
  });
