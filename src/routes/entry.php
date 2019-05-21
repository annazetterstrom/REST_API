<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Basic protected GET route 
  $app->get('/entry/{id}', function ($request, $response, $args) {
    $entryID = $args['id'];
    $entry = new Entry($this->db);

    return $response->withJson($entry->getEntryByID($entryID));
  })->add($auth);

  // Basic protected GET route 
  $app->get('/entries', function ($request, $response, $args) {
    $entry = new Entry($this->db);
    return $response->withJson($entry->getEntries());
  });
};

