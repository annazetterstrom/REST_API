<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Add a login route
  $app->post('/api/login', function ($request, $response) {
    $data = $request->getParsedBody();
    if (isset($data['username']) && isset($data['password'])) {
      $user = new User($this->db);
      if($user->login($data['username'], $data['password'])){
        return $response->withJson(array('loggedIn' => true, 'username' => $data['username']));
      }
    }
    return $response->withStatus(401);
  });
  
  $app->post('/api/register', function ($request, $response) {
    $data = $request->getParsedBody();
    if (isset($data['username']) && isset($data['password'])) {
      $user = new User($this->db);
      if($user->register($data['username'], $data['password'])){
        return $response->withJson(array('registred' => true));
      }
    }
    return $response->withJson(array('registred' => false));
  });

  $app->get('/api/logout', function ($request, $response) {  
    session_unset();
    session_destroy();
    if (session_status() == PHP_SESSION_NONE) {
      session_set_cookie_params(3600*24*365*10); //session-cookien varar i 10 år.
      session_start();
    }
    return $response->withJson(array('loggedOut' => true));
  });

  // Add a ping route
  $app->get('/api/ping', function ($request, $response, $args) {
    return $response->withJson(['loggedIn' => true]);
  })->add($auth);
};
