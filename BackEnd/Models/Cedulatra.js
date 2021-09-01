
const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'CedulaTecnicadeRegistroAutobuses',
    {
        NumeroFactura: {
            type: Sequelize.STRING,
            primaryKey: true,            
        },
        FechaAlta: {
            type: Sequelize.STRING,
        },
        Propietario: {
            type: Sequelize.STRING
        },
        Domicilio: {
            type: Sequelize.STRING
        },
        Telefonos: {
            type: Sequelize.STRING
        },
        Responsable: {
            type: Sequelize.STRING
        },
        Marca: {
            type: Sequelize.STRING
        },
        Modelo: {
            type: Sequelize.STRING
        },
        Año: {
            type: Sequelize.STRING
        },
        NumeroMotor: {
            type: Sequelize.STRING
        },
        NumeroChasis: {
            type: Sequelize.STRING
        },
        NumeroCarroceria: {
            type: Sequelize.STRING
        },
        NumeroTransmision: {
            type: Sequelize.STRING
        },
        NumeroEconomico: {
            type: Sequelize.STRING
        },
        PlacaVehicular: {
            type: Sequelize.STRING
        },
        Observaciones: {
            type: Sequelize.STRING
        },
        Nombre: {
            type: Sequelize.STRING
        },
        FechaRegistro: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false
    }
)
