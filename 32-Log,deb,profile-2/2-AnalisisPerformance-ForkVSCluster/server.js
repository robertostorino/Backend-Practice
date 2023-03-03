/**
 * 
 * Utilizando el desafío anterior, agregar un parámetro (FORK ó CLUSTER) en línea de
comandos que permita habilitar o deshabilitar el modo cluster en el servidor.
● Realizar un análisis de performance sobre la ruta '/randoms-debug' en modo fork y
cluster utilizando Artillery como generador de carga con 50 usuarios virtuales con 50
request cada uno.

    Respuesta:
        1/ FORK
            ejecuto node server.js FORK
            ejecuto en otra terminal: artillery quick -c 50 -n 50 "http://localhost:8080/random-debug" > artillery_fork.txt

        2/ CLUSTER
            ejecuto node server.js CLUSTER
            ejecuto en otra terminal: artillery quick -c 50 -n 50 "http://localhost:8080/random-debug" > artillery_cluster.txt
● Revisar los reportes de Artillery, corroborando que los request por segundo y la
latencia del servidor en modo cluster tengan mejores resultados que en modo fork.
 */

import express from 'express'
import cluster from 'cluster'
import os from 'os'

const app = express()

const MODO = process.argv[2] || 'CLUSTER'

function calcularRandoms(min, max, cant) {
    let randoms = []

    for (let i = 0; i < cant; i++) {
        let random = parseInt(Math.random() * (max - min + 1)) + min
        randoms.push(random)
    }
    return randoms
}

app.get('/random-debug', (req, res) => {
    let randoms = calcularRandoms(0, 9, 10000)
    console.log(randoms);
    res.json({ randoms }).status(200)
})

app.get('/random-nodebug', (req, res) => {
    let randoms = calcularRandoms(0, 9, 10000)
    res.json({ randoms }).status(200)
})

const PORT = 8080

if (MODO == 'CLUSTER' && cluster.isPrimary) {
    const numCPUs = os.cpus().length

    console.log("entramos");

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        cluster.fork()
    })

} else {
    app.listen(PORT, () => {
        console.log("escuchando en el 8080");
    })
}

/**
 * COMANDOS
 * 
 * node server.js FORK
 */