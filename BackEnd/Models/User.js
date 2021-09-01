const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'personas',
    {
        User_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        Nombre: {
            type: Sequelize.STRING
        },
        Apellido: {
            type: Sequelize.STRING
        },
        Foto: {
            type: Sequelize.BLOB('long')
        },
        Departamento: {
            type: Sequelize.STRING
        },
        Tipo: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        password: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: "INACTIVO"
        }
    },
    {
        timestamps: false
    }
)

