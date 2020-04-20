const express = require('express');
const router = express.Router();
//Importar express validator
const {body} = require('express-validator/check');
//importar el controlador
const proyectoController = require ('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
module.exports = function(){
    router.get('/', proyectoController.proyectosHome);
    router.get('/nuevo-proyecto', proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto',proyectoController.nuevoProyecto);
    router.post('/nuevo-proyecto/:id',proyectoController.actualizarProyecto);

    //Litar proyecto
    router.get('/proyectos/:url', proyectoController.proyectoPorUrl);
    router.get('/proyecto/editar/:id', proyectoController.formularioEditar);

    //Eliminar Proyecto
    router.delete('/proyectos/:url', proyectoController.eliminarProyecto);

    //Tareas
    router.post('/proyectos/:url', tareasController.agregarTarea);
    //Actualizar tarea
    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);
    //Eliminar Tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea); 

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);
    return router;
}