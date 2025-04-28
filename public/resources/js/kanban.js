
document.querySelectorAll('.kanbanCard').forEach(card => {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    });

    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging');
    });
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
        e.currentTarget.classList.remove('cardsHover');
        const dragCard = document.querySelector('.kanbanCard.dragging');
        e.currentTarget.appendChild(dragCard);
    });
});
