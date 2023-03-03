// const express = require('express')
import express from 'express';
// const multer = require('multer')
import multer from 'multer';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// config multer
// SET STORAGE
// Multer ofrece varias opciones de almacenamiento, entre ellas almacenar archivos en disco "diskStorage" 
// Se guardará en la carpeta 'uploads'
// file.originalname contiene el nombre con que vino el archivo, en este caso 'miArchivo' como se ve en el index.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})

// end config multer

const router = express.Router()

router.post('/subir', upload.single('miArchivo'), (req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Error, no se subio ningun archivo')
        res.send(error)
    }
    res.send('Archivo ' + file.originalname + ' se subio correctamente')
})

app.use('/api', router)

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log('servidor escuchando en el ' + PORT)
})