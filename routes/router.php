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
            call_user_func($handler);
            return;
        }
        http_response_code(404);
        echo "Página não encontrada!";
    }
    private function getRoutesForUri(string $uri): array {
        return strpos($uri, '/api') === 0 ? $this->apiRouter->getRoutes() : $this->webRouter->getRoutes();
    }
}