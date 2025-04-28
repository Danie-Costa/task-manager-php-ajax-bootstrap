<?php

class Task
{
    public ?int $id = null;
    public string $title;
    public string $description;
    public string $status;

    private \PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function all(): array
    {
        $stmt = $this->db->query("SELECT * FROM tasks");
        return $stmt->fetchAll();
    }

    public function create(array $data): bool
    {
        $stmt = $this->db->prepare(
            "INSERT INTO tasks (title, description, status) VALUES (:title, :description, :status)"
        );

        return $stmt->execute([
            'title' => $data['title'],
            'description' => $data['description'],
            'status' => $data['status'],
        ]);
    }

    public function update(int $id, array $data): bool
    {
        $stmt = $this->db->prepare(
            "UPDATE tasks SET title = :title, description = :description, status = :status WHERE id = :id"
        );

        return $stmt->execute([
            'title' => $data['title'],
            'description' => $data['description'],
            'status' => $data['status'],
            'id' => $id,
        ]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare("DELETE FROM tasks WHERE id = :id");
        return $stmt->execute(['id' => $id]);
    }
}
