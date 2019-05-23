<?php

return function ($app) {
  // Register auth middleware
  $auth = require __DIR__ . '/../middlewares/auth.php';

  // Basic protected GET route 
  $app->get('/api/entry/{id}', function ($request, $response, $args) {
    $entryID = $args['id'];
    $entry = new Entry($this->db);

    return $response->withJson($entry->getEntryByID($entryID));
  })->add($auth);

  $app->get('/api/entries', function ($request, $response, $args) {
    $entry = new Entry($this->db);
    return $response->withJson($entry->getAllEntries());
  });

  $app->get('/api/entries/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $entry = new Entry($this->db);
    return $response->withJson($entry->getEntriesByUserID($userID));
  });
};

