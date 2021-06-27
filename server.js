const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// Extenciones de NodeJS //
const db = require('./config/database')
const PORT = process.env.PORT || 3000;
// Informacion de la Base de datos y nombre del puerto a usar //

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static('public'))

/* Rutas*/
app.use('/api/usuarios', require('./routes/user/user.routes'))
app.use('/api/verificacion', require('./routes/auth/auth.routes'))

const Role = db.Roles;
const ROLES = db.ROLES

db.connectionDB.sync().then(() => {
    console.log("Re-Sync Database");
    initial();
})
app.listen(PORT, () => {
    console.log(`API Running in port: ${PORT}`)
})

function initial() {
    for (let i = 0; i < ROLES.length; i++) {
        Role.findOne({
            where: {
                name: ROLES[i]
            }
        }).then((roles) => {
            if (!roles) {
                Role.create({
                    name: ROLES[i]
                })
            }
        })
    }
}