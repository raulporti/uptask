const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyPaser = require('body-parser');
//Crear una app de express
const app = express();
//Donde cargar los archivos
app.use(express.static('public'));
//Habilitar PUG
app.set('view engine', 'pug');

//Añadir la carpeta de vistas
app.set('views', path.join(__dirname, './views'));
//Habilitar body parser para leer datos del formulario
app.use(bodyPaser.urlencoded({extended: true}));
//Ruta para el home
app.use('/', routes());
app.listen(3000);