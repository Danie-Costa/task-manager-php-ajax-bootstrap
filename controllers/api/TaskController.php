<?php 

class TaskController extends Controller
{
    private Task $task;

    public function __construct()
    {
        $this->task = new Task();
    }

    public function listTasks()
    {
        $tasks = $this->task->all();
        $this->jsonResponse($tasks);
    }

    public function createTask($data)
    {
        if ($this->task->create($data)) {
            $this->jsonResponse(['message' => 'Tarefa criada com sucesso', 'task' => $data]);
        } else {
            $this->jsonResponse(['message' => 'Erro ao criar tarefa'], 500);
        }
    }

    public function editTask($data)
    {
        if (!isset($data['id'])) {
            $this->jsonResponse(['message' => 'ID não informado'], 400);
            return;
        }

        if ($this->task->update($data['id'], $data)) {
            $this->jsonResponse(['message' => 'Tarefa atualizada com sucesso', 'task' => $data]);
        } else {
            $this->jsonResponse(['message' => 'Erro ao atualizar tarefa'], 500);
        }
    }

    public function deleteTask($data)
    {
        if (!isset($data['id'])) {
            $this->jsonResponse(['message' => 'ID não informado'], 400);
            return;
        }

        if ($this->task->delete($data['id'])) {
            $this->jsonResponse(['message' => 'Tarefa excluída com sucesso']);
        } else {
            $this->jsonResponse(['message' => 'Erro ao excluir tarefa'], 500);
        }
    }
}
