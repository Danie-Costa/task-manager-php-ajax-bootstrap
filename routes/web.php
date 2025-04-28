<?php

class WebRouter implements RouterInterface {
    public function getRoutes(): array {
        return [
            '/' => [
                'GET' => ['WebController', 'home'],
            ],
            '/sobre' => [
                'GET' => ['WebController', 'sobre'],
            ],
        ];
    }
}