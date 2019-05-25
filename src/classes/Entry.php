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

    //TROR ATT DETTA FUNKAR MEN HAR INTE TESTAT
    //BEHÖVER FIXA FÖR ÄLDSTA INLÄGGEN (COUNT) ANNARS OK
    public function get20Entries($num){
        $modifiednum = $num*20;
        $statement = $this->db->prepare("SELECT * FROM (SELECT * FROM (SELECT * FROM entries ORDER BY createdAt DESC LIMIT :modifiednum) AS test ORDER BY createdAt ASC LIMIT 20) AS testa ORDER BY createdAt DESC");
        
        $statement->bindParam(':modifiednum', $modifiednum, PDO::PARAM_INT);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

   public function updateEntryByID($entryID, $title, $content){
       $statement = $this->db->prepare("UPDATE entries SET title=:title, content=:content WHERE entryID = :entryID");
       $statement->execute([
           ':title' => $title,
           ':content' => $content,
           ':entryID' => $entryID
       ]);
       $statement = $this->db->prepare("SELECT * FROM entries WHERE entryID = :entryID");
       $statement->execute([
           ':entryID' => $entryID
       ]);
       return $statement->fetch(PDO::FETCH_ASSOC);
   }
   public function getEntriesByUserID($userID){
    //bra att ha när man ska se en specifik användares entries
        $statement = $this->db->prepare("SELECT * FROM entries WHERE userID = :userID");
        $statement->execute([
            'userID' => $userID
        ]);

        return $statement->fetchAll(PDO::FETCH_ASSOC);
   }
   
   public function fullEntries($userID) {
    $statement = $this->db->prepare("SELECT title, entryID, content FROM entries WHERE userID = :userID");
    $statement->execute([
        ':userID' => $userID
    ]);
    return $statement->fetchAll(PDO::FETCH_ASSOC);
  }

   public function deleteEntriesByID($entryID){
       $statement = $this->db->prepare("DELETE FROM entries WHERE entryID = :entryID");
       $statement->execute([
           'entryID' => $entryID
       ]);
       return array('ok' => true); 
   }

   public function postEntry($title, $content){
    $statement = $this->db->prepare("INSERT INTO entries (title, content, createdAt, userID) VALUES (:title, :content, :createdAt, :userID)");
    $statement->execute([
        ':title'=> $title,
        ':content'=> $content,
        'createdAt' => date('Y-m-d H:i:s'),
        ':userID' => $_SESSION ['userID']

    ]);
    return array("ok"=>true);
}

}
 