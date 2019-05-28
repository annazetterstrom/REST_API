<?php
  require __DIR__ . '/../vendor/autoload.php';

  session_start();

  $settings = require __DIR__ . '/../src/settings.php';
  $app = new \Slim\App($settings);

  $dependencies = require __DIR__ . '/../src/container.php';
  $dependencies($app);

  $login = require __DIR__ . '/../src/routes/login.php';
  $login($app);

  $view = require __DIR__ . '/../src/routes/view.php';
  $view($app);

  $user = require __DIR__ . '/../src/routes/user.php';
  $user($app);
  
  $user = require __DIR__ . '/../src/routes/entry.php';
  $user($app);
  
  $user = require __DIR__ . '/../src/routes/comment.php';
  $user($app);

  $app->run();
