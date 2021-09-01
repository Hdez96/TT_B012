const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'Codigos_REFFAs',
    {
        Codigo: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        Descripcion: {
            type: Sequelize.STRING
        },
        Localizacion: {
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

