<?php

return function ($app) {
  $app->get('/', function ($request, $response, $args) {
    return $this->renderer->render($response, 'index.phtml', [
      'title' => 'Journal'
    ]);
  });
};
