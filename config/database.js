const { Sequelize } = require('sequelize')
const config = require('config')
const Pedidos = require('../models/Pedidos');
const User = require('../models/User')
const Roles = require('../models/Roles')
const {
    username,
    password,
    dialect,
    host,
    database
} = config.get('mysql_connection')

const connectionDB = new Sequelize(database, username, password, {
    host,
    dialect,
    omitNull: true
})
connectionDB.authenticate().then(() => {
    console.log("database connected")
},
).catch((err) => {
    console.log('error', err)
})

let db = {}

db.Sequelize = Sequelize
db.connectionDB = connectionDB
db.pedidos = Pedidos(connectionDB)
db.User = User(connectionDB)
db.Roles = Roles(connectionDB)

db.Roles.belongsToMany(db.User, {
    through: "user_roles",
    foreignKey: 'roleId',
    otherKey: 'userId'
})

db.User.belongsToMany(db.Roles, {
    through: "user_roles",
    foreignKey: 'userId',
    otherKey: 'roleId'
})

db.ROLES = ['admin', 'user']

module.exports = db;

