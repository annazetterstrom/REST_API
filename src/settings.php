<?php

return [
  'settings' => [
    'displayErrorDetails' => false, 
    'addContentLengthHeader' => false, 

    'renderer' => [
      'template_path' => __DIR__ . '/views/',
    ],

    'db' => [
      'host' => 'localhost:8889',
      'user' => 'root',
      'pass' => 'root',
      'dbname' => 'journal'
    ]
  ],
];
