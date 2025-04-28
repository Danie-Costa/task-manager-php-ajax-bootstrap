<?php

class WebRouter implements RouterInterface {
    public function getRoutes(): array {
        return [
            '/' => [
                'GET' => 'home',
            ],
            '/sobre' => [
                'GET' => 'sobre',
            ],
        ];
    }
}