/**
 * Realizar un servidor con express que contenga una ruta raíz '/' donde se represente la cantidad de visitas totales
 * a este endpoint (no usar session).
 * 
 * Se implementará otra ruta '/calculo-bloq', que permita realizar una suma incremental de los números
 * del 0 al 100.000 con el siguiente algoritmo
 *    function sumar() {
 *          let suma = 0
 *          for (let i=0; i<5e9; i++){
 *              suma += i
 *          }
 *    }
 * 
 * Comprobar que al alcanzar esta ruta en una pestaña del navegador, el proceso queda en espera del resultado.
 * Constatar que durante dicha espera, la ruta de visitas no responde hasta terminar este proceso.
 * 
 * Luego crear la ruta '/calculo-nobloq' que hará dicho cálculo forkeando el algoritmo en un child_process, 
 * comprobando ahora que el request a esta ruta no bloquee la ruta de visitas.
 * Asegurarse de que una vez finalizado el proceso, el worker se cierra correctamente.
 */

import express from 'express';
import { fork } from 'child_process';
import path from 'path';

const app = express(); //Creo server con express

//función bloqueante
function calculoLento() {
    let sum = 0
    for (let i= 0; i < 5e9; i++) {
        sum += i
    }
    return sum
};

// variable global de visitas
let visitas = 0;

//----------------------//
//  RUTAS
//----------------------//

app.get('/', (req, res) => {
    res.json({visitas: ++visitas})
});

app.get('/bloqueante', (req, res) => {
    const result = calculoLento()
    res.json({result})
});

app.get('/no-bloqueante', (req, res) => {
    
    //traigo el cálculo con el fork
    const calculo = fork(path.resolve(process.cwd(), 'calculo.js'))

    //escucho al proceso hijo. Va a recibir: listo o el objeto result
    calculo.on('message', result => {
        if (result == 'listo') {
            calculo.send('start')
        } else {
            res.json(result)
        }
    });
});

const PORT = 8080
app.listen(PORT, () => {
    console.log(`servidor escuchando: http://localhost:${PORT}`)
});

