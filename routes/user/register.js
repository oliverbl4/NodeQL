var UserModel = require('../../models/user');
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

/* POST login. */
router.post('/', function (req, res, next) {
    console.log("caso register");
    UserModel.findOne({emailAddress: req.body.emailAddress})
        .then(data => { //si la consulta se ejecuta
            if (data) { //si el usuario existe
                throw new error_types.InfoError("User already exists");
                return;
            }
            console.log("creando usuario");
            var hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
            let document = new UserModel({
                name: req.body.name,
                emailAddress: req.body.emailAddress || '',
                userName: req.body.userName || '',
                password: hash,
            });
            return document.save();
        })
        .then(data => { //usuario registrado con exito, pasamos al siguiente manejador
            const { emailAddress = undefined } = data || {};
            const message = emailAddress ? `You're welcome ${emailAddress}` : 'Registered successfully';
            res.json({message});
        })
        .catch(err => { //error en registro, lo pasamos al manejador de errores
            next(err);
        })
});

module.exports = router;
