/**
 * Poner en marcha tres servidores (con el formato del primer ejercicio: sin cluster)
utilizando Forever. Dichos procesos escucharán en los puertos 8081, 8082 y 8083
respectivamente.

*Generar un request a sus rutas raíz comprobando que respondan adecuadamente.

*Verificar en el sistema operativo la cantidad de procesos levantados de node y analizar
el porqué.

*Finalizar por sistema operativo el proceso de cada uno de estos servidores,
comprobando que Forever los ponga en marcha nuevamente (tendrían que iniciar con
un nuevo pid).

*Listar todos los servidores activos y comprobar la finalización de un proceso y de todos
por parte de Forever, comprobando en el sistema operativo los procesos de node
levantados.

 */

import express from 'express'

const app = express()

const PORT = parseInt(process.argv[2]) || 8080

app.get('/', (req, res) => {
    res.send(`Servidor express en ${PORT} - <b> PID: ${process.pid}</b> - ${new Date().toLocaleString()}`)
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})



/**
 * instalo Forever de forma global
 * npm i -g forever
 * 
 * -> forever start <filename> [args]: inicia un nuevo proceso   ej: forever start server.js
 * 
 * -> forever list: lista todos los procesos activos
 * 
 * -> forever stop <PID>: detiene un proceso según su id de proceso
 * 
 * -> forever stopall: detiene todos los procesos activos
 * 
 * -> forever --help: muestra la ayuda completa
 */