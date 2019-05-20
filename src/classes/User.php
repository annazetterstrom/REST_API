<?php

class User extends Mapper {
  public function getUserByID($userID) {
    $statement = $this->db->prepare("SELECT * FROM users WHERE userID = :userID");
    $statement->execute([
      ':userID' => $userID
    ]);
    return $statement->fetch(PDO::FETCH_ASSOC);
  }

  public function login($username, $password) {
    $statement = $this->db->prepare("SELECT * FROM users WHERE username = :username");
    $statement->execute([
      ':username' => $username
    ]);
    $row = $statement->fetch(PDO::FETCH_ASSOC);
    if(password_verify($password, $row['password'])){
      $_SESSION['loggedIn'] = true;
      $_SESSION['userID'] = $row['userID'];
      return true; 
    }else{
      return $response->withStatus(401);
    }
  }

}
