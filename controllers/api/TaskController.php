<?php 

class TaskController extends Controller {
    // Método para listar todas as tarefas
    public function listTasks() {
        // Lógica para obter todas as tarefas do banco de dados
        $tasks = ['tasks' => 'Lista de tarefas'];
        $this->jsonResponse($tasks);
    }

    // Método para criar uma nova tarefa
    public function createTask($data) {
        // Lógica para criar uma nova tarefa com base nos dados recebidos
        $this->jsonResponse(['message' => 'Tarefa criada com sucesso', 'task' => $data]);
    }

    // Método para editar uma tarefa existente
    public function editTask($data) {
        // Lógica para editar uma tarefa pelo id com base nos dados recebidos
        $this->jsonResponse(['message' => 'Tarefa atualizada com sucesso', 'task' => $data]);
    }

    // Método para excluir uma tarefa
    public function deleteTask($data) {
        // Lógica para excluir a tarefa com o id informado
        $this->jsonResponse(['message' => 'Tarefa excluída com sucesso']);
    }
}
