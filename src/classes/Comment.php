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
            $statement = $this->db->prepare("SELECT ");
            $statement->execute([
                '' => $commentID
            ]);
            
        }
    
}