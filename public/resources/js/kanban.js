document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:8081/api/tasks';
    const kanbanColumns = document.querySelectorAll('.kanbanColumn');
    const addCardButtons = document.querySelectorAll('.addCard');

    const fetchJSON = (url, options = {}) =>
        fetch(url, options)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            });

    const createElement = (tag, attrs = {}, html = '') => {
        const el = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
        el.innerHTML = html;
        return el;
    };

    const getPriorityBadge = (status) => {
        const priorities = {
            1: { class: 'badge-danger', text: 'Alta prioridade' },
            2: { class: 'badge-warning', text: 'Média prioridade' },
            3: { class: 'badge-info', text: 'Baixa prioridade' },
        };
        const priority = priorities[status];
        return priority ? `<div class="badge w-75 badge-pill ${priority.class}">${priority.text}</div>` : '';
    };

    const createTaskCard = (task) => {
        return createElement('div', {
            class: 'kanbanCard card p-3 m-1',
            draggable: 'true',
            'data-toggle': 'modal',
            'data-target': `#cardTask-${task.id}`,
            'data-id': task.id
        }, `
            ${getPriorityBadge(task.status)}
            <p class="cardTitle py-2 m-0">${task.title}</p>
        `);
    };

    const createTaskModal = (task) => {
        return createElement('div', {
            class: 'modal fade',
            id: `cardTask-${task.id}`,
            tabindex: '-1',
            'aria-hidden': 'true'
        }, `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Editar Tarefa</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${createTaskForm(task)}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" onclick="deleteTask(${task.id})">Excluir</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" onclick="saveTask(${task.id})">Salvar</button>
                    </div>
                </div>
            </div>
        `);
    };

    const createTaskForm = (task) => `
        <form id="editTaskForm-${task.id}" class="edit-task-form">
            <input type="hidden" name="task_id" value="${task.id}">
            ${createInputField('Título', `title-${task.id}`, 'title', task.title)}
            ${createTextareaField('Descrição', `description-${task.id}`, 'description', task.description || '')}
            ${createSelectField('Prioridade', `status-${task.id}`, 'status', task.status, [
                { value: 1, label: 'Alta' },
                { value: 2, label: 'Média' },
                { value: 3, label: 'Baixa' }
            ])}
            ${createSelectField('Etapa', `step-${task.id}`, 'step', task.step, [
                { value: 1, label: 'To Do' },
                { value: 2, label: 'Doing' },
                { value: 3, label: 'Done' }
            ])}
        </form>
    `;

    const createInputField = (label, id, name, value) => `
        <div class="form-group">
            <label for="${id}">${label}</label>
            <input type="text" class="form-control" id="${id}" name="${name}" value="${value}" required>
        </div>
    `;

    const createTextareaField = (label, id, name, value) => `
        <div class="form-group">
            <label for="${id}">${label}</label>
            <textarea class="form-control" id="${id}" name="${name}" rows="3">${value}</textarea>
        </div>
    `;

    const createSelectField = (label, id, name, selectedValue, options) => `
        <div class="form-group">
            <label for="${id}">${label}</label>
            <select class="form-control" id="${id}" name="${name}" required>
                ${options.map(opt => `<option value="${opt.value}" ${opt.value === selectedValue ? 'selected' : ''}>${opt.label}</option>`).join('')}
            </select>
        </div>
    `;

    const loadTasksForColumn = (column) => {
        const stepId = column.dataset.id;
        fetchJSON(`${API_URL}?step=${stepId}`)
            .then(tasks => {
                const kanbanCards = column.querySelector('.kanbanCards');
                const kanbanModals = column.querySelector('.kanbanModals');

                kanbanCards.innerHTML = '';
                kanbanModals.innerHTML = '';

                tasks.forEach(task => {
                    kanbanCards.appendChild(createTaskCard(task));
                    kanbanModals.appendChild(createTaskModal(task));
                });
            })
            .catch(err => console.error('Erro ao carregar tarefas:', err));
    };

    window.saveTask = (taskId) => {
        const form = document.getElementById(`editTaskForm-${taskId}`);
        const data = Object.fromEntries(new FormData(form).entries());

        fetchJSON(`${API_URL}/editTask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(() => {
            $(`#cardTask-${taskId}`).modal('hide');
            refreshBoard();
        })
        .catch(err => {
            console.error('Erro ao salvar tarefa:', err);
            alert('Erro ao salvar a tarefa. Tente novamente.');
        });
    };

    window.deleteTask = (taskId) => {
        if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

        fetchJSON(`${API_URL}/deleteTask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task_id: taskId })
        })
        .then(() => {
            $(`#cardTask-${taskId}`).modal('hide');
            refreshBoard();
        })
        .catch(err => {
            console.error('Erro ao excluir tarefa:', err);
            alert('Erro ao excluir a tarefa. Tente novamente.');
        });
    };

    const refreshBoard = () => kanbanColumns.forEach(loadTasksForColumn);

    const setupDragAndDrop = () => {
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
                    const taskId = dragCard.dataset.id;

                    fetchJSON(`${API_URL}/editTask`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ task_id: taskId, step: newStep })
                    })
                    .then(refreshBoard)
                    .catch(err => console.error('Erro ao mover tarefa:', err));

                    cardsContainer.appendChild(dragCard);
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
    };

    const setupAddTaskButtons = () => {
        addCardButtons.forEach(button => {
            button.addEventListener('click', () => openNewTaskModal(button.dataset.id));
        });
    };

    const openNewTaskModal = (stepId) => {
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
                                ${createInputField('Título', 'newTitle', 'title', '')}
                                ${createTextareaField('Descrição', 'newDescription', 'description', '')}
                                ${createSelectField('Prioridade', 'newStatus', 'status', 1, [
                                    { value: 1, label: 'Alta' },
                                    { value: 2, label: 'Média' },
                                    { value: 3, label: 'Baixa' }
                                ])}
                                ${createSelectField('Etapa', 'newStep', 'step', 1, [
                                    { value: 1, label: 'To Do' },
                                    { value: 2, label: 'Doing' },
                                    { value: 3, label: 'Done' }
                                ])}
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
            const data = Object.fromEntries(new FormData(form).entries());

            fetchJSON(`${API_URL}/createTask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(() => {
                modal.hide();
                document.getElementById('newTaskModal').remove();
                refreshBoard();
            })
            .catch(err => console.error('Erro ao adicionar tarefa:', err));
        });
    };

    // Inicialização
    refreshBoard();
    setupDragAndDrop();
    setupAddTaskButtons();
});
