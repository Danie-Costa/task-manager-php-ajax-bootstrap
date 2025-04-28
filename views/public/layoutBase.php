<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <?php 
    array_push($this->dataPush['css'], 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css');
   array_push($this->dataPush['script'], 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js');
   array_push($this->dataPush['script'], 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js');
    if (!empty($this->dataPush['css'])) {
        foreach ($this->dataPush['css'] as $css) {
            echo '<link rel="stylesheet" href="' . $css . '">' . "\n";
        }
    }
    ?>
</head>
<body>

    <?= isset($this->content) ? $this->content : '' ?>
    <?php
    if (!empty($this->dataPush['script'])) {
        foreach ($this->dataPush['script'] as $script) {
            echo '<script src="' . $script . '"></script>' . "\n";
        }
    }
    ?>
</body>
</html>
