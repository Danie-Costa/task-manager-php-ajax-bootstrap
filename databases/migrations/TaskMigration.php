<?php 
class TaskMigration implements MigrationInterface{
    public function up() {
        $db = Database::getInstance();
                
        $db->query("CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status INT NOT NULL,
            step INT NOT NULL
        )");

        $db->query("INSERT INTO tasks (title, description, status, step) VALUES ('Tarefa 1', 'Descrição da tarefa 1', 1 , 1)");
        $db->query("INSERT INTO tasks (title, description, status, step) VALUES ('Tarefa 2', 'Descrição da tarefa 2', 2, 2)");
        $db->query("INSERT INTO tasks (title, description, status, step) VALUES ('Tarefa 3', 'Descrição da tarefa 3', 3, 3)");
    }

    public function down() {
        $db = Database::getInstance();
        $db->query("DROP TABLE IF EXISTS tasks");
    }
}


