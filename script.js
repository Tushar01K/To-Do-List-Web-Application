document.addEventListener('DOMContentLoaded', () => {
    const TaskInput = document.getElementById('todo-input');
    const AddTaskBtn = document.getElementById('add-btn');
    const TaskList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => renderTasks(task));

    AddTaskBtn.addEventListener('click', () => {
        if (TaskInput.value.trim() === '') {
            alert('Please Enter a Task');
            return;
        }
        const newTask = {
            id: Date.now(),
            task: TaskInput.value.trim(),
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks(newTask);
        TaskInput.value = '';
    });
    function renderTasks(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.task}</span>
            <button class="delete-btn">Delete</button>
        `;
        li.querySelector('.delete-btn').addEventListener('click', () => {
            TaskList.removeChild(li);
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
        });
        TaskList.appendChild(li);
    }
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    document.getElementById('toggle-dark-mode')
        .addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });

});
