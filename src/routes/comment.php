<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Basic protected GET route 
  $app->get('/api/comment/{id}', function ($request, $response, $args) {
    $commentID = $args['id'];
    $comment = new Comment($this->db);

    return $response->withJson($comment->getCommentByID($commentID));
  })->add($auth);

  $app->get('/api/comments/{entryid}', function ($request, $response, $args) {
    $entryID = $args['entryid'];
    $comment = new Comment($this->db);
    return $response->withJson($comment->getCommentsByEntryID($entryID));
  });

  $app->post('/api/comment', function ($request, $response) {
    $data = $request->getParsedBody();
    $comment = new Comment($this->db);
    return $response->withJson($comment->postComment($data['content'], $data['entryID']));
  });

  

};

