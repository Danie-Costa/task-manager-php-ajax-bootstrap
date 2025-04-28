<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <?php foreach ($this->dataPush['css'] as $key => $value) { ?>
        <link rel="<?= $key ?>" href="<?= $value ?>">
    <?php } ?>
    <?php foreach ($this->dataPush['script'] as $key => $value) { ?>
        <script src="<?= $value ?>"></script>
    <?php } ?>
</head>
<body>
    <?= isset($this->content) ? $this->content : '' ?>
</body>
</html>