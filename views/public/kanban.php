<main class="kanban">
    <div class="kanbanColumn" data-id="1">
        <div class="kanbanTitle">
            <h2>To Do</h2>
            <button class="addCard">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        <div class="kanbanCards">
            
        </div>
    </div>

    <div class="kanbanColumn" data-id="2">
        <div class="kanbanTitle">
            <h2> Doing</h2>
            <button class="addCard">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div class="kanbanCards">
            
        </div>
    </div>

    <div class="kanbanColumn" data-id="3">
        <div class="kanbanTitle">
            <h2>Done</h2>
            <button class="addCard">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <div class="kanbanCards">
            <div class="kanbanCard card p-3" draggable="true">
                
            </div>
        </div>
    </div>
</main>
<?php echo $this->renderView('public/kanbanCard'); ?>
<?php 
    $this->dataPush['css'] = $this->dataPush['css'] ?? ['./public/resources/css/kanban.css'];
    $this->dataPush['script'] = $this->dataPush['script'] ?? ['./public/resources/js/kanban.js'];
?>