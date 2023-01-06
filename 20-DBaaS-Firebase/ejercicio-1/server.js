import mongoose from "mongoose";
import * as models from "./models/usuario.js"

/**
 *  en la URL, 
 *      luego de mongodb.net/   debo escribir mi base de datos. (en este caso:  myFirstDatabase)
 *  */
    
const URL = "mongodb+srv://coderhouse:coderhouse@miprimercluster.jrovqqz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

/*
    Agregado desde Mongosh (CLI)

        db.usuarios.insertMany([
            {nombre: 'Lucas', apellido: 'Blanco', dni: '30355874'},
            {nombre: 'Maria', apellido: 'Garcia', dni: '29575148'},
            {nombre: 'Tomas', apellido: 'Sierra', dni: '38654790'},
            {nombre: 'Carlos', apellido: 'Fernández', dni: '26935670'}
        ])
**/

try {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log("conectados correctamente")

    const usuarios = await models.usuarios.find()

    console.log(usuarios)

    const newusuario = new models.usuarios({
        nombre: "Federico",
        apellido: "Perez",
        dni: "12345678"
    })
    await newusuario.save()
    console.log("usuario agregado correctamente!")

} catch (error) {
    console.log(error)
} finally {
    mongoose.disconnect()
}

/*
    actualizar el usuario llamado 'Carlos' al nombre 'Juan Carlos' y luego listar los documentos finales

    Desde Mongosh (CLI)

        db.usuarios.updateOne({nombre: 'Carlos'}, {$set: {nombre: 'Juan Carlos'}})

        db.usuarios.find()

**/