<?php

class Comment extends Mapper {
    public function getCommentByID($commentID){
        $statement = $this->db->prepare("SELECT * FROM comments WHERE commentID = :commentID");
        $statement->execute([
            ':commentID' => $commentID 
        ]);
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function deleteCommentsByID($commentID){
        $statement = $this->db->prepare("DELETE FROM comments WHERE commentID = :commentID");
        $statement->execute([
            'commentID' => $commentID
        ]);
    }
    
   public function getCommentsByEntryID($entryID){
    $statement = $this->db->prepare("SELECT * FROM comments INNER JOIN users ON comments.createdBy = users.userID WHERE entryID = :entryID ORDER BY createdAt ASC");
    $statement->execute([
        ":entryID" => $entryID
    ]);
    return $statement->fetchAll(PDO::FETCH_ASSOC);
   }

   //posts comment and returns the entry of the comment
   public function postComment($content, $entryID){
    date_default_timezone_set('Europe/Oslo');
    $statement = $this->db->prepare("INSERT INTO comments (entryID, content, createdBy, createdAt) VALUES (:entryID, :content, :createdBy, :createdAt)");
    $statement->execute([
        ':entryID'=> $entryID,
        ':content'=> $content,
        'createdBy' => $_SESSION['userID'],
        'createdAt' => date('Y-m-d H:i:s')
    ]);
    
    $statement = $this->db->prepare("SELECT * FROM entries WHERE entryID = :entryID");
    $statement->execute([
        ':entryID' => $entryID 
    ]);
    return $statement->fetch(PDO::FETCH_ASSOC);
   }

   //updates comment and returns that comments entry
   public function updateCommentByID($commentID, $content){
       $statement = $this->db->prepare("UPDATE comments SET content = :content WHERE commentID = :commentID");
       $statement->execute([
           ':content' => $content,
           ':commentID' => $commentID
       ]);
       $statement = $this->db->prepare("
       SELECT entries.entryID, entries.title, entries.content, entries.createdAt, entries.userID 
       FROM comments JOIN entries
       ON entries.entryID = comments.entryID 
       WHERE commentID = :commentID");
       $statement->execute([
           ':commentID' => $commentID
       ]);
       return $statement->fetch(PDO::FETCH_ASSOC);
   }

   public function deleteCommentByID($commentID){
    $statement = $this->db->prepare("
    SELECT entries.entryID, entries.title, entries.content, entries.createdAt, entries.userID 
    FROM comments JOIN entries
    ON entries.entryID = comments.entryID 
    WHERE commentID = :commentID");
    $statement->execute([
        ':commentID' => $commentID
    ]);
    $returnarray = $statement->fetch(PDO::FETCH_ASSOC);
    $statement = $this->db->prepare("DELETE FROM comments WHERE commentID = :commentID");
    $statement->execute([
        'commentID' => $commentID
    ]);
    return $returnarray;
   }

    
}