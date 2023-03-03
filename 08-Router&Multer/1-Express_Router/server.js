const express = require('express')
const { Router } = express

const app = express()

// Acepta que podamos mandar json en nuestra aplicación
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//  express.static es un Middleware
// Indico cuál es la carpeta que contiene los archivos que se podrán acceder desde afuera
// con /static estoy indicando que para acceder al recurso estatico debo poner antes /static (Es una ruta virtual, no existe)
// ej:   localhost:8080/static/index.html
// con __dirname me muestra el path absoluto donde está mi código
// ej:  D:\DesarrolloWebFullStack\Backend\pràctica\Backend-Practice\08-Router&Multer\1-Express_Router
app.use('/static', express.static(__dirname + '/public'))

const mascotas = []
const personas = []

const routerMascotas = new Router()

routerMascotas.get('/', (req, res) => {
    res.json(mascotas)
})

routerMascotas.post('/', (req, res) => {
    mascotas.push(req.body)
    res.json({ok: 'ok'})
})

const routerPersonas = new Router()

routerPersonas.get('/', (req, res) => {
    res.json(personas)
})

routerPersonas.post('/', (req, res) => {
    personas.push(req.body)
    res.json({ok: 'ok'})
})

app.use('/mascotas', routerMascotas)
app.use('/personas', routerPersonas)

const server = app.listen(8080, () => {
    console.log(__dirname)  // D:\DesarrolloWebFullStack\Backend\pràctica\Backend-Practice\08-Router&Multer\1-Express_Router
    console.log('escuchando en el 8080')
})