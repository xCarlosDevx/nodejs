const { Pedidos } = require('../../config/database');
const { validationResult } = require('express-validator');
const moment = require('moment');
moment.locale('es-do');
exports.createPedidos = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  try {
    const { pedidos, direccion } = req.body;
    let id = req.userId;
    let fecha = moment().format('l');
    for (let i = 0; i < pedidos.length; i++) {
      await Pedidos.create({
        imagen: pedidos[i].imagen,
        producto: pedidos[i].titulo,
        id_producto: pedidos[i].id,
        precio: pedidos[i].precio,
        cantidad: pedidos[i].cantidad,
        id_user: id,
        direccion_pedido: direccion,
        fecha_pedido: fecha,
        sub_total: pedidos[i].precio * pedidos[i].cantidad,
      }).then((user) => {
        if (user) {
          return res.status(200).json({ msg: 'Se ha agregado la compra' });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({status: 'error', msg: 'Server error' });
  }
};
