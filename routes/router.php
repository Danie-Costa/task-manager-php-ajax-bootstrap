<?php 
class Router {
    private $webRouter;
    private $apiRouter;
    public function __construct(RouterInterface $webRouter, RouterInterface $apiRouter) {
        $this->webRouter = $webRouter;
        $this->apiRouter = $apiRouter;
    }
    public function handleRequest() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $method = $_SERVER['REQUEST_METHOD'];
        $routes = $this->getRoutesForUri($uri);
        $baseUri = strpos($uri, '/api') === 0 ? substr($uri, 4) : $uri;
    
        if (isset($routes[$baseUri]) && isset($routes[$baseUri][$method])) {
            $handler = $routes[$baseUri][$method];
            $controller = $handler[0];
            $action = $handler[1];
            $controllerInstance = new $controller();
            global $requestParams;
            $requestParams = [];
    
            if ($method === 'GET') {
                $requestParams = $_GET;
            } elseif ($method === 'POST') {
                $contentType = $_SERVER["CONTENT_TYPE"] ?? '';
                if (strpos($contentType, 'application/json') !== false) {
                    $input = file_get_contents('php://input');
                    $requestParams = json_decode($input, true) ?? [];
                } else {
                    $requestParams = $_POST;
                }
            }
            $controllerInstance->$action();
            return;
        }
    
        http_response_code(404);
        echo "Página não encontrada!";
    }
    
    private function getRoutesForUri(string $uri): array {
        return strpos($uri, '/api') === 0 ? $this->apiRouter->getRoutes() : $this->webRouter->getRoutes();
    }
}