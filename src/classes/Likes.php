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
        return $statement->$returnarr;
    }

       //insertLike
    public function insertLike($entryID){
        $createdAt = date('Y-m-d H:i:s');
        $createdBy = $_SESSION['userID'];
        $statement = $this->db->prepare("INSERT INTO likes (entryID, createdBy, createdAt) VALUES ('$entryID', '$createdBy', '$createdAt')");
        $statement->execute([
            ":entryID" => $entryID
        ]);
        $statement = $this->db->prepare("SELECT * FROM entries WHERE entryID = :entryID");
        $statement->execute([
            ':entryID' => $entryID 
        ]);
        return $statement->fetch(PDO::FETCH_ASSOC);

    }

}
