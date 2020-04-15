const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyPaser = require('body-parser');
//Helpers con algunas funciones
const helpers = require('./helpers');
//Crear la conexion a la base de datos
const db = require('./config/db');
//Importar el model
require('./models/Proyectos');
db.sync()
    .then(()=>console.log('Conectado al servidor'))
    .catch(error => console.log(error))
//Crear una app de express
const app = express();
//Donde cargar los archivos
app.use(express.static('public'));

//Pasar var dump a la aplicacion
app.use((req, res, next)=>{
    res.locals.vardump = helpers.vardump;
    next();
});
//Habilitar PUG
app.set('view engine', 'pug');

//Añadir la carpeta de vistas
app.set('views', path.join(__dirname, './views'));
//Habilitar body parser para leer datos del formulario
app.use(bodyPaser.urlencoded({extended: true}));
//Ruta para el home
app.use('/', routes());
app.listen(3000);