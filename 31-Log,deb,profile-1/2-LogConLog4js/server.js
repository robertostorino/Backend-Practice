/**
 * Crear un servidor que tenga una ruta '/sumar' que reciba por query params
dos números y devuelva un mensajes con la suma entre ambos.
Utilizar log4js para crear un módulo capaz de exportar uno de los siguientes
dos loggers: uno para el entorno de desarrollo, que logueará de info en
adelante por consola, y otro para el entorno de producción, que logueará de
debug en adelante a un archivo ‘debug.log’ y solo errores a otro archivo
‘errores.log’.
 * 
El logueo se realizará siguiendo el siguiente criterio:
➔ En caso de operaciones exitosas, loguear una línea de info
➔ En caso de ingresar un número no válido, loguear un error
➔ En caso de fallar el inicio del servidor, loguear un error
➔ En caso de recibir una petición a un recurso inválido, loguear una
warning.
La decisión de qué logger exportar se tomará en base al valor de una variable
de entorno NODE_ENV, cuyo valor puede ser: ‘PROD’ para producción, o
cualquier otra cosa (incluyendo nada) para desarrollo.
 */

import express from 'express'
import logger from './logger.js'

const app = express()

app.get('/sumar', (req, res) => {
    const n1 = parseInt(req.query.n1)
    const n2 = parseInt(req.query.n2)

    if (isNaN(n1) || isNaN(n2)) {
        logger.error('Parametros invalidos')
        return res.send('Parametros invalidos')
    }

    logger.info(`Parametros correctos: ${n1}, ${n2}`)
    res.send(`El resultado de ${n1} + ${n2} = ${n1+n2}`)
})

app.get('*', (req, res) => {
    const { url, method } = req

    logger.warn(`Ruta ${method} ${url} no esta implementada`)
    res.send(`Ruta ${method} ${url} no esta implementada`)
})

const PORT = 8080

const server = app.listen(PORT, err => {
    if (err) {
        logger.error(`Error iniciando el server: ${err}`)
        return
    }

    logger.info(`Servidor escuchando en el puerto: ${PORT}`)
})

// el evento err está definido en el servidor de express
server.on('error', err => {
    logger.error(`Error en el servidor: ${err}`)
});


// para probar el entorno producción, debo agregar la variable de entorno prod
// En la consola ejecutar: export NODE_ENV=prod
// para eliminar la variable de entorno: unset NODE_ENV