/////////////////////////////////////////////////////////////////////////
//
//  Realizar un programa de backend que establezca sesiones de usuarios en el server.
//
// Cuando un cliente visita el sitio por primera vez en la ruta 'root', se presentará el mensaje de "Te damos la bienvenida".
//
// Con los siguientes request de ese mismo usuario, deberá aparecer el número de visitas efectuadas. 
// El cliente podrá ingresar por query params el nombre, en cuyo caso se añadirá a los mensajes devuelto.
//
// Por ej: "Bienvenido Juan" o "Juan visitaste la página 3 veces".
// Ese nombre sólo se almacenará la primera vez que el cliente visite el sitio.
//
// Se dispondrá de una ruta 'olvidar' que permite reiniciar el proceso de visitas para el usuario.
//
// En caso de que no haya error,  se retornará el mensaje "Hasta luego" más el nombre del cliente (de existir);
// caso contrario un objeto con el siguiente formato: { error: descripción }. 
// 
// Luego de requerir esa ruta, el efecto será como el de visitar el sitio por primera vez.
//
// NOTA1: Utilizar el middleware express como estructura de server.
//
// NOTA2: Generar los request con varios navegadores (Chrome, Edge, Firefox) para simular los distintos clientes en forma local.
//
//////////////////////////////////////////////////////////////////////////

import express from 'express';
import session from 'express-session';

import sessionFileStore from 'session-file-store';
const FileStore = sessionFileStore(session);

const app = express();

// Setup de Session
//   secret indica la clave con la que se van a firmar las variables
//   resave: false => para que no se vuelvan a guardar
//   saveUninitialized: false
//  --------------------------
// Setup de Store
// store: new FileStore() instancia el store
//  path: indica la ruta donde se almacenará el archivo.
//  ttl: indica el tiempo de vida en segundos
app.use(session({
    store: new FileStore({
        path: './sessions',
        ttl: 60
    }),
    
    secret: "Samurai",
    resave: false,
    saveUninitialized: false
}))

//--------------------//
//  Contador         //
//                  //
//-----------------//  
app.get('/', (req, res) => {
    // SI en el request no viene la variable contador, la creo e inicializo en 1.
    if(!req.session.contador){
        req.session.contador = 1
        req.session.nombre = req.query.nombre || "Anakin"
        res.send("Hello there " + req.session.nombre)
    } else {
        req.session.contador++
        res.send("Hello there " + req.session.nombre + " you have visited the page " + req.session.contador + " times.")
    }
});

//--------------------//
//  Olvidar          //
//                  //
//-----------------// 
app.get("/olvidar", (req, res) => {
    const nombre = req.session.nombre || ""
    req.session.destroy( err => {
        if (err){
            res.json({ error: "algo hiciste mal", descripcion: err })
        } else {
            res.json({ respuesta: "Hasta luego " + nombre })
        }
    })
});

const PORT = 8080

app.listen(PORT, () => {console.log("escuchando en el 8081")})