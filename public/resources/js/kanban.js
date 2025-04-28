document.addEventListener('DOMContentLoaded', function() {
    const kanbanColumns = document.querySelectorAll('.kanbanColumn');

    function loadTasksForColumn(column) {
        const stepId = column.getAttribute('data-id');

        fetch(`http://localhost:8081/api/tasks?step=${stepId}`, {
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
            const kanbanCards = column.querySelector('.kanbanCards');
            const kanbanModals = column.querySelector('.kanbanModals');

            if (kanbanCards) kanbanCards.innerHTML = '';
            if (kanbanModals) kanbanModals.innerHTML = '';

            tasks.forEach(task => {
                const taskElement = createTaskElement(task);
                const taskModal = createModalTaskElement(task);

                if (kanbanCards) kanbanCards.appendChild(taskElement);
                if (kanbanModals) kanbanModals.appendChild(taskModal);
            });
        })
        .catch(error => {
            console.error('Error loading tasks:', error);
        });
    }

    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'kanbanCard card p-3';
        taskDiv.setAttribute('draggable', 'true');
        taskDiv.setAttribute('data-toggle', 'modal');
        taskDiv.setAttribute('data-target', `#cardTask-${task.id}`);

        let priorityBadge = '';
        if (task.status === 1) {
            priorityBadge = `
                <div class="badge w-75 badge-pill badge-danger">
                    <span>Alta prioridade</span>
                </div>`;
        } else if (task.status === 2) {
            priorityBadge = `
                <div class="badge w-75 badge-pill badge-warning">
                    <span>Média prioridade</span>
                </div>`;
        } else if (task.status === 3) {
            priorityBadge = `
                <div class="badge w-75 badge-pill badge-info">
                    <span>Baixa prioridade</span>
                </div>`;
        }

        taskDiv.innerHTML = `
            ${priorityBadge}
            <p class="cardTitle py-2 m-0">${task.title}</p>
        `;

        return taskDiv;
    }

    function createModalTaskElement(task) {
        const modalDiv = document.createElement('div');
        modalDiv.className = 'modal fade';
        modalDiv.setAttribute('id', `cardTask-${task.id}`);
        modalDiv.setAttribute('tabindex', '-1');
        modalDiv.setAttribute('aria-hidden', 'true');

        modalDiv.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${task.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${task.description}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;

        return modalDiv;
    }

    kanbanColumns.forEach(column => {
        loadTasksForColumn(column);
    });

    document.querySelectorAll('.kanbanCards').forEach(column => {
        column.addEventListener('dragover', e => {
            e.preventDefault();
            e.currentTarget.classList.add('cardsHover');
        });

        column.addEventListener('dragleave', e => {
            e.currentTarget.classList.remove('cardsHover');
        });

        column.addEventListener('drop', e => {
            e.preventDefault();
            e.currentTarget.classList.remove('cardsHover');
            const dragCard = document.querySelector('.kanbanCard.dragging');
            if (dragCard) {
                e.currentTarget.appendChild(dragCard);
            }
        });
    });

    document.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('kanbanCard')) {
            e.target.classList.add('dragging');
        }
    });

    document.addEventListener('dragend', function(e) {
        if (e.target.classList.contains('kanbanCard')) {
            e.target.classList.remove('dragging');
        }
    });

});
