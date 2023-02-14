/**
 * Definimos 6 niveles de salida: Trace, Debug, Info, Warn, Error, Fatal.
● Los niveles que se imprimen, son desde el especificado en la configuración
de categorías para abajo. Por ejemplo, si el nivel configurado es Warn, se
imprimirá solo Warn, Error y Fatal.
● La ventaja de esto es que en un entorno de producción podemos solo
preocuparnos por las excepciones y errores y no por la información de
depuración.
● Otra ventaja es que el código se puede mezclar con varios códigos de
impresión de registros. Siempre que modifiquemos el nivel de salida en un
archivo de configuración, la salida del registro cambiará sin modificar todo el
código.
 */

import log4js from 'log4js'

log4js.configure({
    appenders: {
        consola: { type: 'console' },
        archivoDebug: { type: 'file', filename: 'debug.log' },
        archivoErrores: { type: 'file', filename: 'errores.log' },
        // filtros
        loggerConsola: {
            type: 'logLevelFilter',
            appender: 'consola',
            level: 'info'
        },
        loggerArchivoDebug: {
            type: 'logLevelFilter',
            appender: 'archivoDebug',
            level: 'debug'
        },
        loggerArchivoErrores: {
            type: 'logLevelFilter',
            appender: 'archivoErrores',
            level: 'error'
        }
    },
    categories: {
        default: {
            appenders: ['loggerConsola'],
            level: 'all'
        },
        prod : {
            appenders: ['loggerArchivoDebug', 'loggerArchivoErrores'],
            level: 'all'
        }
    }
})

let logger = log4js.getLogger()
if (process.env.NODE_ENV == 'prod') {
    logger = log4js.getLogger('prod')
}

export default logger