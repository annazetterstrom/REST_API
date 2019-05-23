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
    
}