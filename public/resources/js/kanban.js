document.addEventListener('DOMContentLoaded', () => {
    const kanbanColumns = document.querySelectorAll('.kanbanColumn');
    const addCardButtons = document.querySelectorAll('.addCard');

    function loadTasksForColumn(column) {
        const stepId = column.getAttribute('data-id');

        fetch(`http://localhost:8081/api/tasks?step=${stepId}`)
            .then(response => {
                if (!response.ok) throw new Error('Erro de rede.');
                return response.json();
            })
            .then(tasks => {
                const kanbanCards = column.querySelector('.kanbanCards');
                const kanbanModals = column.querySelector('.kanbanModals');

                if (kanbanCards) kanbanCards.innerHTML = '';
                if (kanbanModals) kanbanModals.innerHTML = '';

                tasks.forEach(task => {
                    kanbanCards.appendChild(createTaskElement(task));
                    kanbanModals.appendChild(createModalTaskElement(task));
                });
            })
            .catch(error => console.error('Erro ao carregar tarefas:', error));
    }

    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'kanbanCard card p-3 m-1';
        taskDiv.setAttribute('draggable', 'true');
        taskDiv.setAttribute('data-toggle', 'modal');
        taskDiv.setAttribute('data-target', `#cardTask-${task.id}`);
        taskDiv.setAttribute('data-id', task.id);

        let priorityBadge = '';
        if (task.status === 1) {
            priorityBadge = `<div class="badge w-75 badge-pill badge-danger">Alta prioridade</div>`;
        } else if (task.status === 2) {
            priorityBadge = `<div class="badge w-75 badge-pill badge-warning">Média prioridade</div>`;
        } else if (task.status === 3) {
            priorityBadge = `<div class="badge w-75 badge-pill badge-info">Baixa prioridade</div>`;
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
                        <h5 class="modal-title">Editar Tarefa</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editTaskForm-${task.id}" class="edit-task-form">
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
                                    <option value="1" ${task.status === 1 ? 'selected' : ''}>Alta</option>
                                    <option value="2" ${task.status === 2 ? 'selected' : ''}>Média</option>
                                    <option value="3" ${task.status === 3 ? 'selected' : ''}>Baixa</option>
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
                    
                        <button type="button" class="btn btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
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

        fetch('http://localhost:8081/api/tasks/editTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao salvar tarefa.');
            return response.json();
        })
        .then(() => {
            $(`#cardTask-${taskId}`).modal('hide');
            kanbanColumns.forEach(column => loadTasksForColumn(column));
        })
        .catch(error => {
            console.error('Erro ao salvar tarefa:', error);
            alert('Erro ao salvar a tarefa. Tente novamente.');
        });
    };

    // DRAG & DROP + Atualização do Step
    document.querySelectorAll('.kanbanCards').forEach(cardsContainer => {
        cardsContainer.addEventListener('dragover', e => {
            e.preventDefault();
            cardsContainer.classList.add('cardsHover');
        });

        cardsContainer.addEventListener('dragleave', () => {
            cardsContainer.classList.remove('cardsHover');
        });

        cardsContainer.addEventListener('drop', e => {
            e.preventDefault();
            cardsContainer.classList.remove('cardsHover');
            const dragCard = document.querySelector('.kanbanCard.dragging');
            if (dragCard) {
                const newStep = cardsContainer.closest('.kanbanColumn').dataset.id;
                const taskId = dragCard.getAttribute('data-id');

                cardsContainer.appendChild(dragCard);

                fetch('http://localhost:8081/api/tasks/editTask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ task_id: taskId, step: newStep })
                })
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao mover tarefa.');
                    return response.json();
                })
                .then(() => {
                    kanbanColumns.forEach(column => loadTasksForColumn(column));
                })
                .catch(error => console.error('Erro ao mover tarefa:', error));
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
    window.deleteTask = function(taskId) {
        if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
            return; // Se o usuário cancelar, não faz nada
        }
    
        fetch('http://localhost:8081/api/tasks/deleteTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_id: taskId })
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao excluir tarefa.');
            return response.json();
        })
        .then(() => {
            $(`#cardTask-${taskId}`).modal('hide');
            kanbanColumns.forEach(column => loadTasksForColumn(column));
        })
        .catch(error => {
            console.error('Erro ao excluir tarefa:', error);
            alert('Erro ao excluir a tarefa. Tente novamente.');
        });
    };

    // ABRIR MODAL DE ADIÇÃO DE NOVA TAREFA
    addCardButtons.forEach(button => {
        button.addEventListener('click', () => {
            const stepId = button.getAttribute('data-id');

            // Aqui você pode abrir um modal de criação novo (exemplo usando Bootstrap)
            const modalHtml = `
                <div class="modal fade" id="newTaskModal" tabindex="-1" role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Adicionar Tarefa</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id="newTaskForm">
                                    <div class="form-group">
                                        <label for="newTitle">Título</label>
                                        <input type="text" class="form-control" id="newTitle" name="title" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="newDescription">Descrição</label>
                                        <textarea class="form-control" id="newDescription" name="description" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="status">Prioridade</label>
                                        <select class="form-control" id="status" name="status" required>
                                            <option value="1" >Alta</option>
                                            <option value="2" >Média</option>
                                            <option value="3" >Baixa</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="step">Etapa</label>
                                        <select class="form-control" id="step" name="step" required>
                                            <option value="1" >To Do</option>
                                            <option value="2" >Doing</option>
                                            <option value="3" >Done</option>
                                        </select>
                                    </div>
                                    <input type="hidden" name="step" value="${stepId}">
                                    <input type="hidden" name="status" value="2"> <!-- padrão Média prioridade -->
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-primary" id="saveNewTask">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', modalHtml);
            const modal = new bootstrap.Modal(document.getElementById('newTaskModal'));
            modal.show();

            document.getElementById('saveNewTask').addEventListener('click', () => {
                const form = document.getElementById('newTaskForm');
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                fetch('http://localhost:8081/api/tasks/createTask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao adicionar tarefa.');
                    return response.json();
                })
                .then(() => {
                    modal.hide();
                    document.getElementById('newTaskModal').remove();
                    kanbanColumns.forEach(column => loadTasksForColumn(column));
                })
                .catch(error => console.error('Erro ao adicionar tarefa:', error));
            });
        });
    });

    kanbanColumns.forEach(column => loadTasksForColumn(column));
});
