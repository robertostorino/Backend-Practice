const modo = process.env.MODE ?? 'prod'
const puerto = process.env.PORT ?? 0
const debug = process.env.DEBUG == 'true' ? true : false

console.log({
    modo,
    puerto,
    debug
})

// En CMD:
// set MODE=development
// set PORT=8080
// set DEBUG=false

// comandos en cmd: 
//    set  -> Lista las variables de entorno
//    set PORT=8080  -> Setea la variable de entorno PORT
//   unset PORT      -> Remueve la variable de entorno PORT

//   ?? es lo mismo que || son un OR

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