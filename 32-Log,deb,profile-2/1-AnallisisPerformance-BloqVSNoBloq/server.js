/**
 * 
    1. Realizar un servidor que calcule 10000 números aleatorios entre el 0 y el 9
    inclusive.
    ● El servidor devolverá los números calculados en un array dentro de un objeto en
    formato JSON: {randoms: [array de randoms]}.
    ● Se van a utilizar dos rutas en las que el cliente puede requerir la información:
    '/randoms-nodebug' y '/randoms-debug', la última contendrá un console.log que
    enviará el array calculado a la consola del servidor.

    2. Realizar un análisis de performance a través del profiler (--prof) de node.js y del
    modo inspect (--inspect) para las dos rutas, utilizando Artillery como generador de
    carga con 50 usuarios virtuales emitiendo 50 request cada uno.

    -> Respuest:
        1) Hacemos la prueba con el debug 
        (debo correr en dos consolas, al mismo tiempo, primero el prof y luego el artillery)
        node --prof server.js    -> Genera el archivo isolate
        artillery quick -c 50 -n 50 "http://localhost:8080/random-debug" > artillery_slow.txt

        Luego renombro el archivo isolate -> bloq-v8.log

        2) Hacemos la prueba con el nodebug
        (debo correr en dos consolas, al mismo tiempo, primero el prof y luego el artillery)
        node --prof server.js    -> Genera el archivo isolate
        artillery quick -c 50 -n 50 "http://localhost:8080/random-nodebug" > artillery_fast.txt

        Luego renombro el archivo isolate -> nobloq-v8.log

    ● Verificar que los tiempos de proceso en la ruta '/randoms-debug' sean mayores a los
    de la ruta '/randoms-nodebug', debido a la operación sincrónica bloqueante del
    console.log.

        1) convertir los prof (ejecutar desde cmd, ya que da falla con bash)

            node --prof-process bloq-v8.log > prof_slow.txt
            node --prof-process nobloq-v8.log > prof_fast.txt
 * 
 */

import express from 'express'

const app = express()

function calcularRandoms(min, max, cant) {
    let randoms = []

    for (let i = 0; i < cant; i++) {
        let random = parseInt(Math.random() * (max - min + 1)) + min
        randoms.push(random)
    }
    return randoms
}

app.get('/ramdom-debug', (req, res) => {
    let randoms = calcularRandoms(0, 9, 10000)
    console.log(randoms);
    res.json({ randoms }).status(200)
})

app.get('/ramdom-nodebug', (req, res) => {
    let randoms = calcularRandoms(0, 9, 10000)
    res.json({ randoms }).status(200)
})

const PORT = 8080

app.listen(PORT, () => {
    console.log("escuchando en el 8080");
})

/**
 * Artillery se utiliza para las pruebas de cargar
 *   npm i -g artillery
 */

/**
 * 
 * artillery quick --count 50 --40
 * 
 *  "Mean response/sec" es media de respuestas por segundo
 * 
 *  "Response time, median": Milisegundos de latencia.
 * 
 * Pofiling (análisis de rendimiento) _> El objetivo es averiguar el tiempo dedicado a la ejecución
 * de diferentes partes del programa para detectar los puntos problemáticos y áreas donde sea posible
 * llevar a cabo una optimización del rendimiento (velocidad y/o consumo de recursos).
 * 
 * Un profiler puede proporcionar distintas salidas, como una taza de ejecución o un resumen estadístico
 * de los eventos observados.
 * 
 * Los navegadores tienen un built-in profiler integrado en DevTools, que registra toda la información
 * sobre las funciones y cuánto tiempo lleva ejecutarlas en un archivo de registro.
 */

/**
 * Curl es una herramienta de línea de comandos y librería para transferir
datos con URL. Se usa en líneas de comando o scripts para transferir
datos.
 */