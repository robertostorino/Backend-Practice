///////////////////////////////////////////////////////////////////////////////////////////
//
// Realizar un programa de backend que permita gestionar cookies desde el frontend:
//
///////////////////////////////////////////////////////////////////////////////////////////
//  1) Definir una ruta "cookies"
//  2) Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
//  3) Definir un método GET que devuelva todas las cookies presentes.
//  4) Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.

// NOTA1: Utilizar la librería express como estructura de server.
// NOTA2: Si algún parámetro recibido es inválido, o directamente inexistente, el server devolverá un objeto de error:
//  ej: { error: 'falta nombre ó valor' } o { error: 'nombre no encontrado' }.
//      Si todo sale bien, devolver el objeto { proceso: 'ok' }
// NOTA3: Si el tiempo no está presente, generar una cookie sin tiempo de expiración.
// NOTA4: Generar los request con varios navegadores (Chrome, Edge, Firefox) para simular los distintos clientes en forma local.

//  ---------------

//creo el server en express
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());    // Para poder manejar los json en los post

// Cookie Setup
// app.use(cookieParser());    // Cookie sin firmar
app.use(cookieParser('ArgentinaCampeon')); // Cookie firmada

//Ahora cada cookie que envío con signed: true va a ir firmada
//con el secret

//2) Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
app.post('/cookies', (req, res) => {
    let { clave, valor, tiempo, firmada } = req.body;

    // si viene firmada
    if (!firmada) {
        firmada = false
    };

    // si no tiene clave o valor
    if (!clave || !valor) {
        return res.json({error: 'falta nombre o valor'})
    };
    
    // si viene el tiempo
    if (tiempo) {
        res.cookie( clave, valor, { maxAge: parseInt(tiempo) * 1000, signed: firmada })
    } else {
        res.cookie(clave, valor, { signed: firmada })
    };

    res.json({ proceso: 'ok' });
});

//  3) Definir un método GET que devuelva todas las cookies presentes.
app.get('/cookies', (req, res) => {
    res.json({ noFirmadas: req.cookies, firmadas: req.signedCookies })
});

//  4) Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.
app.delete('/cookies/:clave', (req, res) => {
    const { clave } = req.params

    // si no encuentra la cookie
    if (!req.cookies[clave] && !req.signedCookies[clave]) {
        return res.json({ error: 'nombre invalido'})
    };
    res.clearCookie(clave);
    res.json({ proceso: 'ok' });
});

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en el ', PORT)
})