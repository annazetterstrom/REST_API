
<?php
    require 'partials/connect.php'; // Connect to the database
    $username = $_SESSION['username'];
    $query = "SELECT entries.title, entries.content, entries.createdAt, users.username, entries.entryID
    from entries 
    INNER JOIN users ON entries.userID = users.userID 
    WHERE username = ?"; 
    $statement = $pdo->prepare($query);
    $statement->execute([$userName]);
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);

   foreach($results as $result){
        $title = $result['title']; 
        $content = $result['content']; 
        $createdAt = $result['createdAt'];
        $userid = "<div class='card'>
        <h5 class='card-header'>$title</h5>
        <div class='card-body'>
          <p class='card-text'>$content</p>
          <form> 
          <a href='#' class='btn btn-primary'>Delete Post</a>
          </form>
          <p>Created at: $createdAt</p>
        </div>
      </div>
     ";
        echo $userid; 
    }
    
//     foreach($results as $result){
//       $title = $result['title']; 
//       $content = $result['content']; 
//       $createdAt = $result['createdAt'];
//       $id = $result['entryID'];
//       $userid = "<section  class='container page-section'>
//       <div class=' flex-cards'>
//       <div class='card'>
//           <figure class='card-header'>
//              <h1> $title </h1>
//           </figure>
//           <div class='card-inner'>
//               <p class='card-body'>$content</p>
//           </div>
//           <form method='POST' action='views/deleteentries.php'> 
//           <input type='hidden' name='userid' value='$id'>
//           <button class='btn btn-danger' name='deletepost'>Delete Post</button>
//           </form>
//           <p>Created at: $createdAt</p>
//       </div>
//       </div>
//       </section>";
//       echo $userid; 
//    }

?>