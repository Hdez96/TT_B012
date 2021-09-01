const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'EmpresaOperadora',
    {
        NombreEmpresaOperadora: {
            type: Sequelize.STRING,
            primaryKey: true         
        },
        Siglas: {
            type: Sequelize.STRING,
            primaryKey: true       
        },
        NumeroEconomico: {
            type: Sequelize.STRING,
            primaryKey: true       
        },
    },
    {
        timestamps: false
    }
)
