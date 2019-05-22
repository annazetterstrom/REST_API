<?php

class User extends Mapper {
  public function getUserByID($userID) {
    $statement = $this->db->prepare("SELECT * FROM users WHERE userID = :userID");
    $statement->execute([
      ':userID' => $userID
    ]);
    return $statement->fetch(PDO::FETCH_ASSOC);
  }
  public function register($username, $password) {
    $hash = password_hash($password, PASSWORD_BCRYPT);
    $statement = $this->db->prepare("SELECT COUNT(username) AS num FROM users WHERE username = :username");
    $statement->execute([
      ':username' => $username
    ]);
    $num = $statement->fetch(PDO::FETCH_ASSOC)['num'];
    if($num==0){
      $statement = $this->db->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
      $statement->execute([
        ':username' => $username,
        ':password' => $hash
      ]);
      return true;
    } else {
      return false;
    }
  }
  
  public function updateUserByID($userID, $username, $password) {
    //lägg till check på username
    
    $statement = $this->db->prepare("UPDATE users SET username = :username, password =:password WHERE userID = :userID");
    $hash = password_hash($password, PASSWORD_BCRYPT);
    $statement->execute([
      ':userID' => $userID,
      'username' => $username,
      'password' => $hash
    ]);
    return true;
  }
  
  public function getUsers() {
    $statement = $this->db->prepare("SELECT * FROM users");
    $statement->execute();
    return $statement->fetchAll(PDO::FETCH_ASSOC);
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
      return false;
    }
  }

}
