const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const slug = require('slug');
exports.proyectosHome = async (req,res) =>{
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}}); 
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = async (req,res) =>{
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}});  
    res.render('nuevoProyecto', {
    nombrePagina: 'Nuevo Proyecto',
    proyectos
    });
}

exports.nuevoProyecto = async(req, res) =>{
    //Validar que tengamos algo en el input
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}}); 
    
    const {nombre} = req.body;
    let errores = []
    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }
    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else { 
        //Insertar en la base de datos
        //const url = slug(nombre).toLowerCase();
        const usuarioId = res.locals.usuario.id;
        const proyecto = await Proyectos.create({nombre, usuarioId});
       res.redirect('/');
    }
}

exports.proyectoPorUrl = async(req, res, next)=>{
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}}); 
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });
    if(!proyecto) return next();
    
    //Consultar tareas de proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId : proyecto.id
        }
    });
    //REnder a la vista
    res.render('tareas', {
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async(req, res)=>{
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}}); 
    const proyectoPromise =  Proyectos.findOne({
        where: {
        id: req.params.id
        }
    });
    const [proyecto]= await Promise.all([ proyectoPromise]);
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}
exports.actualizarProyecto = async(req, res) =>{
    //Validar que tengamos algo en el input
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: {usuarioId}});   
    const {nombre} = req.body;
    let errores = []
    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }
    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else { 
        //Insertar en la base de datos
        //const url = slug(nombre).toLowerCase();
         await Proyectos.update(
             {nombre: nombre},
             {where: {id: req.params.id}}
             );
       res.redirect('/');
    }
}

exports.eliminarProyecto = async(req, res, next) =>{
    const {urlProyecto} = req.query;
    const resultado = await Proyectos.destroy({where: {url: urlProyecto}});  

    if(!resultado){
        return next();
    }
    res.send('Proyecto Eliminado Correctamente');
}