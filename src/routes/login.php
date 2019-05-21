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
        $_SESSION['loggedIn'] = true;
        $_SESSION['username'] = $data['username'];
        return $response->withJson(array('logedin' => true, 'username' => $data['username']));
      }
    }
    return $response->withStatus(401);
  });

  // Add a ping route
  $app->get('/api/ping', function ($request, $response, $args) {
    return $response->withJson(['loggedIn' => true]);
  })->add($auth);
};
