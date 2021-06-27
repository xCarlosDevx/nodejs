const { DataTypes } = require('sequelize')
module.exports = (connectionDB) => {
    const Pedido = connectionDB.define( /*Nombre de la tabla =>*/ "pedidos", {
        /*Atributos*/
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        producto: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        id_producto: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        precio: {
            type: DataTypes.STRING,
            notNull: false,
            notEmpty: true
        },
          cantidad: {
            type: DataTypes.STRING,
            notNull: false,
            notEmpty: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        direccion_pedido: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        fecha_pedido: {
            type: DataTypes.DATE,
            allowNull: false,
            notEmpty: true
        },
        sub_total: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        total: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false,
        }
    })
    return Pedido;
}
