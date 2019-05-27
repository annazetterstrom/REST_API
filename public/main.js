let views = {
  newEntry: ['#CreateNewEntryTemplate'],
  errorNewEntry: ['#CreateNewEntryTemplate', '#errorNewEntryTamplate'],
  entries: ['#entryTemplate'],
  entrySummary: ['#entrySummaryTemplate'],
  entrySummaryError: ['#entrySummaryErrorTemplate'],
  entryError: ['#entryErrorTemplate'],
  comment: ['#commentsTemplate'],
  registerSuccess: ['#greetingNewUserTemplate'],
  registerError: ['#registerFormTemplate', '#registerErrorTemplate'],
  greeting: ['#greetingTemplate'],
  login: ['#loginFormTemplate'],
  loginError: ['#loginFormTemplate', '#loginErrorTemplate'],
  register: ['#registerFormTemplate'],
  loggedIn: ['#loggedInNavTemplate'],
  loggedOut: ['#loggedOutNavTemplate'],
  loggedOutError: ['#logoutErrorTemplate'],
  loggedOutSuccess: ['#logoutSuccessTemplate'],
  entriesError: ['#entriesErrorTemplate']
}

//Fullösning: om $_SESSION['loggedIn'] är true i servern så laddar vi in en template med id=loggedIn i html just nu... It aint fancy but it works:p
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
//"länk element"
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

//funktioner
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
        console.log("fail");
        main.innerHTML = "";
        renderView(views.loginError, main);
        addloginlistener();
        return Error(response.statusText);
      } else{
        console.log("yey");
        return response.json();
      }
    }).then(data => {
        console.log(data);
        if(!data.loggedIn){
          main.innerHTML = "";
          renderView(views.loginError, main);
          addloginlistener();
        } else {
          loggedIn = true;
          loggedInID = data.userID;
          nav.innerHTML = "";
          renderView(views.loggedIn, nav);
          addLoggedInNavListeners();
          getEntries();
        }
        console.log(data);
      }
    ).catch(error => {
        console.error(error);
    })
  });
}

function addRegisterlistener(){
  registerForm = document.querySelector('#registerForm');
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('hej', e);
    const formData = new FormData(registerForm)
    fetch ('/api/register', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(!response.ok){
        console.log("fail");
        main.innerHTML = "";
        renderView(views.registerError, main);
        addRegisterlistener();
        return Error(response.statusText);
      }else{
        console.log("yey");
        return response.json();
      }
    }).then(data => {
        console.log(data);
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

function logout(){
  fetch ('/api/logout', {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      console.log("fail");
      main.innerHTML = "";
      renderView(views.logoutError, main);
      return Error(response.statusText);
    }else{
      console.log("yey");
      return response.json();
    }
  }).then(data => {
      console.log(data);
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

// skriva ett inlägg
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
        console.log("fail");
        main.innerHTML = "";
        renderView(views.errorNewEntry, main);
        writeNewEntrylistener();
        return Error(response.statusText);
      } else{
        console.log("yey");
        return response.json();
      }
    }).then(data => {
        console.log(data);
        if(!data.ok===true){
          main.innerHTML = "";
          renderView(views.errorNewEntry, main);
          writeNewEntrylistener();
          console.log("laddar om sidan");
        } else {
          main.innerHTML = "<p class='alert alert-success' role='alert'> Inlägget skapades </p> ";
          //renderView(views.greeting, main);
          //renderView(views.comment, main);
        }
        console.log(data);
      }
    ).catch(error => {
        console.error(error);
    })
  });
}


 // visar summerade inlägg 
function summaryEntryListener(){
  summaryEntryForm = document.querySelector('#summaryEntryForm');
  summaryEntryForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(summaryEntryForm)
    fetch ('/api/summaryEntry', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(!response.ok){
        console.log("fail");
        main.innerHTML = "";
        renderView(views.entrySummaryError, main);
        addloginlistener();
        return Error(response.statusText);
      }else{
        console.log("yey");
        nav.innerHTML = "";
        renderView(views.entrySuccess, nav);
        return response.json();
      }
    }).then(data => {
        if(!data.comment){
          main.innerHTML = "";
          renderView(views.entryError, main);
          addloginlistener();
        } else {
          nav.innerHTML = "";
          renderView(views.entrySuccess, nav);
          addLoggedInNavListeners();
          //add nav listeners
          main.innerHTML = "";
          renderView(views.entrySummary, main);
        }
        console.log(data);
      }
    ).catch(error => {
        console.error(error);
    })
  });
}
// Visa allt, Titel och Innehåll, inloggat läge

