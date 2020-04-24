const Usuarios = require('../models/Usuarios');
exports.formCrearCuenta = (req, res) => {
res.render('crearCuenta', { 
       nombrePagina : 'Crear Cuenta en Uptask'
    });
}
exports.formIniciarSesion = (req, res) => {
   const {error} = res.locals.mensajes;
    res.render('iniciarSesion', { 
           nombrePagina : 'Iniciar Sesion en Uptask',
           error 
        });
    }
    
exports.crearCuenta = async(req, res) =>{
    //Leer los datos
    const {email, password} = req.body;
    try{
        //Crear el usuario
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion');
    }catch(error){
        req.flash('error', error.errors.map(error => error.message));
       res.render('crearCuenta', { 
            nombrePagina : 'Crear Cuenta en Uptask',
            mensajes: req.flash(),
            email,
            password
         });  
    }
}

exports.formReestablecerPassword = (req, res) =>{
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer Password'
    })
}