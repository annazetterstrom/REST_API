<?php

return function ($app) {
    // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';
  
  $app->post('/api/like/{id}', function ($request, $response) {
    $entryID = $args['id'];
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