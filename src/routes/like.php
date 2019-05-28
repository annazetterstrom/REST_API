<?php

return function ($app) {
    // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';
  
  $app->post('/api/like', function ($request, $response) {
    $data = $request->getParsedBody();
    $like = new Likes($this->db);
    return $response->withJson($like->insertLike($data['entryID']));
  });
  
  $app->get('/api/like', function ($request, $response) {
    $data = $request->getParsedBody();
    $like = new Likes($this->db);
    return $response->withJson($like->insertLike($data['entryID']));
  });


};