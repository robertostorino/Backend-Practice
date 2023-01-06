// http://localhost:8080/datos?min=10&nivel=15&max=20&titulo=<i>Medidor</i>

const express = require('express');

const app = express;

// la carpeta views debe ir en el raiz.
// sirve para guardar las plantillas que utilizará la app

app.set('views', './views'); //    Le indico que ./views será mi directorio de plantillas
app.set('view engine', 'pug'); //    Le indico que mi motor plantillas será pug

app.get('/datos', (req,res) => {
    res.render('nivel', req.query) //   pinta el html
});

app.listen(8080); //    Indico que el server está escuchando en el puerto 8080
