/**
 * 
 * 1. Realizar un análisis de performance sobre el desafío anterior, utilizando 0x y
autocannon en modo consola. Con autocannon realizar un test con el servidor
corriendo con 0x, emulando 500 conexiones concurrentes realizadas en 20
segundos de test.
2. Hacer el procedimiento mencionado con el servidor en modo fork y sobre los
endpoint '/randoms-debug' y '/randoms-nodebug' obteniendo en cada caso el
reporte de autocannon y el diagrama de flama.
3. Analizar para cada caso los datos y gráficos obtenidos, y revisar que los
resultados concuerden con los esperado: la ruta con debug por console.log es
menos performante (bloquea más el servidor) que la que no lo contiene.
 * 
 */

/**
 * 1- enciendo el server:  npm start
 * 2- En otra terminal, registro un usuario:
 * 3- ejecuto el test: npm test
 * 4- Ambos test se ejecutan en paralelo.
 * 5- Se genera en consola un reporte parecido a los que vimos con los métodos anteriores, con cada test
 * 
 * Forma que debería tener el diagrama de flama para que el proceso sea eficiente:
 *      - mayor cantidad de picos
 *      - lo más fino posibles
 */

/**
 * 
 * Para mostrar la info de autocannon
 * 1- enciendo el server: node server.js
 * 2- En otra terminal, registro un usuario:
 * 3- ejecuto el test: npm test
 * 4- Ambos test se ejecutan en paralelo.
 */

import express from 'express'
import cluster from 'cluster'
import os from 'os'

const app = express()

const MODO = process.argv[2] || 'FORK'

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

if (MODO == 'CLUSTER' && cluster.isMaster) {
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
 * Autocannon es una dependencia de Node (similar a Artillery) que sirve para realizar test de carga.
 * npm i autocannon
 * 
 * Es una herramienta de evaluación comparativa HTTP / 1.1 -> CURL
 * 
 * 
 * 0x es una dependencia de Node que perfila y genera un gráfico de flama (flame graph)
 * interactivo para un proceso Node en un solo comando.
 * npm i -g 0x
 * 
 * En este caso, los test de carga se harán por código, en lugar de por consola como hicimos con Artillery.
 */

/**
 * creo benchmark.js -> contiene los test
 * 
 * modificamos el package.json:
 *  "scripts": {
        "test": "node benchmark.js",
        "start": "0x server.js"
    }

    con esto hacemos que genere el gráfico de flama
    en test le decimos qué archivo va a testear

 */