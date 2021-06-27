const { DataTypes } = require('sequelize');
module.exports = (connectionDB) => {
    const Role = connectionDB.define(/*Nombre de la tabla*/"roles", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        }
    })
    return Role;
}