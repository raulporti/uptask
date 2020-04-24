const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyPaser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('./config/passport');
//Helpers con algunas funciones
const helpers = require('./helpers');
//Crear la conexion a la base de datos
const db = require('./config/db');
//Importar el model
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
db.sync()
    .then(()=>console.log('Conectado al servidor'))
    .catch(error => console.log(error))
//Crear una app de express
const app = express();
//Habilitar body parser para leer datos del formulario
app.use(bodyPaser.urlencoded({extended: true}));

//Donde cargar los archivos
app.use(express.static('public'));

//Pasar var dump a la aplicacion

//Habilitar PUG
app.set('view engine', 'pug');

//Añadir la carpeta de vistas
app.set('views', path.join(__dirname, './views'));
//Agregar flash messages
app.use(flash());
app.use(cookieParser());
//Sessiones nos permiten navegar entre distintas paginas sin volve a navegar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next)=>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
});
//Ruta para el home
app.use('/', routes());
app.listen(3000);