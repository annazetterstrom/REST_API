let views = {
  registerView: ['#greetingNewUserTemplate'],
  greeting: ['#greetingTemplate'],
  login: ['#loginFormTemplate'],
  loginError: ['#loginFormTemplate', '#loginErrorTemplate'],
  register: ['#registerFormTemplate'],
  loggedIn: ['#loggedInNavTemplate'],
  loggedOut: ['#loggedOutNavTemplate'],
  entrySummery: ['#entrySummeryTemplate']
}

//Ska fås från servern sen:p
let loggedIn = false;

let loginForm;
//"länk element"
let homeLink;
let myEntriesLink;
let userlistLink;
let postEntryLink;
let logoutLink;
let registerLink;
let loginLink;

//elements
let nav = document.querySelector('#nav');
let main = document.querySelector('main');

//saker som behöver köras när sidan laddats
if(loggedIn){
  renderView(views.loggedIn, nav);
  renderView(views.greeting, main);
  homeLink = document.querySelectorAll('.home-link');
  userlistLink = document.querySelector('.userlist-link');
  myEntriesLink = document.querySelector('.my-entries-link');
  postEntryLink = document.querySelector('.post-entry-link');
  logoutLink = document.querySelector('.logout-link');

  myEntriesLink.addEventListener('click', () => {
    console.log("nu är du i myentries");
  });
  postEntryLink.addEventListener('click', () => {
    console.log("nu är du i postentry");
  });
  logoutLink.addEventListener('click', () => {
    console.log("nu är du i logout");
  });
  for(let i=0;i<homeLink.length;i++){
    homeLink[i].addEventListener('click', () => {
      console.log("nu är du i hem");
    });
  }
  userlistLink.addEventListener('click', () => {
    console.log("nu är du i userlist");
  });
} else {
  renderView(views.loggedOut, nav);
  renderView(views.registerView, main);
  renderView(views.entrySummery, main);
  //"länk element"
  homeLink = document.querySelectorAll('.home-link');
  userlistLink = document.querySelector('.userlist-link');
  registerLink = document.querySelector('.register-link');
  loginLink = document.querySelector('.login-link');

  //"länk-lyssnare"
  for(let i=0;i<homeLink.length;i++){
    homeLink[i].addEventListener('click', () => {
      console.log("nu är du i hem");
      main.innerHTML = "";
      renderView(views.greeting, main);
    });
  }
  userlistLink.addEventListener('click', () => {
    console.log("nu är du i userlist");
    main.innerHTML = "-.-";
  });
  registerLink.addEventListener('click', () => {
    console.log("nu är du i register");
    main.innerHTML = "";
    renderView(views.register, main);
    //lägg till lyssnare
  });
  loginLink.addEventListener('click', () => {
    console.log("nu är du i login");
    main.innerHTML = "";
    renderView(views.login, main);
    addloginlistener();
  });
}

//funktioner

//greja med någon gång, ska inte vara såhär :s
function addloginlistener(){
  loginForm = document.querySelector('#loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('hej', e);
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
        main.innerHTML = "";
        renderView(views.greeting, main);
        return response.json();
      }
    }).then(
      data => {
        console.log(data);
      }
    ).catch(error => {
        console.error(error);
    })
  });
}
// registerar ny nvändare
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
        nav.innerHTML = "";
        renderView(views.loggedOut, nav);
        main.innerHTML = "";
        renderView(views.registerView, main);
        return response.json();
      }
    }).then(
      data => {
        console.log(data);
      }
    ).catch(error => {
        console.error(error);
    })
  });
}

function renderView(view, target){
  // Definera ett target

  // Loopa igenom våran "view"
  view.forEach(template => {
    // Hämta innehållet i templaten
    console.log(document.querySelector(template));
    const templateMarkup = document.querySelector(template).innerHTML;
 
    // Skapa en div
    const div = document.createElement('div');
    // Fyll i diven med innehållet
    div.innerHTML = templateMarkup;
    
    // Lägg in den diven i target (main-elementet)
    target.append(div);
  });
}


