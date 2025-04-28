<?php 
class TaskMigration implements MigrationInterface{
    public function up() {
        $db = Database::getInstance();
                
        $db->query("CREATE TABLE IF NOT EXISTS tasks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT FALSE
        )");

        $db->query("INSERT INTO tasks (title, description, completed) VALUES ('Tarefa 1', 'Descrição da tarefa 1', FALSE)");
        $db->query("INSERT INTO tasks (title, description, completed) VALUES ('Tarefa 2', 'Descrição da tarefa 2', FALSE)");
        $db->query("INSERT INTO tasks (title, description, completed) VALUES ('Tarefa 3', 'Descrição da tarefa 3', FALSE)");
    }

    public function down() {
        $db = Database::getInstance();
        $db->query("DROP TABLE IF EXISTS tasks");
    }
}


