import express from 'express';
import { engine as exphbs } from 'express-handlebars';
import session from 'express-session';
/////////////////////////////////////////////////////
import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'

// Para que se puedan utilizar las rutas absolutas al guardar archivos
import { fileURLToPath } from 'url'
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//--------------------------------//
// Acceso a API de Twitter
//--------------------------------//

const API_KEY = "5GMoZuic4d3x1P7XOUMtHZpug"
const API_SECRET = "fRYkYHJQgJlZybiT0QsCUBjr7p9qIOvAbzzBtwYvRYyDmULmEg"

/////////////////////////////////////////////////////
// Al ser para Twitter únicamente, entonces lo definimos sin ninguna key
passport.use(new TwitterStrategy({
    consumerKey: API_KEY,
    consumerSecret: API_SECRET,
    callbackURL: '/auth/twitter/callback'
}, (token, tokenSecret, userProfile, done) => {
    console.log(userProfile);
    done(null, userProfile)
}));


passport.serializeUser(( user, done ) => {
    done( null, user )
});

passport.deserializeUser(( user, done ) => {
    done( null, user)
});

//---------------------------------------

const app = express();

// Configuración de Session
app.use(session({
    secret: 'secretshhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Configuración de handlebars
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//--------------------------------//
// Rutas: Raíz
//--------------------------------//
// La función isAuthenticated ya viene con el Session
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/datos')
    } else {
        res.redirect('/login')
    }
});

//--------------------------------//
// Rutas: login
//--------------------------------//
app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/datos')
    }

    res.sendFile(__dirname + '/public/login.html')
});

//--------------------------------//
// Rutas: Fail login
//--------------------------------//
app.get('/faillogin', (req, res) => {
    res.render('login-error')
});

//--------------------------------//
// Rutas: Auth de Twitter
//--------------------------------//
// Con passport.authenticate('twitter'), le estoy indicando que vaya a Twitter a autenticar
app.get('/auth/twitter', passport.authenticate('twitter'));

//--------------------------------//
// Rutas: callback de Twitter
//--------------------------------//
// Con el callback para recibir la información de la autenticación en Twitter
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/faillogin'
}));

//--------------------------------//
// Rutas: Datos
//--------------------------------//
app.get('/datos', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/')
    }

    if (!req.user.contador) {
        req.user.contador = 0
    }

    req.user.contador++

    res.render('datos', {
        nombre: req.user.displayName,
        username: req.user.username,
        foto: req.user.photos[0].value,
        contador: req.user.contador
    })
});

//--------------------------------//
// Rutas: Logout
//--------------------------------//
// Al hacer logout, me redirige al raíz
app.get('/logout', (req, res) => {
    req.logout(err => {
        res.redirect('/')
    })
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log('server escuchando en http://localhost:'+PORT)
});