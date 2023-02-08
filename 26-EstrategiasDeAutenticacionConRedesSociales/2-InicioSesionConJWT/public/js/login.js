const formLogin = document.getElementById("formLogin");
formLogin.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    nombre: formLogin[0].value,
    password: formLogin[1].value,
  }

  const respuesta = await fetch('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  // Hago el login
  const content = await respuesta.json();

  // Si sale bien guardamos el access token
  const { access_token } = content;

  // Si hay un access token, lo almacena en el local storage y redirecciona a '/'.
  // Si no hay, redirecciona a '/login-error'
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    location.href = '/'
  } else {
    location.href = '/login-error'
  }
})
