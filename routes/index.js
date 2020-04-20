const express = require('express');
const router = express.Router();
//Importar express validator
const {body} = require('express-validator/check');
//importar el controlador
const proyectoController = require ('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
module.exports = function(){
    router.get('/',
    authController.usuarioAutenticado,
    proyectoController.proyectosHome);
    router.get('/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectoController.formularioProyecto);
    router.post('/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectoController.nuevoProyecto);
    router.post('/nuevo-proyecto/:id',
    authController.usuarioAutenticado,
    proyectoController.actualizarProyecto);

    //Litar proyecto
    router.get('/proyectos/:url', 
    authController.usuarioAutenticado,
    proyectoController.proyectoPorUrl);
    router.get('/proyecto/editar/:id',
    authController.usuarioAutenticado,
    proyectoController.formularioEditar);

    //Eliminar Proyecto
    router.delete('/proyectos/:url', 
    authController.usuarioAutenticado,
    proyectoController.eliminarProyecto);

    //Tareas
    router.post('/proyectos/:url', 
    authController.usuarioAutenticado,
    tareasController.agregarTarea);
    //Actualizar tarea
    router.patch('/tareas/:id', 
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea);
    //Eliminar Tarea
    router.delete('/tareas/:id', tareasController.eliminarTarea); 

    //Crear nueva cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //Iniciar sesión
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //Cerrar Sesión
    router.get('/cerrar-sesion', authController.cerrarSesion);
    return router;
}