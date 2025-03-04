// Select the necessary DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Event listener for adding tasks
addTaskBtn.addEventListener('click', addTask);

// Event listener for handling actions on tasks (complete, edit, delete)
taskList.addEventListener('click', handleTaskActions);

// Function to add a new task
function addTask() {
    // Get the task text input by the user
    const taskText = taskInput.value.trim();

    // Check if the task input is not empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new list item for the task
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    // Add task text and action buttons (complete, edit, delete) to the task item
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div class="task-actions">
            <button class="complete-btn"><i class="fas fa-check"></i></button>
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;

    // Append the new task to the task list
    taskList.appendChild(taskItem);

    // Clear the input field and focus on it for the next task
    taskInput.value = '';
    taskInput.focus();
}

// Function to handle task actions (complete, edit, delete)
function handleTaskActions(e) {
    const target = e.target;

    // Handle task completion (toggle strikethrough)
    if (target.classList.contains('complete-btn') || target.closest('.complete-btn')) {
        const taskItem = target.closest('.task-item');
        taskItem.classList.toggle('completed');
    }

    // Handle task editing (prompt for new task text)
    if (target.classList.contains('edit-btn') || target.closest('.edit-btn')) {
        const taskItem = target.closest('.task-item');
        const taskText = taskItem.querySelector('span').textContent;
        const newTaskText = prompt('Edit your task:', taskText);

        // Update task text if valid input is provided
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskItem.querySelector('span').textContent = newTaskText.trim();
        }
    }

    // Handle task deletion (remove task from the list with fade-out effect)
    if (target.classList.contains('delete-btn') || target.closest('.delete-btn')) {
        const taskItem = target.closest('.task-item');
        taskItem.classList.add('fade-out');
        taskItem.addEventListener('transitionend', () => taskItem.remove());
    }
}
