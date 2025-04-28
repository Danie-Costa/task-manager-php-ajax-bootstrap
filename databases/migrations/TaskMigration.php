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

        $db->query("INSERT INTO tasks (title, description, status, step) VALUES 
            ('Implementar Sistema de Login', 'Criar sistema de autenticação com JWT e refresh token', 1, 1),
            ('Desenvolver API RESTful', 'Implementar endpoints para CRUD de usuários', 2, 1),
            ('Criar Interface Kanban', 'Desenvolver interface drag-and-drop para gerenciamento de tarefas', 3, 1),
            ('Configurar CI/CD', 'Implementar pipeline de integração e deploy contínuo', 1, 2),
            ('Escrever Testes Unitários', 'Criar suite de testes para componentes principais', 2, 2),
            ('Documentar API', 'Gerar documentação Swagger/OpenAPI', 3, 2),
            ('Otimizar Performance', 'Implementar cache e otimizar queries', 1, 3),
            ('Revisar Código', 'Realizar code review e aplicar boas práticas', 2, 3),
            ('Preparar Apresentação', 'Criar slides e documentação do projeto', 3, 3)
        ");
    }

    public function down() {
        $db = Database::getInstance();
        $db->query("DROP TABLE IF EXISTS tasks");
    }
}


