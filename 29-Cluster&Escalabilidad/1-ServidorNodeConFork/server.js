/**
 * Realizar un servidor Node.js basado en express al que se le pase como parámetro el
 * número de puerto de escucha. De no recibir este dato, el servidor iniciará en el puerto
 * 8080.
 * 
 * Al ponerse en línea el servidor representará por consola el puerto de conexión y su
 * número de proceso (pid).
 * 
 * En el endpoint raíz '/' deberá devolver un mensaje con el siguiente formato:
 * 'Servidor express en (PORT) - PID (pid) - (fecha y hora actual)}'
 * 
 * NOTA: Al ejecutar Nodemon, este será el proceso PRINCIPAL/PRIMARY/MAIN 
 * y luego levantará Node como un WORKER mediante FORK.
 * Por tanto, se puede matar el proceso worker sin cortar el trabajo mientras el proceso PRIMARY esté activo.
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