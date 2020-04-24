const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia al modelo donde vamos a autenticar

const Usuarios = require('../models/Usuarios');

//Local Strategy - Login con credenciales propios (usuario y password)
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) =>{
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email: email,
                        activo: 1
                    }
                });
                //El usuario existe pero el password es incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'Password Incorrecto'
                    })  
                }
                return done(null, usuario);
            } catch (error) {
                //El usuario no existe
                return done(null, false, {
                    message: 'Esa Cuenta no Existe'
                })
            }    
        }
    )
);
//Serializar el usuario
passport.serializeUser((usuario, callback)=>{
    callback(null, usuario);       
})

//Deserializar el usuario
passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario);
})

//Exportar

module.exports = passport;