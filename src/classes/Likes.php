<?php

class Likes extends Mapper{
    public function getLikesByEntryID($entryID){
        $statement = $this->db->prepare("SELECT * FROM likes INNER JOIN users ON likes.createdBy = users.userID WHERE entryID = :entryID ORDER BY createdAt ASC");
        $statement->execute([
            ":entryID" => $entryID
        ]);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
       }
}
