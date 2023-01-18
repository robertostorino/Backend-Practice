// npm i connect-mongo

import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
    /* ----------------------------- */
    /*  Persistencia por MongoDB     */
    /* ----------------------------- */
import MongoStore from 'connect-mongo'

const app = express();
app.use(cookieParser());
app.use(session({
    /* ----------------------------- */
    /*  Persistencia por MongoDB     */
    /* ----------------------------- */
    store: MongoStore.create({
       mongoUrl: 'monogodb://localhost/sesiones' }),
    /* -------------------------------- */

    secret: "Samurai!",
    resave: false,
    saveUninitialized: false /**
    cookie: {
        maxAge. 40000
    } */
}))

app.get('/', (req,res)=>{
  if(!req.session.contador){
    req.session.contador = 1
    req.session.nombre = req.query.nombre || "Anakin"
    res.send("Hello there " + req.session.nombre)
  } else {
    req.session.contador++
    res.send("Hello there " + req.session.nombre + " you have visited the page " + req.session.contador + " times.")
  }
})

// aca crea tu olvidar
app.get("/olvidar", (req, res) => {
    const nombre = req.session.nombre || ""
  req.session.destroy( err => {
    if (err){
      res.json({error: "algo hiciste mal", descripcion: err})
    } else {
      res.json({respuesta: "Hasta luego " + nombre}) 
    }
  })
})


const PORT = 8082

app.listen(PORT, () => {console.log("escuchando en el 8081")})
 