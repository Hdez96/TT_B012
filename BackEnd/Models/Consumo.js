
const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'ConsumoCombustibles',
    {
        NumeroEconomico: {
            type: Sequelize.STRING,
            primaryKey: true,            
        },
        Mes: {
            type: Sequelize.STRING,
        },
        Año: {
            type: Sequelize.STRING
        },
        Consumo: {
            type: Sequelize.DOUBLE
        },
        Modulo: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
