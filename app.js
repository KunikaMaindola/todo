document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');
    const taskList = document.getElementById('task-list');
    const statusFilter = document.getElementById('status-filter');
    const priorityFilter = document.getElementById('priority-filter');
    const taskCount = document.getElementById('task-count');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskName = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;
        if (taskName !== '') {
            addTask(taskName, dueDate, priority);
            taskInput.value = '';
            dueDateInput.value = '';
            priorityInput.value = 'low';
        }
    });

    function addTask(taskName, dueDate, priority) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const taskDetails = document.createElement('div');
        taskDetails.innerHTML = `
            <span class="task-name">${taskName}</span>
            <span class="due-date">Due: ${dueDate}</span>
            <span class="priority">Priority: ${priority}</span>
        `;
        taskItem.appendChild(taskDetails);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', function () {
            editTask(taskItem, taskName, dueDate, priority);
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            taskItem.remove();
            updateTaskCount();
        });

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);
        taskItem.appendChild(buttonsContainer);

        taskList.appendChild(taskItem);
        updateTaskCount();
    }

    function editTask(taskItem, taskName, dueDate, priority) {
        const taskDetails = taskItem.querySelector('.task-details');
        taskDetails.innerHTML = `
            <input type="text" class="edit-task-name" value="${taskName}">
            <input type="date" class="edit-due-date" value="${dueDate}">
            <select class="edit-priority">
                <option value="low" ${priority === 'low' ? 'selected' : ''}>Low Priority</option>
                <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium Priority</option>
                <option value="high" ${priority === 'high' ? 'selected' : ''}>High Priority</option>
            </select>
            <button class="save-btn">Save</button>
        `;

        const saveButton = taskDetails.querySelector('.save-btn');
        saveButton.addEventListener('click', function () {
            const newTaskName = taskDetails.querySelector('.edit-task-name').value;
            const newDueDate = taskDetails.querySelector('.edit-due-date').value;
            const newPriority = taskDetails.querySelector('.edit-priority').value;

            taskDetails.innerHTML = `
                <span class="task-name">${newTaskName}</span>
                <span class="due-date">Due: ${newDueDate}</span>
                <span class="priority">Priority: ${newPriority}</span>
            `;

            updateTaskCount();
        });
    }

    function updateTaskCount() {
        const totalTasks = taskList.children.length;
        const todoTasks = document.querySelectorAll('.task-name').length;
        const inProgressTasks = document.querySelectorAll('.task-name').length;
        const doneTasks = document.querySelectorAll('.task-name').length;

        taskCount.innerHTML = `Total Tasks: ${totalTasks} | To-do: ${todoTasks} | In Progress: ${inProgressTasks} | Done: ${doneTasks}`;
    }

    statusFilter.addEventListener('change', function () {
        const selectedStatus = statusFilter.value;

        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(function (taskItem) {
            const status = taskItem.getAttribute('data-status');
            taskItem.style.display = selectedStatus === 'all' || status === selectedStatus ? 'flex' : 'none';
        });
    });

    priorityFilter.addEventListener('change', function () {
        const selectedPriority = priorityFilter.value;

        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach(function (taskItem) {
            const priority = taskItem.getAttribute('data-priority');
            taskItem.style.display = selectedPriority === 'all' || priority === selectedPriority ? 'flex' : 'none';
        });
    });
});

