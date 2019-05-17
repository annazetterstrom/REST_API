<?php
  $host = 'localhost:8889';
  $db   = 'journal';
  $user = 'root';
  $pass = 'root';
  $charset = 'utf8';
  $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
  $pdo = new PDO($dsn, $user, $pass);
?>