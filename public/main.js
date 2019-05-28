const iife = (function(){

let views = {
  newEntry: ['#CreateNewEntryTemplate'],
  errorNewEntry: ['#CreateNewEntryTemplate', '#errorNewEntryTamplate'],
  entries: ['#entryTemplate'],
  entrySummaryError: ['#entrySummaryErrorTemplate'],
  entryError: ['#entryErrorTemplate'],
  registerSuccess: ['#greetingNewUserTemplate'],
  registerError: ['#registerFormTemplate', '#registerErrorTemplate'],
  login: ['#loginFormTemplate'],
  loginError: ['#loginFormTemplate', '#loginErrorTemplate'],
  register: ['#registerFormTemplate'],
  loggedIn: ['#loggedInNavTemplate'],
  loggedOut: ['#loggedOutNavTemplate'],
  loggedOutError: ['#logoutErrorTemplate'],
  loggedOutSuccess: ['#logoutSuccessTemplate'],
  entriesError: ['#entriesErrorTemplate']
}

let logintag = document.getElementById('loggedIn');
let loggedIn;
let loggedInID;
if(logintag){
   loggedIn = true;
   loggedInID = logintag.dataset.userid;
} else {
  loggedIn = false;
}

let loginForm;
let registerForm;

let homeLink;
let myEntriesLink;
let userlistLink;
let postEntryLink;
let logoutLink;
let registerLink;
let loginLink;

let nav = document.querySelector('#nav');
let main = document.querySelector('main');

if(loggedIn){
  renderView(views.loggedIn, nav);
  addLoggedInNavListeners();
} else {
  renderView(views.loggedOut, nav);
  addLoggedOutNavListeners();
}
getEntries();

//Functions

// Log in
function addloginlistener(){
  loginForm = document.querySelector('#loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    let formData = new FormData(loginForm)
    fetch ('/api/login', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(!response.ok){
        main.innerHTML = "";
        renderView(views.loginError, main);
        addloginlistener();
        return Error(response.statusText);
      } else{
        return response.json();
      }
    }).then(data => {
        if(!data.loggedIn){
          main.innerHTML = "";
          renderView(views.loginError, main);
          addloginlistener();
        } else {
          loggedIn = true;
          loggedInID = data.userID;
          nav.innerHTML = "";
          renderView(views.loggedIn, nav);
          document.querySelector('#show-username b u').innerHTML = data.username;
          addLoggedInNavListeners();
          getEntries();
        }
      }
    ).catch(error => {
        console.error(error);
    })
  });
}

// Add new user
function addRegisterlistener(){
  registerForm = document.querySelector('#registerForm');
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(registerForm)
    fetch ('/api/register', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(!response.ok){
        main.innerHTML = "";
        renderView(views.registerError, main);
        addRegisterlistener();
        return Error(response.statusText);
      }else{
        return response.json();
      }
    }).then(data => {
        if(data.registred){
          main.innerHTML = "";
          renderView(views.registerSuccess, main);
        } else {
          main.innerHTML = "";
          renderView(views.registerError, main);
          addRegisterlistener();
        }
      }
    ).catch(error => {
        console.error(error);
    });
  });
}

// Log out
function logout(){
  fetch ('/api/logout', {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "";
      renderView(views.logoutError, main);
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
      if(data.loggedOut){
        loggedIn = false;
        nav.innerHTML = "";
        renderView(views.loggedOut, nav);
        addLoggedOutNavListeners();
        main.innerHTML = "";
        renderView(views.loggedOutSuccess, main);
      } else {
        main.innerHTML = "";
        renderView(views.loggedOutError, main);
        nav.innerHTML = "";
      }
    }
  ).catch(error => {
      console.error(error);
  });
}

