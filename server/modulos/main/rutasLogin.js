const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const Usuario = require('./models/usuario');

const app = express();



app.post('/login', (req, res) => {

    let body = req.body;

    if (!body.password || !body.usuario) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario y/o contraseña requeridos.'
            }
        });
    };

    Usuario.findOne({ usuario: body.usuario }, (err, usuarioDB) => {

        if (err) {
            return res.json({
                ok: false,
                err
            }).status(500);
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contraseña incorrectos.'
                }
            });
        };

        if (usuarioDB.estado === false) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario desactivado. \nComuníquese con un administrador.'
                }
            });
        };

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contraseña incorrectos.'
                }
            });
        };

        // Actualizar lastLogin
        Usuario.findOneAndUpdate({ usuario: body.usuario }, { lastLogin: new Date() }, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

            res.json({
                ok: true,
                usuario: usuarioDB,
                token
            });

        })

    });

});


module.exports = app;