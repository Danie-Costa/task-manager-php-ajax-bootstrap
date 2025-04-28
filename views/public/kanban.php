<main class="kanban">
    <div class="kanbanColumn" data-id="1">
        <div class="kanbanTitle">
            <h2>To Do</h2>
            <button class="addCard" data-id="1">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <div class="kanbanCards">
        </div>
        <div class="kanbanModals">
        </div>
    </div>

    <div class="kanbanColumn" data-id="2">
        <div class="kanbanTitle">
            <h2> Doing</h2>
            <button class="addCard" data-id="2">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div class="kanbanCards">
        </div>
        <div class="kanbanModals">
        </div>
    </div>

    <div class="kanbanColumn" data-id="3">
        <div class="kanbanTitle">
            <h2>Done</h2>
            <button class="addCard" data-id="3">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div class="kanbanCards">
            <div class="kanbanCard card p-3" draggable="true">
            </div>
        </div>
        <div class="kanbanModals">
        </div>
    </div>
</main>



    <?php 
        array_push($this->dataPush['css'], './public/resources/css/kanban.css');
        array_push($this->dataPush['css'], 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css');
        array_push($this->dataPush['script'], './public/resources/js/kanban.js');
?>