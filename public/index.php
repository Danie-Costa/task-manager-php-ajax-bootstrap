<?php
define('BASE_PATH', dirname(__DIR__) . '/');

require_once BASE_PATH . 'bootstrap.php';


$webRouter = new WebRouter();
$apiRouter = new ApiRouter();

$router = new Router($webRouter, $apiRouter);
$router->handleRequest();


function home() {
    echo "Bem-vindo à página inicial!";
}

function sobre() {
    echo "Sobre nossa empresa.";
}

function apiHome() {
    echo "API Home";
}
