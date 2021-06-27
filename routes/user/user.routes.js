const { Router } = require('express');
const router = Router();
const controller = require('../../controllers/user/user.controller');
const { check } = require('express-validator');

router.route('/signup').post([check('nombre', 'nombre es requerido').not().isEmpty(),
check('apellido', 'apellido es requerido').not().isEmpty(),
check('email', 'email es requerido').isEmail(),
check('password', 'la password tiene que tener 6 o mas caracteres').isLength({ min: 6 })], controller.signup)

router.route('/signin').post([check('email', 'email es requerido').isEmail(),
check('password', 'la password tiene que tener 6 o mas caracteres').isLength({ min: 6 })], controller.signin)

module.exports = router;