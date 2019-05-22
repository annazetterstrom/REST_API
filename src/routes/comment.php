<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Basic protected GET route 
  $app->get('api/comment/{id}', function ($request, $response, $args) {
    $commentID = $args['id'];
    $comment = new Comment($this->db);

    return $response->withJson($comment->getCommentByID($commentID));
  })->add($auth);

  // Basic protected GET route 
  $app->get('/comments', function ($request, $response, $args) {
    $comment = new Comment($this->db);
    return $response->withJson($comment->getComments());
  });

  

};

