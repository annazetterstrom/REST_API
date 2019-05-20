let views = {
  greeting: ['#greetingTemplate'],
  login: ['#loginFormTemplate', '#registerFormTemplate'],
  loggedIn: ['#loggedInNavTemplate'],
  loggedOut: ['#loggedOutNavTemplate']

}

//variables
let loggedIn = true;

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
  renderView(views.greeting, main);
  //"länk element"
  homeLink = document.querySelectorAll('.home-link');
  userlistLink = document.querySelector('.userlist-link');
  registerLink = document.querySelector('.register-link');
  loginLink = document.querySelector('.login-link');

  //"länk-lyssnare"
  for(let i=0;i<homeLink.length;i++){
    homeLink[i].addEventListener('click', () => {
      console.log("nu är du i hem");  
    });
  }
  userlistLink.addEventListener('click', () => {
    console.log("nu är du i userlist");
  });
  registerLink.addEventListener('click', () => {
    console.log("nu är du i register");
  });
  loginLink.addEventListener('click', () => {
    console.log("nu är du i login");
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
        renderView(view.loginError);
        return Error(response.statusText);
      }else{
        console.log("yey");
        renderView(views.login, main);
        return response.json();
      }
    }).catch(error => {
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


