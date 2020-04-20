const passport = require('passport');

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