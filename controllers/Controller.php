<?php 

class Controller {
    public $extend;
    public $content;
    public $dataPush;
    public function __construct() {
        $this->dataPush = [];
    }
    public function jsonResponse($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }
    public function render($view, $data = [])
    {
        extract($data);
        ob_start();
        require BASE_PATH . 'views/' . $view . '.php';
        $this->content = ob_get_clean();
        if ($this->extend) {
            $this->extended($this->extend);
        }
    }
    public function extended($view)
    {
        require BASE_PATH . 'views/' . $view . '.php';
    }
}