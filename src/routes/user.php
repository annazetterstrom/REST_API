<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Basic protected GET route 
  $app->get('/api/user/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $user = new User($this->db);

    return $response->withJson($user->getUserByID($userID));
  })->add($auth);

  // Basic protected GET route 
  $app->get('/api/users', function ($request, $response, $args) {
    $user = new User($this->db);
    return $response->withJson($user->getUsers());
  });
  
};

