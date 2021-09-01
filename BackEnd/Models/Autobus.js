const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'Autobus',
    {
        NombreEmpresaOperadora: {
            type: Sequelize.STRING,
            primaryKey: true         
        },
        Año: {
            type: Sequelize.STRING,
        },
        NumeroMotorElectrico: {
            type: Sequelize.STRING
        },
        NumeroCarroceria: {
            type: Sequelize.STRING
        },
        LecturaOdometro: {
            type: Sequelize.STRING
        },
        Modelo: {
            type: Sequelize.STRING
        },
        NumeroMotor: {
            type: Sequelize.STRING
        },
        NumeroChasis: {
            type: Sequelize.STRING
        },
        NumeroTransmision: {
            type: Sequelize.STRING
        },
        TipoAutobus: {
            type: Sequelize.STRING
        },
        NumeroEconomico: {
            type: Sequelize.STRING,
            primaryKey: true       
        },
        Ruta: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
