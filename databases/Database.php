<?php

class Database
{
    private static ?\PDO $instance = null;

    private function __construct() {} // Impede instanciar

    public static function getInstance(): \PDO
    {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: 'db';
            $db   = getenv('DB_DATABASE') ?: 'task_manager';
            $user = getenv('DB_USERNAME') ?: 'user';
            $pass = getenv('DB_PASSWORD') ?: 'userpass';
            $charset = 'utf8mb4';

            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

            $options = [
                \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
                \PDO::ATTR_EMULATE_PREPARES => false,
            ];

            try {
                self::$instance = new \PDO($dsn, $user, $pass, $options);
            } catch (\PDOException $e) {
                throw new \RuntimeException('Erro ao conectar no banco de dados: ' . $e->getMessage());
            }
        }

        return self::$instance;
    }
}
