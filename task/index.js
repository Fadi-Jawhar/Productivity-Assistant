let user = JSON.parse(sessionStorage.getItem("user"));

if (user) {
    document.querySelector("#navLogoutButton").classList.remove("hidden");
document.querySelector("#navLink").classList.remove("hidden");
document.querySelector("#loginButton").classList.add("hidden");
document.querySelector("#logoutButton").classList.remove("hidden");
document.querySelector("#addMenu").classList.remove("hidden");
    document.querySelector("#userLoggedIn").classList.remove("hidden");
    
    const todoForm = document.querySelector("#todo-form");
    const todoList = document.querySelector("#todo-list");
    const filterSelect = document.querySelector("#filter");
    const sortSelect = document.querySelector("#sort");

    let todos = JSON.parse(localStorage.getItem(user)) || { todolist: [] };

    todoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const title = document.querySelector("#todo-title").value;
        const description = document.querySelector("#todo-description").value;
        const timeEstimate = parseInt(document.querySelector("#todo-time").value);
        const category = document.querySelector("#todo-category").value;
        const deadline = document.querySelector("#todo-deadline").value;

        todos.tasklist.push({ 
            id: Date.now(), 
            title, 
            description, 
            timeEstimate, 
            category, 
            deadline, 
            completed: false 
        });

        saveTodos();
        todoForm.reset();
    });

    function saveTodos() {
        localStorage.setItem(user, JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        todoList.innerHTML = "";
        
        let filteredTodos = todos.tasklist.filter(todo => {
            if (filterSelect.value === "all") return true;
            return filterSelect.value === "true" ? todo.completed : !todo.completed;
        });
        
        filteredTodos.sort((a, b) => {
            if (sortSelect.value === "deadline") {
                return new Date(a.deadline) - new Date(b.deadline);
            } else if (sortSelect.value === "timeEstimate") {
                return a.timeEstimate - b.timeEstimate;
            }
        });

        filteredTodos.forEach(todo => {
            const todoItem = document.createElement("li");
            todoItem.innerHTML = `${todo.title} - ${todo.category} - ${todo.deadline} (${todo.timeEstimate} min)`;
            
            const toggleBtn = document.createElement("button");
            toggleBtn.textContent = todo.completed ? "Mark as incomplete" : "Mark as completed";
            toggleBtn.onclick = () => {
                todo.completed = !todo.completed;
                saveTodos();
            };
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Remove";
            deleteBtn.onclick = () => {
                todos.tasklist = todos.tasklist.filter(t => t.id !== todo.id);
                saveTodos();
            };
            
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = () => editTodo(todo);

            todoItem.appendChild(toggleBtn);
            todoItem.appendChild(editBtn);
            todoItem.appendChild(deleteBtn);

            if (todo.completed) {
                todoItem.style.textDecoration = "line-through";
            }

            todoList.appendChild(todoItem);
        });
    }

    function editTodo(todo) {
        document.querySelector("#todo-title").value = todo.title;
        document.querySelector("#todo-description").value = todo.description;
        document.querySelector("#todo-time").value = todo.timeEstimate;
        document.querySelector("#todo-category").value = todo.category;
        document.querySelector("#todo-deadline").value = todo.deadline;
        
        todos.tasklist = todos.tasklist.filter(t => t.id !== todo.id);
        saveTodos();
    }

    filterSelect.addEventListener("change", renderTodos);
    sortSelect.addEventListener("change", renderTodos);
    
    renderTodos();

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
