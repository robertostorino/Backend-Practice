import ContenedorMemoria from "../contenedores/ContenedorMemoria.js";
import { generarUsuario } from "../utils/utils.js";

//Utilizo el ContenedorMemoria y la función generarUsuario

class ApiUsuariosMock extends ContenedorMemoria {
    constructor() {
        super()
    }

    //Al extender de ContenedorMemoria, puede utilizar las mismas funciones y además popular()

    popular(cant) {
        const nuevos = [];
        for (let i = 0; i < cant; i++) {
            //voy a ir generando usuarios y guardándolos en memoria
            const usuarioNuevo = generarUsuario(); //   Genera usuario con faker
            const guardado = this.guardar(usuarioNuevo); //   Utilizo la función guardar de ContenedorMemoria
            nuevos.push(guardado); // Muestra los usuarios nuevos
        }
        return nuevos;  //Devuelvo a la ruta un array de los usuarios que se guardaron
    }
}

export default ApiUsuariosMock;