let views = {
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
  entrySummery: ['#entrySummeryTemplate']
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
  addLoggedInNavListeners();
} else {
  renderView(views.loggedOut, nav);
  renderView(views.registerSuccess, main);
  renderView(views.entrySummery, main);
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
      }else{
        console.log("yey");
        nav.innerHTML = "";
        renderView(views.loggedIn, nav);
        return response.json();
      }
    }).then(data => {
        if(!data.loggedIn){
          main.innerHTML = "";
          renderView(views.loginError, main);
          addloginlistener();
        } else {
          nav.innerHTML = "";
          renderView(views.loggedIn, nav);
          addLoggedInNavListeners();
          //add nav listeners
          main.innerHTML = "";
          renderView(views.greeting, main);
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
function addLoggedInNavListeners(){
  homeLink = document.querySelectorAll('.home-link');
  userlistLink = document.querySelector('.userlist-link');
  myEntriesLink = document.querySelector('.my-entries-link');
  postEntryLink = document.querySelector('.post-entry-link');
  logoutLink = document.querySelector('.logout-link');

  myEntriesLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i myentries");
  });
  postEntryLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i postentry");
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
    });
  }
  userlistLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("nu är du i userlist");
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
    main.innerHTML = "-.-";
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


