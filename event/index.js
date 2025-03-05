let user = JSON.parse(sessionStorage.getItem("user"));

if (user) {

document.querySelector("#navLogoutButton").classList.remove("hidden");
document.querySelector("#navLink").classList.remove("hidden");
document.querySelector("#loginButton").classList.add("hidden");
document.querySelector("#logoutButton").classList.remove("hidden");
document.querySelector("#addMenu").classList.remove("hidden");

document.querySelector("#userLoggedIn").classList.remove("hidden");

document.addEventListener("DOMContentLoaded", function () {
    const eventForm = document.querySelector("#event-form");
    const eventList = document.querySelector("#event-list");
    const pastEventList = document.querySelector("#past-event-list");
    const filterSelect = document.querySelector("#filter");

    let events = JSON.parse(localStorage.getItem(user));

    eventForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.querySelector("#event-name").value;
        const start = new Date(document.querySelector("#event-start").value);
        const end = new Date(document.querySelector("#event-end").value);

        if (start >= end) {
            alert("The start time must be before the end time!");
            return;
        }

        events.eventlist.push({ id: Date.now(), name, start, end });
        events.eventlist.sort((a, b) => a.start - b.start);
        saveEvent();
        eventForm.reset();
    });

    function saveEvent() {
        events.eventlist.sort((a, b) => new Date(a.start) - new Date(b.start));
        localStorage.setItem(user, JSON.stringify(events));
        renderEvents();
    }

    function renderEvents() {
        eventList.innerHTML = "";
        pastEventList.innerHTML = "";
        const now = new Date();

        events.eventlist.sort((a, b) => new Date(a.start) - new Date(b.start));


        events.eventlist.forEach(event => {
            const eventItem = document.createElement("li");
            eventItem.textContent = `${event.name} (${new Date(event.start).toLocaleString()} - ${new Date(event.end).toLocaleString()})`;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Remove";
            deleteBtn.onclick = () => {
                events.eventlist = events.eventlist.filter(e => e.id !== event.id);
                saveEvent();
            };

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
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