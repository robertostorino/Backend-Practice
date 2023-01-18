// npm i connect-mongo

import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
/* ------------------------------- */
/*  Persistencia por Mongo  Atlas  */
/* ------------------------------- */
import MongoStore from 'connect-mongo'
const advancedOptions = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}
/* ------------------------------- */
const app = express();
app.use(cookieParser());
app.use(session({
    /* ------------------------------- */
    /*  Persistencia por Mongo  Atlas  */
    /* ------------------------------- */
    store: MongoStore.create({
      // En Atlas connect App: Make sure to change the node version 
      mongoUrl: 'mongodb+srv://coderhouse:coderhouse@miprimercluster.jrovqqz.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: advancedOptions
    }),
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
 