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
if(logintag){
   loggedIn = true;
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
  renderView(views.greeting, main);
  renderView(views.comment, main); 
  renderView(views.entrySummary, main);
  addLoggedInNavListeners();
} else {
  renderView(views.loggedOut, nav);
  renderView(views.registerSuccess, main); 
  renderView(views.entrySummary, main);
  getEntries();
  addLoggedOutNavListeners();
}

//funktioner
function addloginlistener(){
  loginForm = document.querySelector('#loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(loginForm)
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
          console.log("laddar om sidan");
        } else {
          nav.innerHTML = "";
          renderView(views.loggedIn, nav);
          addLoggedInNavListeners();
          //add nav listeners
          main.innerHTML = "";
          renderView(views.greeting, main);
          renderView(views.comment, main);
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
 // Visar kommentarer
function commentsListener(){
  commentForm = document.querySelector('#commentForm');
  commentForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(commentForm)
    fetch ('/api/comment', {
      method: 'POST',
      body: formData
    }).then(response => {
      if(!response.ok){
        console.log("fail");
        main.innerHTML = "";
        renderView(views.commentError, main);
        addloginlistener();
        return Error(response.statusText);
      }else{
        console.log("yey");
        nav.innerHTML = "";
        renderView(views.commentSuccess, nav);
        return response.json();
      }
    }).then(data => {
        if(!data.comment){
          main.innerHTML = "";
          renderView(views.commentError, main);
          addloginlistener();
        } else {
          nav.innerHTML = "";
          renderView(views.commentSuccess, nav);
          addLoggedInNavListeners();
          //add nav listeners
          main.innerHTML = "";
          renderView(views.comment, main);
        }
        console.log(data);
      }
    ).catch(error => {
        console.error(error);
    })
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
          main.innerHTML = "det gick bra :)";
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

function enriesTitelAndContent(){
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
        renderView(views.enriesTitelAndContent, main);
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
      renderView(views.greeting, main);
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

function renderEntry(view, target, entryData){

  let templateMarkup = document.querySelector(template).innerHTML;
  
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
      main.innerHTML = "Det finns inga inlägg";
    } else {
      main.innerHTML = "";
      console.log(data)
      data.forEach(entry => {
        console.log(entry);
        renderView(views.entrySummary, main);
      })
      }
    }
  ).catch(error => {
    console.error(error);
  });
}

function getMyEntries(){
  fetch ('/api/enriesTitelAndContent',{ 
  method: 'GET'
}).then(response => {
    if(!response.ok){
      main.innerHTML = "fuckups";
      return Error(response.statusText);
    }else{
      return response.json();
    }
  }).then(data => {
    if(data.length === 0){
      main.innerHTML = "Det finns inga inlägg";
    } else {
        main.innerHTML = "";
        console.log(data);
        data.forEach(entry => {
          main.innerHTML += '<hr>';
          main.innerHTML += '<h1 class="title">' + entry.title + '</h1>' ;
          main.innerHTML += '<p class="content">' + entry.content + '</p> ' ;
        });
      }
    }
  ).catch(error => {
    console.error(error);
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
      main.innerHTML = "<h1 class='title';>Registrerade användare</h1>";
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
      main.innerHTML = "Det finns inga inlägg av den här användaren";
    } else {
      main.innerHTML = "<h1>Dina senaste inlägg</h1>";
      data.forEach(entry => {
        main.innerHTML += "<h2 class='entries' data-entryid='" + entry.entryID + "'>" + entry.title + "</h2>";
        main.innerHTML += "<hr>";
        main.innerHTML += "<p>" + entry.content + "</p>";
      });
    }
  }).catch(error => {
    console.error(error);
  });
}

function updateEntryByID(){
  fetch('/api/entry/{id}', {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', JSON.stringify(response)));

}