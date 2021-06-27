const { DataTypes } = require('sequelize');

module.exports = (connectionDB) => {
    const User = connectionDB.define(/*Nombre de la tabla*/ "users", {
        /* Atributos */
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
            noEmpty: true
        },
        apellido:{
            type: DataTypes.STRING,
            allowNull: false,
            noEmpty: true
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            allowNull: false,
            noEmpty: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            noEmpty: true
        }
    })
    return User;
}