<?php

class Likes extends Mapper{
    public function getLikesByEntryID($entryID){
        $statement = $this->db->prepare("SELECT COUNT(entryID) FROM likes AS num WHERE entryID = :entryID");
        $statement->execute([
            ":entryID" => $entryID
        ]);
        $num = $statement->fetch(PDO::FETCH_ASSOC);
        $statement = $this->db->prepare("SELECT COUNT(entryID) FROM likes AS userlike WHERE entryID = :entryID, createdBy = :createdBy");
        $statement->execute([
            ":entryID" => $entryID,
            ":createdBy" => $_SESSION['userID']
        ]);
        $userlike = $statement->fetch(PDO::FETCH_ASSOC)['userlike'];
        if($userlike == 0){
            $returnarr = array_merge(array('liked' => false), $num);
        } else {
            $returnarr = array_merge(array('liked' => true), $num);
        }
       }

       //insertLike
       public function insertLike($entryID, 
       )

}