function fullEntries(){
  TitelAndContentForm = document.querySelector('#TitelAndContentTemplate');
  TitelAndContentForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(TitelAndContentForm)
    fetch ('/api/TitelAndContent', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(!response.ok){
        console.log("fail");
        main.innerHTML = "Det blev något fel";
        return Error(response.statusText);
      }else{
        console.log("yey");
        main.innerHTML = "";
        renderView(views.fullEntries, main);
        return response.json();
      }
    }).then(data => {
        if(!data.comment){
          main.innerHTML = "";
          renderView(views.entriesError, main);
          addloginlistener();
        } else {
          nav.innerHTML = "";
          renderView(views.entriesSuccess, nav);
          addLoggedInNavListeners();
          //add nav listeners
          main.innerHTML = "";
          renderView(views.entriesError, main);
          renderView(views.entries, main);
        }
        console.log(data);
      }
    ).catch(error => {
        console.error(error);
    })
  });
}

function addLoggedInNavListeners(){
  homeLink = document.querySelectorAll('.home-link');
  userlistLink = document.querySelector('.userlist-link');
  myEntriesLink = document.querySelector('.my-entries-link');
  postEntryLink = document.querySelector('.post-entry-link');
  logoutLink = document.querySelector('.logout-link');

  myEntriesLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i myentries");
    getMyEntries();
  });
  postEntryLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i postentry");
    main.innerHTML="";
    renderView(views.newEntry, main); 
    writeNewEntrylistener();
  });
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i logout");
    logout();
  });
  for(let i=0;i<homeLink.length;i++){
    homeLink[i].addEventListener('click', (e) => {
      e.preventDefault();
      console.log("nu är du i hem");
      getEntries();
    });
  }
  userlistLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i userlist");
    getUsers();
  });
}

function addLoggedOutNavListeners(){
  homeLink = document.querySelectorAll('.home-link');
  userlistLink = document.querySelector('.userlist-link');
  registerLink = document.querySelector('.register-link');
  loginLink = document.querySelector('.login-link');

  for(let i=0;i<homeLink.length;i++){
    homeLink[i].addEventListener('click', (e) => {
      e.preventDefault();
      console.log("nu är du i hem");
      main.innerHTML = "";
      getEntries();
    });
  }
  userlistLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i userlist");
    getUsers();
  });
  registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i register");
    main.innerHTML = "";
    renderView(views.register, main);
    addRegisterlistener();
  });
  loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i login");
    main.innerHTML = "";
    renderView(views.login, main);
    addloginlistener();
  });
}

