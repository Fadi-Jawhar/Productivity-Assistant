let user = JSON.parse(sessionStorage.getItem("user"));

if (user) {

document.getElementById("navLogoutButton").classList.remove("hidden");
document.getElementById("navLink").classList.remove("hidden");
document.getElementById("loginButton").classList.add("hidden");
document.getElementById("logoutButton").classList.remove("hidden");
document.getElementById("addMenu").classList.remove("hidden");

document.querySelector("#userLoggedIn").classList.remove("hidden");

document.addEventListener("DOMContentLoaded", function () {
    const eventForm = document.querySelector("#event-form");
    const eventList = document.querySelector("#event-list");
    const pastEventList = document.querySelector("#past-event-list");
    const filterSelect = document.querySelector("#filter");

    let events = JSON.parse(localStorage.getItem(user));
    
    //let events = JSON.parse(localStorage.getItem("events")) || [];

    eventForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.querySelector("#event-name").value;
        const start = new Date(document.querySelector("#event-start").value);
        const end = new Date(document.querySelector("#event-end").value);

        if (start >= end) {
            alert("Starttiden måste vara före sluttiden!");
            return;
        }

        events.eventlist.push({ id: Date.now(), name, start, end });
        events.eventlist.sort((a, b) => a.start - b.start);
        saveEvent();
        eventForm.reset();
    });

   /*  document.getElementById("addEventButton").addEventListener("click", () => {
        let userEventListUpdate = JSON.parse(localStorage.getItem(user));
        let name = "Test Event";
        let start = new Date();
        let end = new Date();
        userEventListUpdate.eventlist.push({ id: Date.now(), name, start, end });
        localStorage.setItem(user, JSON.stringify(userEventListUpdate));
        alert("Add successful!");
        window.location.href = "/index.html";
      }); */

    function saveEvent() {
        //localStorage.setItem("events", JSON.stringify(events));
        
        localStorage.setItem(user, JSON.stringify(events));
        renderEvents();
    }

    function renderEvents() {
        eventList.innerHTML = "";
        pastEventList.innerHTML = "";
        const now = new Date();

        events.eventlist.forEach(event => {
            const eventItem = document.createElement("li");
            eventItem.textContent = `${event.name} (${new Date(event.start).toLocaleString()} - ${new Date(event.end).toLocaleString()})`;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Ta bort";
            deleteBtn.onclick = () => {
                events.eventlist = events.eventlist.filter(e => e.id !== event.id);
                saveEvent();
            };

            const editBtn = document.createElement("button");
            editBtn.textContent = "Redigera";
            editBtn.onclick = () => editEvent(event);

            eventItem.appendChild(editBtn);
            eventItem.appendChild(deleteBtn);

            if (new Date(event.end) < now) {
                eventItem.style.color = "gray";
                pastEventList.appendChild(eventItem);
            } else {
                eventList.appendChild(eventItem);
            }
        });
    }

    function editEvent(event) {
        document.querySelector("#event-name").value = event.name;
        document.querySelector("#event-start").value = new Date(event.start).toISOString().slice(0, 16);
        document.querySelector("#event-end").value = new Date(event.end).toISOString().slice(0, 16);
        events.eventlist = events.eventlist.filter(e => e.id !== event.id);
        saveEvent();
    }

    filterSelect.addEventListener("change", function () {
        const filter = filterSelect.value;
        eventList.style.display = filter === "past" ? "none" : "block";
        pastEventList.style.display = filter === "upcoming" ? "none" : "block";
    });

    renderEvents();
});

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
}