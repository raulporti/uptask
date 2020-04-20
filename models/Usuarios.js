const Sequelize = require('sequelize');
const db = require('../config/db');
const proyectos = require('../models/Proyectos');
const bcrypt = require('bcrypt');
const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un Correo Valido'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El Password No Puede Ir Vacio'
            }
        }
    }
}, {
    hooks: {
        beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));    
        }
    }
});
Usuarios.hasMany(proyectos);

module.exports = Usuarios;