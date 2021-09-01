const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'RevTecInicials',
    {
        RevTecInID : {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        Economico : {
            type: Sequelize.STRING,
            primaryKey: true
        },
        Observaciones : {
            type: Sequelize.STRING
        },
        Fecha : {
            type: Sequelize.STRING
        },
        Elabora : {
            type: Sequelize.STRING
        },
        EmpresaOperadora : {
            type: Sequelize.STRING
        },
        Año: {
            type: Sequelize.STRING
        }, 
        MotorElectrico : {
            type: Sequelize.STRING
        },
        Carroceria: {
            type: Sequelize.STRING
        },
        LecturaOdometro: {
            type: Sequelize.STRING
        },
        Modelo: {
            type: Sequelize.STRING
        },
        Motor: {
            type: Sequelize.STRING
        },
        Chasis : {
            type: Sequelize.STRING
        },
        Transmision: {
            type: Sequelize.STRING
        },
        Tipo: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
