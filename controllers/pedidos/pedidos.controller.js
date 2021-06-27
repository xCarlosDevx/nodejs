const { pedidos } = require('../../config/database')
const { validationResult } = require('express-validator')

exports.createPedidos = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() })
    }

    try {
        const {
            imagen,
            producto,
            id_producto,
            precio,
            id_user,
            direccion_pedido,
            fecha_pedido,
            sub_total,
            total
        } = req.body;
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server error" })
    }
}