const formRegister = document.getElementById("formRegister");
formRegister.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    nombre: formRegister[0].value,
    direccion: formRegister[1].value,
    password: formRegister[2].value,
  }

  const respuesta = await fetch('/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  // Hago la registración
  const content = await respuesta.json();

  // Si sale bien guardamos el access token
  const { access_token } = content;

  // Si hay un access token, lo almacena en el local storage y redirecciona a '/'.
  // Si no hay, redirecciona a '/register-error'
  if (access_token) {
    localStorage.setItem("access_token", access_token);
    location.href = '/'
  } else {
    location.href = '/register-error'
  }
})
