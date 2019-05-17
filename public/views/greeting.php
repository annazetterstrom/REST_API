
<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="ml-auto btn btn-primary" href="views/logout.php">Log out</a>
</nav>
<h1 class="upper">Welcome <?php echo $_SESSION['username']; ?> </h1 >

<br><br>
<h3>Write a new journal entry</h3>
<p>
    On this page you can write entries to your journal and submit. You can also change your entries and delete those you don't like. 
</p>
<form class="form" method="POST">
    <label for="title">Title</label>
    <br>
    <input type="text" name="title">
        <br>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Content</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="content"></textarea>
        </div>
    <input type="submit" name="createPost">
</form>
<br>
<br>

<?php

    $userName = $_SESSION['username'];
    $query = "SELECT userID from users WHERE username = ?"; 
    $statement = $pdo->prepare($query);
    $statement->execute([$userName]);
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    foreach($results as $result){
        $userid = $result['userID'];
    }
    date_default_timezone_set('Europe/Oslo');
    $date = date('Y-m-d H:i:s');
    if(isset($_POST['createPost'])) {
      $query = "INSERT INTO entries (title, content, createdAt, userID) VALUES (?, ?, ?, ?)";
      $statement = $pdo->prepare($query); 
      $statement->execute([
        $_POST['title'],
        $_POST['content'],
        $date,
        $userid

      ]); 
     
    }
    include 'views/getentries.php';
?>