// Write post
function writeNewEntrylistener(){
  newEntryForm = document.querySelector('#newEntryForm');
  newEntryForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(newEntryForm)
    fetch ('/api/entry', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(!response.ok){
        main.innerHTML = "";
        renderView(views.errorNewEntry, main);
        writeNewEntrylistener();
        return Error(response.statusText);
      } else{
        return response.json();
      }
    }).then(data => {
        if(!data.ok===true){
          main.innerHTML = "";
          renderView(views.errorNewEntry, main);
          writeNewEntrylistener();
        } else {
          main.innerHTML = "<p class='alert alert-success' role='alert'> Inlägget skapades </p> ";
        }
      }
    ).catch(error => {
        console.error(error);
    })
  });
}

// Menu as loggedin
function addLoggedInNavListeners(){
  homeLink = document.querySelectorAll('.home-link');
  userlistLink = document.querySelector('.userlist-link');
  myEntriesLink = document.querySelector('.my-entries-link');
  postEntryLink = document.querySelector('.post-entry-link');
  logoutLink = document.querySelector('.logout-link');

  myEntriesLink.addEventListener('click', (e) => {
    e.preventDefault();
    getMyEntries();
  });
  postEntryLink.addEventListener('click', (e) => {
    e.preventDefault();
    main.innerHTML="";
    renderView(views.newEntry, main); 
    writeNewEntrylistener();
  });
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
  for(let i=0;i<homeLink.length;i++){
    homeLink[i].addEventListener('click', (e) => {
      e.preventDefault();
      getEntries();
    });
  }
  userlistLink.addEventListener('click', (e) => {
    e.preventDefault();
    getUsers();
  });
}

// Menu as loggedout
function addLoggedOutNavListeners(){
  homeLink = document.querySelectorAll('.home-link');
  userlistLink = document.querySelector('.userlist-link');
  registerLink = document.querySelector('.register-link');
  loginLink = document.querySelector('.login-link');

  for(let i=0;i<homeLink.length;i++){
    homeLink[i].addEventListener('click', (e) => {
      e.preventDefault();
      main.innerHTML = "";
      getEntries();
    });
  }
  userlistLink.addEventListener('click', (e) => {
    e.preventDefault();
    getUsers();
  });
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    main.innerHTML = "";
    renderView(views.register, main);
    addRegisterlistener();
  });
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    main.innerHTML = "";
    renderView(views.login, main);
    addloginlistener();
  });
}

function renderView(view, target){
  // Define target

  // Run through "view"
  view.forEach(template => {
    // Get content in template
    const templateMarkup = document.querySelector(template).innerHTML;
 
    // Create div
    const div = document.createElement('div');
    // Add content in div
    div.innerHTML = templateMarkup;
    
    // Add div in target (main-elementet)
    target.append(div);
  });
}
// Search-function
function searchFunction(e){
  e.preventDefault();
  var keywords = e.target.getElementsByTagName('input')[0].value;
  getSearchEntries(keywords);
}

// Entries (title and content) in home
function getEntries(){
  fetch ('/api/entries', {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "";
      renderView(views.entriesError, main);
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    if(data.length < 1){
      main.innerHTML = "<p class='alert alert-info' role='alert'> Det finns inga inlägg </p>";
    } else {
      main.innerHTML = "<h2 class='title'>Senaste inläggen av våra användare</h2>";
      // Search-button start 
      main.innerHTML += "<form class='search-bar' name='form-serach' method='post' onsubmit='iife.searchFunction(event)'><input type='text' name='search' placeholder='Search..' class='search-input'><input type='submit' value='sök' name='searchbtn' class='serach-button'></form>";
      // Search-button end
      data.forEach(entry => {
        main.innerHTML += "<div class='margin'>"
        main.innerHTML += "<ul class='list-group list-group-flush' id='wrapper'>"
        main.innerHTML += "<li>"
        main.innerHTML += "<a href='#' class='search'>"
        main.innerHTML += "<h2 class='title list-group-item' data-userid='" + entry.userID + "' data-entryid='" + entry.entryID + "'>" + entry.title + "</h2>";
        main.innerHTML += "<p class='hidden' data-entryid='" + entry.entryID + "'>" + entry.content + "</p>";
        main.innerHTML += "</a>";
        main.innerHTML += "</li>";
        main.innerHTML += "</ul>";
        main.innerHTML += "</div>";
      });
      let entries = document.getElementsByClassName('title');
      for(let i=0;i<entries.length;i++){
        entries[i].addEventListener('click', getEntryfromListener);
      }
    }
  }).catch(error => {
    console.error(error);
  });
}

