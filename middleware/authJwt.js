const jwt = require('jsonwebtoken');
const config = require('config')
const { User, Roles } = require('../config/database');
const _ = require('lodash');

exports.verifyToken = (req, res, next) => {
    return new Promise((resolve, reject) => {
        const token = req.header('x-auth-token')
        if (!token) {
            return reject("vovo", false);
        }
        jwt.verify(token, config.get('jwtSecret'), (err, decoded) => {
            if (err) {
                return reject(err)
            }
            req.userId = decoded.user.id;
            next();
        })
        User.findByPk(req.userId).then((user) => {
            res.locals.user = user;
            const userResolve = _.pick(user, ['email', 'nombre', 'apellido', 'roles', 'id'])
            console.log(userResolve)
            return resolve(userResolve)
        })
    })
}
exports.isAdmin = (req, res, next) => {
    verifyToken(req, res, next).then((user) => {
        user.getRoles().then(roles => {
            for (role of roles) {
                if (role.name === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({ msg: "Requiere rol admin" })
            return;
        })
    })
}

