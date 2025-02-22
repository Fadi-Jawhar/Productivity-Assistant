document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let user = localStorage.getItem(username);

  if (user) {
    let parsedUser = JSON.parse(user);
    if (parsedUser.password === password) {
      sessionStorage.setItem("user", JSON.stringify(parsedUser.username));
      window.location.href = "/index.html";
    } else {
      alert("Incorrect password");
    }
  } else {
    alert("User not found");
  }
});

document.getElementById("navLoginButton").addEventListener("click", () => {
  window.location.href = "/login/index.html";
});

document.getElementById("loginButton").addEventListener("click", () => {
  window.location.href = "/login/index.html";
});
