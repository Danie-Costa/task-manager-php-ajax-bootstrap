document.addEventListener('DOMContentLoaded', function() {
    // Get all kanban columns
    const kanbanColumns = document.querySelectorAll('.kanbanColumn');
    
    // Function to load tasks for a column
    function loadTasksForColumn(column) {
        const statusId = column.getAttribute('data-id');
        
        // Make AJAX request
        fetch(`http://localhost:8081/api/tasks?status=${statusId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(tasks => {
            // Clear existing tasks in the column
            const taskContainer = column.querySelector('.task-container');
            if (taskContainer) {
                taskContainer.innerHTML = '';
            }
            
            // Add each task to the column
            tasks.forEach(task => {
                const taskElement = createTaskElement(task);
                taskContainer.appendChild(taskElement);
            });
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
        });
    }
    
    // Function to create task element
    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-card';
        taskDiv.setAttribute('data-task-id', task.id);
        
        taskDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <button class="btn btn-primary" onclick="openTaskModal(${task.id})">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        `;
        
        return taskDiv;
    }
    
    // Load tasks for each column
    kanbanColumns.forEach(column => {
        loadTasksForColumn(column);
    });
    
    // Optional: Set up periodic refresh
    setInterval(() => {
        kanbanColumns.forEach(column => {
            loadTasksForColumn(column);
        });
    }, 30000); // Refresh every 30 seconds
}); 