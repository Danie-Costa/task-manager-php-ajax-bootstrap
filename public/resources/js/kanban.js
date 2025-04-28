document.addEventListener('DOMContentLoaded', () => {
    const kanbanColumns = document.querySelectorAll('.kanbanColumn');

    const API_URL = 'http://localhost:8081/api/tasks';

    function loadTasksForColumn(column) {
        const stepId = column.dataset.id;

        fetch(`${API_URL}?step=${stepId}`)
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar tarefas');
                return response.json();
            })
            .then(tasks => {
                const kanbanCards = column.querySelector('.kanbanCards');
                const kanbanModals = column.querySelector('.kanbanModals');

                if (kanbanCards) kanbanCards.innerHTML = '';
                if (kanbanModals) kanbanModals.innerHTML = '';

                tasks.forEach(task => {
                    kanbanCards?.appendChild(createTaskElement(task));
                    kanbanModals?.appendChild(createModalTaskElement(task));
                });
            })
            .catch(error => console.error('Erro ao carregar tarefas:', error));
    }

    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'kanbanCard card p-3';
        taskDiv.draggable = true;
        taskDiv.dataset.toggle = 'modal';
        taskDiv.dataset.target = `#cardTask-${task.id}`;
        taskDiv.dataset.id = task.id; // Guardando ID para drag & drop
        taskDiv.dataset.step = task.step; // Guardando o step atual

        let priorityBadge = '';
        switch (task.status) {
            case 1:
                priorityBadge = `<div class="badge w-75 badge-pill badge-danger"><span>Alta prioridade</span></div>`;
                break;
            case 2:
                priorityBadge = `<div class="badge w-75 badge-pill badge-warning"><span>Média prioridade</span></div>`;
                break;
            case 3:
                priorityBadge = `<div class="badge w-75 badge-pill badge-info"><span>Baixa prioridade</span></div>`;
                break;
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
        modalDiv.id = `cardTask-${task.id}`;
        modalDiv.tabIndex = -1;
        modalDiv.setAttribute('aria-hidden', 'true');

        modalDiv.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Tarefa</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editTaskForm-${task.id}">
                            <input type="hidden" name="task_id" value="${task.id}">
                            <div class="form-group">
                                <label for="title-${task.id}">Título</label>
                                <input type="text" class="form-control" id="title-${task.id}" name="title" value="${task.title}" required>
                            </div>
                            <div class="form-group">
                                <label for="description-${task.id}">Descrição</label>
                                <textarea class="form-control" id="description-${task.id}" name="description" rows="3">${task.description || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="status-${task.id}">Prioridade</label>
                                <select class="form-control" id="status-${task.id}" name="status" required>
                                    <option value="1" ${task.status === 1 ? 'selected' : ''}>Alta Prioridade</option>
                                    <option value="2" ${task.status === 2 ? 'selected' : ''}>Média Prioridade</option>
                                    <option value="3" ${task.status === 3 ? 'selected' : ''}>Baixa Prioridade</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="step-${task.id}">Etapa</label>
                                <select class="form-control" id="step-${task.id}" name="step" required>
                                    <option value="1" ${task.step === 1 ? 'selected' : ''}>To Do</option>
                                    <option value="2" ${task.step === 2 ? 'selected' : ''}>Doing</option>
                                    <option value="3" ${task.step === 3 ? 'selected' : ''}>Done</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveTask(${task.id})">Salvar</button>
                    </div>
                </div>
            </div>
        `;

        return modalDiv;
    }

    window.saveTask = function(taskId) {
        const form = document.getElementById(`editTaskForm-${taskId}`);
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        fetch(`${API_URL}/editTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao salvar tarefa');
            return response.json();
        })
        .then(() => {
            $(`#cardTask-${taskId}`).modal('hide');
            reloadAllColumns();
        })
        .catch(error => {
            console.error('Erro ao salvar tarefa:', error);
            alert('Erro ao salvar a tarefa. Por favor, tente novamente.');
        });
    };

    function reloadAllColumns() {
        kanbanColumns.forEach(loadTasksForColumn);
    }

    // Drag and Drop behavior
    document.querySelectorAll('.kanbanCards').forEach(cardsContainer => {
        cardsContainer.addEventListener('dragover', e => {
            e.preventDefault();
            cardsContainer.classList.add('cardsHover');
        });

        cardsContainer.addEventListener('dragleave', () => {
            cardsContainer.classList.remove('cardsHover');
        });

        cardsContainer.addEventListener('drop', async e => {
            e.preventDefault();
            cardsContainer.classList.remove('cardsHover');

            const draggedCard = document.querySelector('.kanbanCard.dragging');
            if (draggedCard) {
                const newColumn = cardsContainer.closest('.kanbanColumn');
                const newStepId = newColumn.dataset.id;
                const taskId = draggedCard.dataset.id;

                // Atualizar visualmente
                cardsContainer.appendChild(draggedCard);

                // Atualizar no servidor
                try {
                    await fetch(`${API_URL}/editTask`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({ task_id: taskId, step: newStepId })
                    });
                    reloadAllColumns();
                } catch (error) {
                    console.error('Erro ao mover tarefa:', error);
                    alert('Erro ao mover a tarefa. Tente novamente.');
                }
            }
        });
    });

    document.addEventListener('dragstart', e => {
        if (e.target.classList.contains('kanbanCard')) {
            e.target.classList.add('dragging');
        }
    });

    document.addEventListener('dragend', e => {
        if (e.target.classList.contains('kanbanCard')) {
            e.target.classList.remove('dragging');
        }
    });

    // Inicializar o carregamento das colunas
    reloadAllColumns();
});