function renderView(view, target){
  // Definera ett target

  // Loopa igenom våran "view"
  view.forEach(template => {
    // Hämta innehållet i templaten
    const templateMarkup = document.querySelector(template).innerHTML;
 
    // Skapa en div
    const div = document.createElement('div');
    // Fyll i diven med innehållet
    div.innerHTML = templateMarkup;
    
    // Lägg in den diven i target (main-elementet)
    target.append(div);
  });
}
// Search-function
function searchFunction(e){
  e.preventDefault();
  var keywords = e.target.getElementsByTagName('input')[0].value;
  getSearchEntries(keywords);
}
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
      main.innerHTML = "<p class='alert alert-primary' role='alert'> Det finns inga inlägg </p>";
    } else {
      main.innerHTML = "<h2 class='title'>Senaste inläggen</h2>";
      // Search-button start 
      main.innerHTML += "<form class='search-bar' name='form-serach' method='post' onsubmit='searchFunction(event)'><input type='text' name='search' placeholder='Search'><input type='submit' value='sök' name='searchbtn'></form>";
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

function getMyEntries(){
  //det kan vara bra om vi döper om den här endpointen här och i entry.php sen
  fetch ('/api/fullEntries',{ 
  method: 'GET'
}).then(response => {
    if(!response.ok){
      main.innerHTML = "Avengers, assemble!";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    if(data.length === 0){
      main.innerHTML = "Det finns inga inlägg";
    } else {
      main.innerHTML = "";
      data.forEach(entry => {
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

function getEntryfromListener(e){
  let id = e.target.dataset.entryid;
  let userid = e.target.dataset.userid;
  console.log(userid);
  let title = e.target.innerHTML;
  let content = document.querySelector("p[data-entryid='" + id + "']").innerHTML;
  getEntry(id, title, content, userid);
}

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
    main.innerHTML += ` <button class="btn btn-outline-secondary like-review"><i class="fa fa-heart" aria-hidden="true"></i> Like</button>`;
  } else {
    main.innerHTML = str;
  }
  getComments(id);
}

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

function editComment(e){
  e.preventDefault();
  console.log("hello edit comment");
  let id = e.target.dataset.commentid;
  //om button ligger i form
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

function deleteComment(e){
  e.preventDefault();
  console.log("hello delete comment");
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

function getComments(id){
  console.log('/api/comments/' + id)
  fetch ('/api/comments/' + id, {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "fuckups på serversidan";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    if(data.length === 0){
      main.innerHTML += "<p class='alert alert-info' role='alert'> Det finns inga kommentarer till detta inlägg </p>";
    }
    data.forEach(comment => {
      console.log(comment);
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
          <button class="send-button">Skicka</button>
        </form>
      `;
      addCommentFormListener();
    }

  }).catch(error => {
    console.error(error);
  });

}

function addCommentFormListener(e){
  console.log("hello commentformlistener");
  commentForm = document.querySelector('#commentForm');
  
  let editbtn = document.getElementById('edit-button');
  let deletebtn = document.getElementById('delete-button');
  if(editbtn){
    editbtn.addEventListener('click', editEntry);
    deletebtn.addEventListener('click', deleteEntry);
  }

  let editcommentbtns = document.getElementsByClassName('editcomment');
  console.log(editcommentbtns[0]);
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
        console.log("fail");
        main.innerHTML += "Något gick fel och kommentaren sparades inte :/";
        return Error(response.statusText);
      }else{
        console.log("yey");
        return response.json();
      }
    }).then(data => {
        console.log(data);
        getEntry(data.entryID, data.title, data.content, data.userID);
      }).catch(error => {
        console.error(error);
    });
  });
}

function getUsers(){
  fetch ('/api/users', {
    method: 'GET'
  }).then(response => {
    if(!response.ok){
      main.innerHTML = "Verkar ha blivit något fel på serversidan när vi försökte komma åt användarna :/";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    if(data.length === 0){
      main.innerHTML = "Det finns inga inlägg";
    } else {
      main.innerHTML = "<h2 class='title';>Registrerade användare</h2>";
      data.forEach(user => {
        main.innerHTML += "<p class='users' data-userid='" + user.userID + "'>" + user.username + "</p>";
      });
      let users = document.getElementsByClassName('users');
      console.log(users.length);
      for(let i=0;i<users.length;i++){
        users[i].addEventListener('click', getUserEntries);
      }
    }
  }).catch(error => {
    console.error(error);
  });
}
// alla inläggen
function getUserEntries(e){
  let userid = e.target.dataset.userid;
  console.log('/api/entries/' + userid);
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
    console.log(data);
    if(data.length === 0){
      main.innerHTML = " <p class='alert alert-info' role='alert'> Det finns inga inlägg av den här användaren. </p>";
    } else {
      main.innerHTML = "<h1>Dina senaste inlägg</h1>";
      data.forEach(entry => {
        console.log(entry);
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

function templateInserter(templateString, jsonarr){
  let temp = document.querySelector(templateString);
  jsonarr.forEach(jsonobj => {
    let items = temp.content.querySelectorAll("*");
    items.forEach(item => {
      let a = document.importNode(item, true);
        let entries = Object.entries(jsonobj);
        entries.forEach(entry => {
          if(a.dataset.templatekey === entry[0]){
              a.textContent = entry[1];
          }
        });
      document.body.appendChild(a);
    }); 
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
      // Sök-knappen  
      main.innerHTML += "<form class='search-bar' name='form-serach' method='post' onsubmit='searchFunction (event)  '><input type='text' name='search' placeholder='Search'><input type='submit' value='sök'  name='searchbtn'></  form>";
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