// Posts in "Mina inlägg"
function getMyEntries(){
  fetch ('/api/fullEntries',{ 
  method: 'GET'
}).then(response => {
    if(!response.ok){
      main.innerHTML = "";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    if(data.length === 0){
      main.innerHTML = "<p class='alert alert-info' role='alert'> Du har inte gjort några inlägg.</p>";
    } else {
      main.innerHTML = "";
      data.forEach(entry => {
        console.log(entry);
        main.innerHTML += '<hr>';
        main.innerHTML += "<h2 class='title' data-userid='" + entry.userID + "' data-userid='" + entry.userID + "' data-entryid='" + entry.entryID + "'>" + entry.title + "</h2>";
        main.innerHTML += "<p class='content' data-entryid='" + entry.entryID + "'>" + entry.content + "</p>";
      });
      let entries = document.getElementsByClassName('title');
      for(let i=0;i<entries.length;i++){
        entries[i].addEventListener('click', getEntryfromListener);
      }
    }
  }).catch(error => {
    console.error(error);
  });
}

// Get user, title, content and userid
function getEntryfromListener(e){
  let id = e.target.dataset.entryid;
  let userid = e.target.dataset.userid;
  let title = e.target.innerHTML;
  let content = document.querySelector("p[data-entryid='" + id + "']").innerHTML;
  getEntry(id, title, content, userid);
}

// Create, edit, delete and comment posts
function getEntry(id, title, content, userid){
  let modaldarkness = document.getElementsByClassName('modal-backdrop')[0];
  if(modaldarkness){
    document.body.classList.remove('modal-open');
    modaldarkness.remove();
  }
  let str = "";
  str += '<h1 class="title">' + title + '</h1>';
  str += '<p class="content">' + content + '</p> ';
  if(loggedIn && loggedInID == userid){
    str += '<button class="btn btn-danger" id="delete-button" data-entryid="'+ id + '"> Radera inlägg </button>';
    main.innerHTML = str;

    main.innerHTML +=`
    <!-- Button trigger modal -->
    <button type='button' class='btn btn-primary' data-toggle='modal' data-target='#editmodal'>
      Redigera
    </button>
    <!-- Modal -->
    <div class='modal fade' id='editmodal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
      <div class='modal-dialog' role='document'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='exampleModalLabel'>Redigera inlägg</h5>
            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div class='modal-body'>
          <form id='editEntryForm'>
            <div class='form-group'>
              <label for='exampleFormControlInput1'>Titel</label>
              <input name='title' type='text' class='form-control' id='exampleFormControlInput1' value='${title}' placeholder='Titel...'>
            </div>
            <input type='hidden' name='entryid' value='${id}'>
            <div class='form-group'>
              <label for='exampleFormControlTextarea1'>Content</label>
              <textarea name='content' class='form-control' id='exampleFormControlTextarea1' rows='3' placeholder='Content...'>${content}</textarea>
            </div>
          </form>
          </div>
          <div class='modal-footer'>
            <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>
            <button type='button' data-entryid="${id}" id='edit-button' class='btn btn-primary'>Save changes</button>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    main.innerHTML = str;
  }
  getComments(id);
}

// Edit posts
function editEntry(e){
  let id = e.target.dataset.entryid; 
  let k = document.getElementById('editEntryForm');
  let formData = new FormData(k);
  fetch ('/api/entry/' + id, {
    method: 'POST',
    body: formData
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "<p class='alert alert-info' role='alert'> Du måste vara inloggad för att redigera eller radera inlägg </p>";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    getEntry(data.entryID, data.title, data.content, data.userID);

  }).catch(error => {
    console.error(error);
  });
}

// Edit in comments
function editComment(e){
  e.preventDefault();
  let id = e.target.dataset.commentid;
  let k = e.target.parentNode;
  let formData = new FormData(k);
  fetch ('/api/comment/' + id, {
    method: 'POST',
    body: formData
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "<p class='alert alert-info' role='alert'> Du måste vara inloggad för att redigera  kommentarer </p>";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    getEntry(data.entryID, data.title, data.content, data.userID);

  }).catch(error => {
    console.error(error);
  });
}

// Delete comment
function deleteComment(e){
  e.preventDefault();
  let id = e.target.dataset.commentid;
  fetch ('/api/comment/' + id, {
    method: 'DELETE'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "<p class='alert alert-info' role='alert'> Du måste vara inloggad för att redigera eller radera inlägg </p>";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    main.innerHTML = "";
    getEntry(data.entryID, data.title, data.content, data.userID);

  }).catch(error => {
    console.error(error);
  });
}

function deleteEntry(e){
  let id = e.target.dataset.entryid; 
  fetch ('/api/entry/' + id, {
    method: 'DELETE'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "<p class='alert alert-info' role='alert'> Du måste vara inloggad för att redigera eller radera inlägg </p>";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    main.innerHTML = "";
    getEntries();

  }).catch(error => {
    console.error(error);
  });
}

// Get comments from database
function getComments(id){
  fetch ('/api/comments/' + id, {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    // If there's no comments
    if(data.length === 0){
      main.innerHTML += "<p class='alert alert-info' role='alert'> Det finns inga kommentarer till detta inlägg </p>";
    }
    data.forEach(comment => {
      let str = "";
      str += "<div>";
      str += "<p>" + comment.content + "</p>";
      str += "<p>Skriven av: " + comment.username + "</p>";
      str += "<small>" + comment.createdAt + "</small>";
      if(loggedInID == comment.createdBy){
        str += "<form>";
        str += "<input name='content' type='text'>";
        str += "<button data-commentid='" + comment.commentID +"' class='btn btn-primary editcomment'>redigera</button>";
        str += "<button data-commentid='" + comment.commentID +"' class='btn btn-danger deletecomment'>radera</button>";
        str += "</form>";
      }
      str += "</div>";
      main.innerHTML += str;
    });
    if(loggedIn){
      main.innerHTML += `
        <form id="commentForm">
          <textarea class="textarea" name="content" placeholder="Skriv en kommentar..."></textarea> <br>
          <input type="hidden" value="${id}" name="entryID">
          <button class="send-button btn btn-success">Skicka</button>
        </form>
      `;
      addCommentFormListener();
    }

  }).catch(error => {
    console.error(error);
  });

}

// Comments
function addCommentFormListener(e){
  commentForm = document.querySelector('#commentForm');
  
  let editbtn = document.getElementById('edit-button'); // "Redigera"
  let deletebtn = document.getElementById('delete-button'); // "Radera"
  if(editbtn){
    editbtn.addEventListener('click', editEntry);
    deletebtn.addEventListener('click', deleteEntry);
  }

  let editcommentbtns = document.getElementsByClassName('editcomment');
  for(let i=0;i<editcommentbtns.length;i++){
    editcommentbtns[i].addEventListener('click', editComment);
  }
  let deletecommentbtns = document.getElementsByClassName('deletecomment');
  for(let i=0;i<deletecommentbtns.length;i++){
    deletecommentbtns[i].addEventListener('click', deleteComment);
  }
  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    fetch ('/api/comment', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(!response.ok){
        main.innerHTML += "Något gick fel och kommentaren sparades inte.";
        return Error(response.statusText);
      }else{
        return response.json();
      }
    }).then(data => {
        getEntry(data.entryID, data.title, data.content, data.userID);
      }).catch(error => {
        console.error(error);
    });
  });
}

// Get users
function getUsers(){
  fetch ('/api/users', {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "Verkar ha blivit något fel på serversidan när vi försökte komma åt användarna.";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    if(data.length === 0){
      main.innerHTML = "<p class='alert alert-info' role='alert'> Det finns inga inlägg </p>";
    } else {
      main.innerHTML = "<h2 class='title';>Registrerade användare</h2>";
      data.forEach(user => {
        main.innerHTML += "<p class='users' data-userid='" + user.userID + "'>" + user.username + "</p>";
      });
      let users = document.getElementsByClassName('users');
      for(let i=0;i<users.length;i++){
        users[i].addEventListener('click', getUserEntries);
      }
    }
  }).catch(error => {
    console.error(error);
  });
}
// All posts
function getUserEntries(e){
  let userid = e.target.dataset.userid;
  fetch ('/api/entries/' + userid, {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "Verkar ha blivit något fel på serversidan när vi försökte komma åt inläggen :/";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    if(data.length === 0){
      main.innerHTML = " <p class='alert alert-info' role='alert'> Det finns inga inlägg av den här användaren. </p>";
    } else {
      main.innerHTML = "<h1>Senaste inläggen</h1>";
      data.forEach(entry => {
        main.innerHTML += '<hr>';
        main.innerHTML += "<h1 class='title' data-userid='" + entry.userID + "' data-entryid='" + entry.entryID + "'>" + entry.title + "</h2>";
        main.innerHTML += "<p class='content' data-entryid='" + entry.entryID + "'>" + entry.content + "</p>";
      });
      let entries = document.getElementsByClassName('title');
      for(let i=0;i<entries.length;i++){
        entries[i].addEventListener('click', getEntryfromListener);
      }
    }
  }).catch(error => {
    console.error(error);
  });
}

// Search-function
function getSearchEntries(keywords){
  fetch ('/api/searchentry/' + keywords, {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "Verkar ha blivit något fel på serversidan när vi försökte komma åt inläggen :/";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    console.log(data);
    if(data.length === 0){
      main.innerHTML = " <p class='alert alert-info' role='alert'> Din sökning gav inga träffar. </p>";
    } else {
      main.innerHTML = "<h2 class='title'>Senaste inläggen</h2>";
      // Search-input start 
      main.innerHTML += "<form class='search-bar' name='form-serach' method='post' onsubmit='iife.searchFunction(event)  '><input type='text' name='search' placeholder='Search'><input type='submit' value='sök' name='searchbtn'></  form>";
      // Search-input end
      main.innerHTML = "<h1>Sökträffar</h1>";
      data.forEach(entry => {
        console.log(entry);
        main.innerHTML += "<div class='margin'>"
        main.innerHTML += "<ul class='list-group list-group-flush' id='wrapper'>"
        main.innerHTML += "<li>"
        main.innerHTML += "<a href='#' class='search'>"
        main.innerHTML += "<h2 class='title list-group-item' data-userid='" + entry.userID + "' data-entryid='" + entry.entryID + "'>" + entry.title + "</h2>";
        main.innerHTML += "<p class='hidden' data-entryid='" + entry.entryID + "'>" + entry.content + "</p>";
        main.innerHTML += "</a>";
        main.innerHTML += "</li>";
        main.innerHTML += "</ul>";
        main.innerHTML += "</div>";
      });
      let entries = document.getElementsByClassName('title');
      for(let i=0;i<entries.length;i++){
        entries[i].addEventListener('click', getEntryfromListener);
      }
    }
  }).catch(error => {
    console.error(error);
  });
}

// Make searchfunction global
return{
  searchFunction: searchFunction // Global
}
})();

