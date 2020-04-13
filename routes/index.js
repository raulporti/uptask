const express = require('express');
const router = express.Router();
//importar el controlador
const proyectoController = require ('../controllers/proyectosController');
module.exports = function(){
    router.get('/', proyectoController.proyectosHome);
    router.get('/nuevo-proyecto', proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectoController.nuevoProyecto);
    return router;
}