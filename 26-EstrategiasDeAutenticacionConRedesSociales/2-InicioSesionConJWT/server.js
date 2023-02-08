//----------------------------------------------------------------------------------------------------//
//  Utilizando la estructura de un servidor Nodejs express, realizar el siguiente desarrollo implementando
// las sesiones de usuario a través de JWT (JSON Web Token).
// Dichas sesiones tendrán un tiempo de expiración de 1 minuto.
//
// Requerimientos del sistema:
// 1) Tenga un formulario de registro de usuario (nombre, password y direcciçon) que almacene dicha
//   información en un array en memoria.
// 2) Un formulario de login (nombre y password) para permitir a los usuarios registrados iniciar sesión.
// 3) Si accede un usuario no registrado ó las credenciales no corresponden, el servidor enviará un error
//   (puede ser a través de un objeto plano o de una plantilla).
// 4) Si se quiere registrar un usuario que ya está registrado,  el servidor enviará un error
//    (puede ser a través de un objeto plano o de una plantilla)
// 5) Al carga la página principal ('/'), si existe una sesión iniciada, se mostrarán los datos del usuario en cuestión 
//    (obtenidos mediante una consulta con el token debidamente adjunto en el encabezado de la petición de datos). 
//    Caso contrario, se lo redirigirá a una página que le informe que no posee autorización, y le ofrecerá ir a la página de login.
// 6) Implementar el cierre de sesión con un botón logout en la página de datos de usuario, que redirige la vista al formulario de login.
// 7) Como extra podemos implementar un contador de visitas, que se muestre sobre la vista de datos.
// 
// NOTA:
// 1) No utilizar ni passport ni session de express
// 2) Se puede usar fetch para hacer la petición a la API de datos
//----------------------------------------------------------------------------------------------------//

import express from 'express';
import { engine as exphbs } from 'express-handlebars';
import * as jwt from './jwt.js';

// creo nuestra "db" en memoria
const usuarios = [];

// Para que se puedan utilizar las rutas absolutas al guardar archivos
import { fileURLToPath } from 'url'
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configuración de handlebars
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

// Configuración de express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const PORT = 8080;
app.listen(PORT, () => {
    console.log('server escuchando en http://localhost:'+PORT)
});

//--------------------------------//
// Rutas: /
//--------------------------------//
app.get('/', (req, res) => {
    res.redirect('/login')
});


//--------------------------------//
// Rutas: Regiter
//--------------------------------//

app.get('/register', (req, res) => {
    // envío el archivo donde está el register
    res.sendFile(__dirname + '/public/register.html')
});

app.post('/register', (req, res) => {

    // recibo el nombre desde el body
    const { nombre } = req.body;

    // verifico que haya un usuario con ese nombre
    const usuario = usuarios.find(usuario => usuario.nombre == nombre);
    if ( usuario ) {
        return res.status(400).json({
            error: 'es usuario ya existe'
        })
    }
    
    // Mi user va a tener todo lo que contenga en el body
    const user = req.body;
    user.contador = 0;

    // Agrego el usuario en usuarios
    usuarios.push(user);

    // creo el access token
    const access_token = jwt.generateAuthToken(nombre);

    // Devuelvo la info con un json
    res.json({access_token});
});

//--------------------------------//
// Rutas: Regiter Error
//--------------------------------//
app.get('/register-error', (req, res) => {
    res.render('/register-error')
});

//--------------------------------//
// Rutas: Login
//--------------------------------//
app.get('/login', (req, res) => {
    //le envía el archivo de login
    res.sendFile(__dirname + '/public/login.html')
});

app.post('/login', (req, res) => {

    //extraigo el nombre y password del body
    const { nombre, password } = req.body;

    // checkeo que no exista el usuario en la base de datos
    const usuario = usuarios.find(usuario => usuario.nombre == nombre)
    if (!usuario) {
        return res.status(400).json({
            error: 'no existe ese usuario'
        })
    };

    if (password != usuario.password) {
        return res.status(400).json({
            error: 'password incorrecta'
        })
    };

    usuario.contador = 0;

    // creo el access token para este usuario y se lo envío a datos
    const access_token = jwt.generateAuthToken(nombre);
    res.json({nombre, access_token});

});

//--------------------------------//
// Rutas: Login Error
//--------------------------------//
app.get('/login-error', (req, res) => {
    res.render('login-error')
});

//--------------------------------//
// Rutas: Datos
//--------------------------------//
app.get('/api/datos', jwt.auth ,(req, res) => {
    // jwt nos trae el nombre
    // en req.user me trae el nombre
    // Busco el usuario
    const usuario = usuarios.find(usuario => usuario.nombre == req.user.nombre)
    if (!usuario) {
        return res.status(400).json({
            error: 'usuario no encontrado'
        })
    }

    usuario.contador++;

    res.json({
        datos: usuario,
        contador: usuario.contador
    })
});


