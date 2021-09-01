const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'EstatusPatios',
    {
        NumeroEconomico: {
            type: Sequelize.STRING,
            primaryKey: true         
        },
        Estatus: {
            type: Sequelize.INTEGER,
        },
        Sistema: {
            type: Sequelize.INTEGER
        },
        Descripciondefalla: {
            type: Sequelize.STRING
        },
        Kilometraje: {
            type: Sequelize.INTEGER
        },
        Fechadeingreso: {
            type: Sequelize.STRING
        },
        Fechadeliberacion: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
