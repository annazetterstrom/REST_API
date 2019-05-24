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


  $app->get('/api/fullEntries', function ($request, $response, $args) {
    $userID = $_SESSION['userID'];
    $entry = new Entry($this->db);
    return $response->withJson($entry->fullEntries($userID));
  });


  $app->post('/api/entry', function ($request, $response) {
    $data = $request->getParsedBody();
    $entry = new Entry($this->db);
    return $response->withJson($entry->postEntry($data['title'], $data['content']));
  });

  $app->delete('/api/entry/{id}', function ($request, $response, $args) {
    $entryID = $args['id'];
    $entry = new Entry($this->db);
    $entry->deleteEntriesByID($entryID);
    return $response->withJson(array('ok' => true));
  })->add($auth);

  $app->post('/api/entry/{id}', function ($request, $response, $args) {
    $data = $request->getParsedBody();
    $entryID = $args['id'];
    $entry = new Entry($this->db);
    $entry->updateEntryByID($entryID, $data['title'], $data['content']);
    return $response->withJson($data);
  })->add($auth);

};

