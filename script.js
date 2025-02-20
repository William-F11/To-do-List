document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let todoBox = document.getElementById('todoBox');
    let todoText = todoBox.value.trim();
    if (todoText === "") return;

    let todoList = document.getElementById('listText');
    if (!todoList) {
        console.error('Todo list element not found');
        return;
    }

    let li = document.createElement('li');
    li.innerHTML = `<span onclick="toggleComplete(this)">${todoText}</span>
                    <button onclick="removeTask(this)"><b>X</b></button>`;

    todoList.appendChild(li);
    saveTasks();
    todoBox.value = "";
}

function toggleComplete(task) {
    task.classList.toggle("completed");
    saveTasks();
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#listText li").forEach(li => { // Changed from #todoList to #listText
        tasks.push({ text: li.firstChild.textContent, completed: li.firstChild.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) return;

    let todoList = document.getElementById('listText'); // Changed from 'todoList' to 'listText'
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.innerHTML = `<span onclick="toggleComplete(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
                        <button onclick="removeTask(this)">X</button>`;
        if (task.completed) li.firstChild.classList.add("completed");
        todoList.appendChild(li);
    });
}

/*
document.addEventListener("DOMContentLoaded", loadTasks);
        function addTask() {
            let taskInput = document.getElementById("taskInput");
            let taskText = taskInput.value.trim();
            if (taskText === "") return;
            
            let taskList = document.getElementById("taskList");
            let li = document.createElement("li");
            li.innerHTML = `<span onclick="toggleComplete(this)">${taskText}</span>
                            <button onclick="removeTask(this)">X</button>`;
            
            taskList.appendChild(li);
            saveTasks();
            taskInput.value = "";
        }
 function saveTasks() {
            let tasks = [];
            document.querySelectorAll("#taskList li").forEach(li => {
                tasks.push({ text: li.firstChild.textContent, completed: li.firstChild.classList.contains("completed") });
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
*/