const Proyectos = require('../models/Proyectos');
const slug = require('slug');
exports.proyectosHome = async (req,res) =>{
    const proyectos = await Proyectos.findAll(); 
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = (req,res) =>{
    res.render('nuevoProyecto', {
    nombrePagina: 'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = async(req, res) =>{
    //Validar que tengamos algo en el input
    const {nombre} = req.body;
    let errores = []
    if(!nombre){
        errores.push({'texto': 'Agrega un Nombre al Proyecto'})
    }
    if(errores.length > 0 ){
        res.render('nuevoProyecto', {
            nombrePagina : 'Nuevo Proyecto',
            errores
        })
    }else { 
        //Insertar en la base de datos
        //const url = slug(nombre).toLowerCase();
        const proyecto = await Proyectos.create({nombre});
       res.redirect('/');
    }
}