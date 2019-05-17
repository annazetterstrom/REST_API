<?php

    require '../partials/connect.php'; // Connect to the database
    echo isset($_POST['deletepost']);
    if(isset($_POST['deletepost'])){
        $query = "DELETE FROM entries WHERE entryID = ?";
        $id = $_POST['userid'];
        $statement = $pdo->prepare($query);
        $statement->execute([$id]);
        header('Location: ../index.php');
    }
  

?>