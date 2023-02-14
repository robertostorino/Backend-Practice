/**
 *   Instancias de Logger
 *  ● La instancia del Logger es el objeto devuelto por la función principal de
    Pino.
    ● Su propósito principal es proveer los métodos de logging.
    ● Los métodos por default son: Trace, Debug, Info, Warn, Error y Fatal.
     Todos los métodos tienen la siguiente forma genérica:
    
         logger.method([mergingObject], [message], [...interpolationValues]).
 * 
 *  MergingObject
 * 
    Opcionalmente, se puede proporcionar un objeto como primer
    parámetro. Cada par clave valor enumerable del mergingObject se
    copia en la línea de log JSON.

    Message

    ● Se puede proporcionar opcionalmente, un string como parámetro. Por
    default, se fusiona en el log JSON, en la clave msg.
    ● Este parámetro tiene prioridad respecto al de mergingObject. Es decir, si
    mergingObject tiene un mensaje y además se especifica el parámetro
    message, el que se va a imprimir es el de message.
    ● Los string de message, pueden contener algún marcador de posición
    (placeholder). Estos son “%s” para string, “%d” para dígitos, “%0”, “%o” y
    “%j” para objetos. Los valores para estos marcadores de posición se
    proporcionan como un parámetro extra.

    InterpolationValues

    ● Todos los argumentos suministrados después del mensaje se serializan e interpolan
    de acuerdo con los marcadores de posición de estilo printf, suministrados para
    formar el valor de mensaje de salida final para la línea de log JSON.

    Los niveles de salida se imprimen con su código (30 para info y 50 para error).

 */

    /**
     * Enunciado:
     * 
     * Realizar el ejercicio anterior pero esta vez utilizando pino logger. En el caso del logger
para el entorno de producción, loguear a un único archivo ‘debug.log’, con nivel
‘debug’.
(Pino no soporta actualmente la salida en simultáneo por más de un transporte)
     * 
     */

import pino from 'pino'

function buildDefaultLogger() {
    const defaultLogger = pino() //por default va en la consola
    defaultLogger.level = 'info'
    return defaultLogger
}

function buildProdLogger() {
    const prodLogger = pino('debug.log')
    prodLogger.level = 'debug'
    return prodLogger
}

let logger = buildDefaultLogger()
if (process.env.NODE_ENV == 'prod') {
    logger = buildProdLogger()
}

export default logger