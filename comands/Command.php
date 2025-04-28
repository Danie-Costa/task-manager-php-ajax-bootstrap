<?php
define('BASE_PATH', dirname(__DIR__) . '/');

require_once BASE_PATH . '/databases/init.php';
require_once BASE_PATH . '/databases/migrations/init.php';

class Command
{
    public function run(array $argv)
    {
        if (!isset($argv[1]) || !isset($argv[2])) {
            $this->printHelp();
            return;
        }

        $command = $argv[1];
        $migrationClass = $argv[2];
        $this->handle($command, $migrationClass);
    }

    private function handle(string $command, string $migrationClass)
    {
        switch ($command) {
            case 'migrate:up':
                $this->migrateUp($migrationClass);
                break;
            case 'migrate:down':
                $this->migrateDown($migrationClass);
                break;
            default:
                echo "Comando '$command' não reconhecido.\n";
                $this->printHelp();
        }
    }

    private function migrateUp(string $migrationClass)
    {
        $this->loadMigrationClass($migrationClass);

        $migration = new $migrationClass();
        $migration->up();

        echo "Migração '{$migrationClass}' executada com sucesso.\n";
    }

    private function migrateDown(string $migrationClass)
    {
        $this->loadMigrationClass($migrationClass);

        $migration = new $migrationClass();
        $migration->down();

        echo "Migração '{$migrationClass}' revertida com sucesso.\n";
    }

    private function loadMigrationClass(string $migrationClass)
    {
        $migrationFile = BASE_PATH . '/databases/migrations/' . $migrationClass . '.php';

        if (!file_exists($migrationFile)) {
            echo "Arquivo de migração '{$migrationClass}.php' não encontrado.\n";
            exit(1);
        }

        require_once $migrationFile;

        if (!class_exists($migrationClass)) {
            echo "Classe de migração '{$migrationClass}' não encontrada.\n";
            exit(1);
        }
    }

    private function printHelp()
    {
        echo "Uso correto:\n";
        echo "  php command.php migrate:up NomeDaMigration\n";
        echo "  php command.php migrate:down NomeDaMigration\n";
    }
}

$command = new Command();
$command->run($argv);

