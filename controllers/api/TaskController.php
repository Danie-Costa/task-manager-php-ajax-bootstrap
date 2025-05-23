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
        global $requestParams;
        $step = $requestParams['step'] ?? null;
        $tasks = $this->task->all($step);
        $this->jsonResponse($tasks);
    }

    public function createTask()
    {
        global $requestParams;
        if ($this->task->create($requestParams)) {
            $this->jsonResponse(['message' => 'Tarefa criada com sucesso', 'task' => $requestParams]);
        } else {
            $this->jsonResponse(['message' => 'Erro ao criar tarefa'], 500);
        }
    }

    public function editTask()
    {
        global $requestParams;
        $task_id = $requestParams['task_id'] ?? null;
        unset($requestParams['task_id']);
        if (!$task_id) {
            $this->jsonResponse(['message' => 'ID não informado'], 400);
            return;
        }

        if ($this->task->update($task_id, $requestParams)) {
            $this->jsonResponse(['message' => 'Tarefa atualizada com sucesso', 'task' => $requestParams]);
        } else {
            $this->jsonResponse(['message' => 'Erro ao atualizar tarefa'], 500);
        }
    }

    public function deleteTask()
    {
        global $requestParams;
        $task_id = $requestParams['task_id'] ?? null;
        if (!isset($task_id)) {
            $this->jsonResponse(['message' => 'ID não informado'], 400);
            return;
        }

        if ($this->task->delete($task_id)) {
            $this->jsonResponse(['message' => 'Tarefa excluída com sucesso']);
        } else {
            $this->jsonResponse(['message' => 'Erro ao excluir tarefa'], 500);
        }
    }
}
