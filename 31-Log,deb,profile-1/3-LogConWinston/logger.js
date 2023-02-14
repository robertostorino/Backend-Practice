/**
● Los niveles de salida definidos en Winston son: Silly, Debug, Verbose, Info, Warn, Error.
● Al igual que en Log4js, se imprime desde el nivel especificado hacia los
  niveles con mayor prioridad (los anteriores no se imprimen).
● Se puede imprimir con el siguiente código, especificando el nivel de salida y
  el mensaje que se desea imprimir.
●
 * 
 */

import winston from 'winston'

function buildDefaultLogger() {
    return winston.createLogger({
        transports: [new winston.transports.Console( { level: 'info' })]
    })
}

function buildProdLogger() {
    return winston.createLogger({
        transports: [
            new winston.transports.File( { filename: 'debug.log', level: 'debug' }),
            new winston.transports.File( { filename: 'error.log', level: 'error' })
        ]
    })
}

let logger = buildDefaultLogger()
if (process.env.NODE_ENV == 'prod') {
    logger = buildProdLogger()
}

export default logger