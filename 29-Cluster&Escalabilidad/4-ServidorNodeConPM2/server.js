/**
 * Poner en marcha dos servidores (con el formato del primer ejercicio: sin cluster)
utilizando PM2.

Uno de los servidores escuchará en el puerto 8081 y se ejecutará en modo 'fork'.
El otro lo hará en el puerto 8082 y se ejecutará en modo 'cluster'.

*Generar un request a cada uno de ellos comprobando que respondan adecuadamente.

*Verificar en el sistema operativo la cantidad de procesos levantados y analizar el porqué.

*Finalizar por sistema operativo el proceso de cada uno de estos servidores (fork y cluster),
comprobando que PM2 los ponga en marcha nuevamente (tendrían que iniciar con un nuevo pid).

*Con PM2 listar todos los servidores activos y e ir finalizando los procesos (por id y por name),
verificando en el sistema operativo, para cada operación, los procesos activos de node.

 */

/**
 * PM2 es un Process Manager
 * simplificalas aplicaciones de Node para ejecutarlas como cluster.
 * 
 * Es decir, podemos escribir la app sin pensar en el cluster, y luego PM2 se encarga de crear un número
 * dado de worker processes para ejecutar la aplicación
 * 
 * Ventaja sobre el módulo forever: el cluster está embebido en este módulo
 */

// modo fork

// pm2 start server.js --name serverModoFork --watch -- 8081

// modo cluster (se agrega el -i)

// pm2 start server.js --name serverModoCluster -i max --watch -- 8082
// al poner max utiliza la máxima cantidad de núcleos que tengamos

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
 * instalo: npm i -g pm2
 * 
 * inicio: pm2 start server.js
 * 
 * Iniciar ejecución MODO FORK o MODO CLUSTER
 * 
 * Modo Fork:  pm2 start server.js --name serverModoFork --watch -- 8081
 * 
 * Modo Cluster: pm2 start server.js --name serverModoCluster -i max --watch -- 8082
 * 
 * Listar todas las app que están ejecutando: pm2 list
 * 
 * Detener app de la lista: pm2 stop <app_name|namespace|id|'all'|json_conf>
 * 
 * Reiniciar app de la lista: pm2 restart <app_name|namespace|id|'all'|json_conf>
 * 
 * Eliminar app de la lista: pm2 delete <app_name|namespace|id|'all'|json_conf>
 * 
 * Obtener detalle de la app: pm2 describe <id|app_name>
 * 
 * monitorear sus logs, métricas e info: pm2 monit
 * 
 * consultar logs: pm2 logs
 * 
 * hacer flush de la log: pm2 flush
 * 
 * comandos disponibles: pm2 --help
 * 
 * 
 *  Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io/
 */