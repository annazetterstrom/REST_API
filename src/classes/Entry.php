<?php


class Entry extends Mapper { 
    public function getEntrybyID($entryID){
        $statement = $this->db->prepare("SELECT * FROM entries WHERE entryID = :entryID");
        $statement->execute([
            'entryID' => $entryID 
        ]);
        return $statement->fetch(PDO::FETCH_ASSOC);
    }
}
