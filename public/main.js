const views = {
  login: ['#loginFormTemplate', '#registerFormTemplate'],
  loggedIn: ['#loggedInNavTemplate']

}
function renderView(view){
  // Definera ett target
  const target = document.querySelector('main');

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
  })
}
renderView(views.login);

const loginForm = document.querySelector('#loginForm')
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
      renderView(views.loggedIn);
      return response.json();
    }
  }).catch(error => {
      console.error(error);
  })
})


