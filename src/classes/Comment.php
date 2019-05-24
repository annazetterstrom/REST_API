<?php

class Comment extends Mapper {
    public function getCommentByID($commentID){
        $statement = $this->db->prepare("SELECT * FROM comments WHERE commentID = :commentID");
        $statement->execute([
            ':commentID' => $commentID 
        ]);
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function updateCommentByID($commentID){
        $statement = $this->db->prepare("SELECT comments SET content=:content WHERE commentID = :commentID");
        $statement->execute([
            '' => $commentID
        ]);
    }

    public function deleteCommentsByID($commentID){
        $statement = $this->db->prepare("DELETE FROM comments WHERE commentID = :commentID");
        $statement->execute([
            'commentID' => $commentID
        ]);
    }
    
   public function getCommentsByEntryID($entryID){
        $statement = $this->db->prepare("SELECT * FROM comments WHERE entryID = :entryID");
        $statement->execute([
            'entryID' => $entryID
        ]);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
   }

   public function postComment($content, $entryID){
    $statement = $this->db->prepare("INSERT INTO comments (entryID, content, createdBy, createdAt) VALUES (:entryID, :content, :createdBy, :createdAt)");
    $statement->execute([
        ':entryID'=> $entryID,
        ':content'=> $content,
        'createdBy' => $_SESSION['userID'],
        'createdAt' => date('Y-m-d H:i:s')

    ]);
    return array("ok"=>true);
   }

    
}