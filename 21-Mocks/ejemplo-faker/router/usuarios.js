import express from "express";
import ApiUsuariosMock from '../api/usuarios.js';

//La clase UsuariosRouter extiende/hereda de la clase express.Router
class UsuariosRouter extends express.Router {
    constructor() {
        super(); //Permite que extendamos todas las propiedades de la clase padre: express.Router

        const apiUsuarios = new ApiUsuariosMock(); //   Instancio el objeto apiUsuarios de la clase ApiUsuariosMock

        //_      Métodos de la Clase    _//

        //Utilizamos middleware, ya que no lo estamos definiendo específicamente en la ruta sino que lo va a definir el constructor
        //Cuando llame a la ruta, llamará aquí y luego 
        this.post('/popular', async (req, res, next) => {
            try {
                const cant = Number(req.query.cant) ||  50;  // cant toma el valor que le pase en la query, sino por defecto 50
                res.json( await apiUsuarios.popular(cant)); //Utilizo la función popular de ApiUsuariosMock y devuelvo en un json
            } catch (error) {
                next(error); // Si hay un error lo manda con next al middleware
            }
        });

        //GetAll
        this.get('/', async (req, res, next) => {
            try {
                res.json( await apiUsuarios.listarTodos()); //Utilizo la función listarTodos del ContenedorMemoria y devuelvo en un json
            } catch (error) {
                next(error); // Si hay un error lo manda con next al middleware
            }
        });

        //GetById
        this.get('/:id', async (req, res, next) => {
            try {
                res.json( await apiUsuarios.listar(req.params.id)); //Utilizo la función listar del ContenedorMemoria y devuelvo en un json
            } catch (error) {
                next(error); // Si hay un error lo manda con next al middleware
            }
        });

        //Post le pasamos el body que queremos actualizar y el id
        this.post('/', async (req, res, next) => {
            try {
                res.json( await apiUsuarios.guardar(req.body) ); //Le paso como 1º parámetro un objeto con el body que queremos actualizar y como 2º parámetro el id
            } catch (error) {
                next(error); // Si hay un error lo manda con next al middleware
            }
        });

        //Put recibe un id
        this.put('/:id', async (req, res, next) => {
            try {
                res.json( await apiUsuarios.actualizar({...req.body, id: req.params.id}) ); //Utilizo la función actualizar del ContenedorMemoria y devuelvo en un json
            } catch (error) {
                next(error); // Si hay un error lo manda con next al middleware
            }
        });

        //Delete le paso el id y elimina el usuario con el id correspondiente
        this.delete('/:id', async (req, res, next) => {
            try {
                res.json( await apiUsuarios.borrar(req.params.id)); //Utilizo la función listarTodos del ContenedorMemoria y devuelvo en un json
            } catch (error) {
                next(error); // Si hay un error lo manda con next al middleware
            }
        });

    }
}

export default UsuariosRouter;