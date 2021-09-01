const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'Kilometrajes',
    {
        NumeroEconomico: {
            type: Sequelize.STRING,
            primaryKey: true         
        },
        Kilometraje: {
            type: Sequelize.STRING,
        },
        Periodo: {
            type: Sequelize.STRING
        },
        Mes: {
            type: Sequelize.STRING
        },
        Año: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
