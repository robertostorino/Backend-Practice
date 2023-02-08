
/** Si tengo un solo archivo .env
 * 
 *  import dotenv from 'dotenv';
 *  dotenv.config();
 * */ 

/**
 * Si tengo varios archivos .env -> Utilizo el path para seleccionarlo.
 */
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
    path: path.resolve('./prod.env')
})

const modo = process.env.MODE ?? 'prod'
const puerto = process.env.PORT ?? 0
const debug = process.env.DEBUG == 'true' ? true : false

console.log({
    modo,
    puerto,
    debug
})


/**
 *  Dotenv es una librería de Node que carga variables de entorno desde un archivo .env a process.env.
 * 
 * 1) npm i dotenv
 * 2) crear el archivo .env con las variables de entorno que queremos definir
 * 3) crear el archivo config.js
 * 
 * Dotenv nos permite cargar a través del método config() y el objeto path, el archivo .env que necesite de acuerdo al entorno deseado.
 */
 

/*
Las variables de entorno son variables externas a nuestra aplicación que residen en el sistema operativo
o en el contenedor de la aplicación que se está ejecutando.
Una variable de entorno es simplemente un nombre asignado a un valor.
Permiten administrar la configuración de nuestras aplicaciones por separado de nuestro código base.

++ Las configuraciones separadas facilitan la implementación de nuestra aplicación en diferentes entornos
        (desarrollo, test, producción, etc).

++ Por convención, el nombre se escrube en mayúsculas y los valores son cadenas de texto -> PORT=8080

>> Datos que cambian según el entorno en el que se ejecuta la aplicaicón deben configurarse como variables de entorno.
 ej:
    - Dirección y puerto HTTP
    - Credenciales de Base de Datos
    - Ubicación de archivos y carpetas estáticos
    - Credenciales de API's externas

>>>> MODO DE USO:
    En mi proyecto creo un archivo llamado config.js que centralizará las variables de entorno
*/