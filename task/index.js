document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "/login/index.html";
        return;
    }
    
    const todoForm = document.querySelector("#todo-form");
    const todoList = document.querySelector("#todo-list");
    const filterStatus = document.querySelector("#filter-status");
    const filterCategory = document.querySelector("#filter-category");
    const sortSelect = document.querySelector("#sort-select");
    
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    
    todoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const title = document.querySelector("#todo-title").value;
        const description = document.querySelector("#todo-description").value;
        const estimatedTime = parseInt(document.querySelector("#todo-time").value);
        const category = document.querySelector("#todo-category").value;
        const deadline = new Date(document.querySelector("#todo-deadline").value);
        
        if (!title || !description || !category || isNaN(estimatedTime) || !deadline) {
            alert("Vänligen fyll i alla fält!");
            return;
        }
        
        todos.push({
            id: Date.now(),
            title,
            description,
            status: false,
            estimatedTime,
            category,
            deadline,
        });
        
        saveTodos();
        todoForm.reset();
    });
    
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
    }
    
    function renderTodos() {
        todoList.innerHTML = "";
        let filteredTodos = [...todos];
        
        if (filterStatus.value !== "all") {
            const isCompleted = filterStatus.value === "completed";
            filteredTodos = filteredTodos.filter(todo => todo.status === isCompleted);
        }
        
        if (filterCategory.value !== "all") {
            filteredTodos = filteredTodos.filter(todo => todo.category === filterCategory.value);
        }
        
        if (sortSelect.value === "deadline") {
            filteredTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if (sortSelect.value === "time") {
            filteredTodos.sort((a, b) => a.estimatedTime - b.estimatedTime);
        } else if (sortSelect.value === "status") {
            filteredTodos.sort((a, b) => a.status - b.status);
        }
        
        filteredTodos.forEach(todo => {
            const todoItem = document.createElement("li");
            todoItem.innerHTML = `
                <strong>${todo.title}</strong> (${todo.category}) - ${todo.estimatedTime} min <br>
                Deadline: ${new Date(todo.deadline).toLocaleDateString()} <br>
                Status: ${todo.status ? "✔ Slutförd" : "❌ Ej slutförd"} <br>
                <button onclick="toggleStatus(${todo.id})">Markera som ${todo.status ? "Ej slutförd" : "Slutförd"}</button>
                <button onclick="editTodo(${todo.id})">Redigera</button>
                <button onclick="deleteTodo(${todo.id})">Ta bort</button>
            `;
            todoList.appendChild(todoItem);
        });
    }
    
    window.toggleStatus = function (id) {
        const todo = todos.find(t => t.id === id);
        todo.status = !todo.status;
        saveTodos();
    };
    
    window.deleteTodo = function (id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
    };
    
    window.editTodo = function (id) {
        const todo = todos.find(t => t.id === id);
        document.querySelector("#todo-title").value = todo.title;
        document.querySelector("#todo-description").value = todo.description;
        document.querySelector("#todo-time").value = todo.estimatedTime;
        document.querySelector("#todo-category").value = todo.category;
        document.querySelector("#todo-deadline").value = new Date(todo.deadline).toISOString().slice(0, 10);
        
        todos = todos.filter(t => t.id !== id);
        saveTodos();
    };
    
    filterStatus.addEventListener("change", renderTodos);
    filterCategory.addEventListener("change", renderTodos);
    sortSelect.addEventListener("change", renderTodos);
    
    renderTodos();
});
