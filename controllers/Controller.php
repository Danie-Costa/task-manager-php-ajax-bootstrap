<?php 

class Controller {
    public function __construct() {
    }
    public function jsonResponse($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }
}