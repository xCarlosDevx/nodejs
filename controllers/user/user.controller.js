const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const { validationResult } = require('express-validator');
const { User, Roles } = require('../../config/database');
const _ = require('lodash')
exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() })
    }
    try {
        const { nombre, apellido, email, password, role } = req.body;
// Await espera a una promesa y solo puede ser usada dentro de una funcion Sync //
// User = tabla usuarios, FindOne buscara a un usuario donde el email sea indentico //
        const findUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (findUser) {
            return res.status(400).json({ status: "error", msg: "Este usuario existe en la base de datos" })
        }
        let genSalt = bcrypt.genSaltSync(8)

        await User.create({
            nombre,
            apellido,
            email,
// Contrase;a encriptada //
            password: bcrypt.hashSync(password, genSalt)
        }).then((user) => {
            if (role) {
                Roles.findOne({
                    where: {
                        name: role
                    }
                }).then((roles) => {
                    user.setRoles(roles).then(() => {
                        return res.send({ status: "success", msg: "El usuario ha sido registrado" })
                    })
                })
            } else {
                user.setRoles(2).then(() => {
                    res.send({ status: "success", msg: "El usuario ha sido registrado" })
                })
            }
        })
        return res.status(201).json({ status: "success", msg: 'El usuario ha sido creado' })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: "error", msg: 'Server error' })
    }
}

exports.signin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() })
    }
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (!findUser) {
            return res.status(404).json({ msg: 'Este usuario no existe en la base de datos' })
        }
        const comparePassword = bcrypt.compareSync(password, findUser.password)
        if (!comparePassword) {
            return res.status(400).json({ msg: 'usuario o clave incorrecta' })
        }
        const payload = {
            user: {
                id: findUser.id
            }
        }
        const user = _.pick(findUser, ['nombre', 'apellido', 'email', 'role', 'id'])
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 86400 }, (err, token) => {
            if (err) throw err;
            findUser.getRoles().then((roles)=>{
                res.json({ user: user, role: roles[0].name.toUpperCase(), token: token })
            })
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: 'Server error' })
    }
}




