//Rutas con MOCK
// POST /api/usuarios/popular?cant=n default 50
//GET /api/usuarios/:id? uno o todos los mocks
//POST /api/usuarios incorpora mock
//PUT /api/usuarios/:id
//DELETE /api/usuarios/:id

import express from 'express';
import UsuariosRouter from './router/usuarios.js' //importo la clase que va a definir las rutas

const app = express();

app.use(express.json()); //Le indico que voy a utilizar json

app.use('/api/usuarios', new UsuariosRouter())

const PORT = 8080
app.listen(PORT, () => {
    console.log('servidor escuchando')
});