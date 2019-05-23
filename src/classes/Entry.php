<?php

class Entry extends Mapper { 
    public function getAllEntries(){
        $statement = $this->db->prepare("SELECT * FROM entries");
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEntryByID($entryID){
        $statement = $this->db->prepare("SELECT * FROM entries WHERE entryID = :entryID");
        $statement->execute([
            ':entryID' => $entryID 
        ]);
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

   public function updateEntryByID($entryID, $title, $content){
       $statement = $this->db->prepare("UPDATE entries SET title=:title, content=:content WHERE entryID = :entryID");
       $statement->execute([
           ':title' => $title,
           ':content' => $content,
           ':entryID' => $entryID
       ]);
       return true; 
   }
   public function getEntriesByUserID($userID){
    //bra att ha när man ska se en specifik användares entries
        $statement = $this->db->prepare("SELECT * FROM entries WHERE userID = :userID");
        $statement->execute([
            'userID' => $userID
        ]);

        return $statement->fetchAll(PDO::FETCH_ASSOC);
   }

   public function deleteEntriesByID($entryID){
       $statement = $this->db->prepare("DELETE FROM entries WHERE entryID = :entryID");
       $statement->execute([
           'entryID' => $entryID
       ]);
       
   }

}
 