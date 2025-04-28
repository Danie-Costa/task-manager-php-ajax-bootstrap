<?php

class ApiRouter implements RouterInterface {
    public function getRoutes(): array {
        return [
            '/' => [
                'GET' => ['ApiController', 'apiHome'],
            ],
        ];
    }
}