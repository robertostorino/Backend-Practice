/**
 * Tomando como base el ejercicio anterior, agregar la lógica que permita construir un cluster de
 * servidores, poniendo un evento de escucha en cada servidor para reiniciarlo si se cae.
 * ● Representar por consola el número de procesadores detectados, el momento en el que un
 * servidor se cae, el pid de los procesos worker y el del master.
 * ● Poner en marcha el servidor con node y nodemon en el puerto 8081, verificando en cada
 * caso, la respuesta en su ruta raíz y el número de procesos activos de node en el sistema
 * operativo, relacionándolos con el número de procesadores.
 * ● Finalizar en el sistema operativo un proceso worker comprobando que se reinicia en un
 * nuevo pid.
 * ● Como último identificar el pid del master y finalizar su proceso de node, analizando qué
 * ocurre en el caso de haberlo ejecutado con node y con nodemon.
 */

import express from 'express'
import cluster from 'cluster'
import os from 'os'

const numCPUs = os.cpus().length

// Si entra al if crea workers, y si va al else abre un servidor HTTP.
if (cluster.isPrimary) {
    console.log(numCPUs)
    console.log(`PID number: ${process.pid}`)

    // Crea un woker por cada CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    // Controla la salida de los workers
    cluster.on('exit', worker => {
        // Informa que un worker murió
        console.log(`Worker ${worker.process.pid} died: ${new Date().toString()}`)
        // Levanta un nuevo worker
        cluster.fork()
    })
} else {
    const app = express()

    const PORT = parseInt(process.argv[2]) || 8080

    app.get('/', (req, res) => {
        res.send(`Servidor express en ${PORT} - <b> PID: ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT} - PID: ${process.pid}`);
    })
}

/**
 * En windows:
 *  Matar un proceso:
 *      taskkill /pid 14436 /F           -> Mata el PID 14436
 */