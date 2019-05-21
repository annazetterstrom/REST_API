<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Basic protected GET route 
  $app->get('/user/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $user = new User($this->db);

    return $response->withJson($user->getUserByID($userID));
  })->add($auth);

  // Basic protected GET route 
  $app->put('/user/{id}', function ($request, $response, $args) {
    $data = $request->getParsedBody();
    $user = new User($this->db);

    return $response->withJson($user->updateUserByID($data['userID'], $data['username'], $data['password']));
  })->add($auth);
  
  // Basic protected GET route 
  $app->post('/user', function ($request, $response) {
    $data = $request->getParsedBody();
    $user = new User($this->db);
    return $response->withJson($user->insertUser($data['username'], $data['password']));
  });

  // Basic protected GET route 
  $app->get('/users', function ($request, $response, $args) {
    $user = new User($this->db);
    return $response->withJson($user->getUsers());
  });
  
};

