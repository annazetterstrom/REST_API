<?php

return function ($app) {
  $auth = require __DIR__ . '/../middlewares/auth.php';

  $app->get('/api/user/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $user = new User($this->db);

    return $response->withJson($user->getUserByID($userID));
  })->add($auth);

  $app->get('/api/users', function ($request, $response, $args) {
    $user = new User($this->db);
    return $response->withJson($user->getUsers());
  });
  
};

