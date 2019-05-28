<?php

return function ($app) {
  $auth = require __DIR__ . '/../middlewares/auth.php';

  $app->get('/api/entry/{id}', function ($request, $response, $args) {
    $entryID = $args['id'];
    $entry = new Entry($this->db);

    return $response->withJson($entry->getEntryByID($entryID));
  })->add($auth);

  $app->get('/api/entries', function ($request, $response, $args) {
    $entry = new Entry($this->db);
    return $response->withJson($entry->get20Entries(1));
  });

  $app->get('/api/entries/{id}', function ($request, $response, $args) {
    $userID = $args['id'];
    $entry = new Entry($this->db);
    return $response->withJson($entry->getEntriesByUserID($userID));
  });

  $app->get('/api/20entries/{num}', function ($request, $response, $args) {
    $num = $args['num'];
    $entry = new Entry($this->db);
    return $response->withJson($entry->get20Entries($num));
  });

  $app->get('/api/searchentry/{keywords}', function ($request, $response, $args) {
    $keywords = $args['keywords'];
    $entry = new Entry($this->db);
    return $response->withJson($entry->getSearchEntries($keywords));
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
    return $response->withJson($entry->updateEntryByID($entryID, $data['title'], $data['content']));
  })->add($auth);

};

