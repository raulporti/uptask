const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');
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
        //Crear una URL para confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //Crear el objeto de usuario
        const usuario = {
            email
        }
        //Enviar Email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu Cuenta Uptask',
            confirmarUrl,
            archivo: 'confirmarCuenta.pug'
        });
        //Redirigir al usuario
        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');
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

exports.confirmarCuenta = async(req, res) =>{
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });
    //Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No Valido');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Cuenta Activada Correctamente');
    res.redirect('/iniciar-sesion');
}