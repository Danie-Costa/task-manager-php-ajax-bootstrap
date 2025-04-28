<?php

class Task
{
    public ?int $id = null;
    public string $title;
    public string $description;
    public int $status;
    public int $step;
    private \PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
        $this->title = '';
        $this->description = '';
        $this->status = 0;
        $this->step = 0;
    }

    public function all($step = null): array
    {
        $query = "SELECT * FROM tasks";
        $params = [];
        if (!is_null($step)) {
            $query .= " WHERE step = :step";
            $params[':step'] = $step;
        }
        $stmt = $this->db->prepare($query);
        $stmt->execute($params);        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    

    public function create(array $data): bool
    {
        $stmt = $this->db->prepare(
            "INSERT INTO tasks (title, description, status, step) VALUES (:title, :description, :status, :step)"
        );

        return $stmt->execute([
            'title' => $data['title'],
            'description' => $data['description'],
            'status' => $data['status'],
            'step' => $data['step'],
        ]);
    }

    public function update(int $id, array $data): bool
    {
        $stmt = $this->db->prepare(
            "UPDATE tasks SET title = :title, description = :description, status = :status, step = :step WHERE id = :id"
        );

        return $stmt->execute([
            'title' => $data['title'],
            'description' => $data['description'],
            'status' => $data['status'],
            'step' => $data['step'],
            'id' => $id,
        ]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare("DELETE FROM tasks WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
