const passport = require('passport');
const Usuarios = require('../models/Usuarios'); 
const Sequelize = require('sequelize');
const crypto = require('crypto');  
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

//Funcion para revisar si el usuario esta logueado o no 
exports.usuarioAutenticado = (req, res, next) =>{
    //Si el usuario esta autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/iniciar-sesion');
}

//Funcion para cerrar sesion 

exports.cerrarSesion = (req, res) =>{
    req.session.destroy(() =>{
        res.redirect('/iniciar-sesion');
    })
}
//Genera un token si el usuario es valido
exports.enviarToken = async(req, res) => {
    const usuario = await Usuarios.findOne({where: {email: req.body.email}});

    //Si no existe el usuario
    if(!usuario){
        req.flash('error', 'No existe el usuario');
        res.redirect('/reestablecer');
        }
    
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;
    await usuario.save();
    
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
}

exports.validarToken = async(req, res) => {
    const usuario = await Usuarios.findOne({where: { token: req.params.token}});

    //Si no encuentra el usuario
    if(!usuario){
        req.flash('error', 'No Valido');
        res.redirect('/reestablecer');
    }

   // Formulario para generar el password
    res.render('resetPassword', {
        nombrePagina: 'Reestablecer Password'
    })
    console.log(usuario);
}

//Actualizar password 
exports.actualizarPassword = async(req, res) => {
    const usuario = await Usuarios.findOne({where: {
        token: req.params.token,
        expiracion: {
            [Op.gte] : Date.now()
        }
    }});
    if(!usuario){
        req.flash('error', 'No valido');
        res.redirect('/reestablecer');
    }

    //Hashear Password
    usuario.token = null;
    usuario.expiracion = null;
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));    
    await usuario.save();
    req.flash('correcto', 'Tu passwrod se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
}