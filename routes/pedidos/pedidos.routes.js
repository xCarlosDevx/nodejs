const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const auth = require('../../middleware/authJwt');
const controller = require('../../controllers/pedidos/pedidos.controller');

console.log(auth.verifyToken)
router
  .route('/')
  .post(
    [
      auth.verifyToken,
      [
        check('pedidos', 'pedidos es obligatorio').not().isEmpty(),
        check('direccion', 'la direccion es obligatorio').not().isEmpty(),
      ],
    ],
    controller.createPedidos
  );

module.exports = router;
