import express from 'express'
import { faker } from '@faker-js/faker'
faker.locale = 'en' //Seteo el idio de la libreria faker

const app = express()

// Para testear:  GET   http://localhost:8080/test?cant=30
app.get('/test', (req, res) => {
    
    const cant = Number(req.query.cant) || 10
    const objs = []

    for (let i = 0; i < cant; i++) {
        objs.push(getUser(i+1))
    }

    res.json(objs)
})

// function getUser(id) {
//     return {
//         id: id,
//         nombre: faker.name.firstName(),
//         apellido: faker.name.lastName(),
//         color: faker.color.human(),
//         imagen: faker.image.cats()
//     }
// }

//  Asigna un nombre según el sexo
//  El mail es único y se construye a partir del nombre y apellido.
//  El mail al ser único se puede usar como id
function getUser(id) {
    const sexo = faker.name.sexType();
    const nombre = faker.name.firstName(sexo);
    const apellido = faker.name.lastName();
    const email = faker.helpers.unique(faker.internet.email, [
        nombre,
        apellido,
    ])
    ;

    return {
        id: id,
        sexo,
        nombre,
        apellido,
        email,
        color: faker.color.human(),
        ip: faker.internet.ipv4(),
        imagen: faker.image.nature(),
    }
}

const PORT = 8080

app.listen(PORT, () => {
    console.log('servidor escuchando')
})