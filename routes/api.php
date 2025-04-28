<?php

class ApiRouter implements RouterInterface {
    public function getRoutes(): array {
        return [
            '/' => [
                'GET' => ['ApiController', 'apiHome'],
            ],
            '/tasks' => [
                'GET' => ['TaskController', 'listTasks'], 
            ],
            '/tasks/createTask' => [
                'POST' => ['TaskController', 'createTask'], 
            ],
            '/tasks/editTask' => [
                'POST' => ['TaskController', 'editTask'], 
            ],
            '/tasks/deleteTask' => [
                'POST' => ['TaskController', 'deleteTask'], 
            ],
        ];
    }
}