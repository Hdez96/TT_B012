const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'ConsumoEmpresas',
    {
        NumeroEconomico: {
            type: Sequelize.STRING,
            primaryKey: true,            
        },
	Mes: {
		type: Sequelize.STRING
	},
        KilometrajePorMes:{
            type: Sequelize.INTEGER
        },
        RendimientoDiesel: {
            type: Sequelize.STRING,
        },
        RendimientoAdblue: {
            type: Sequelize.STRING
        },
        ConsumoMensualDiesel: {
            type: Sequelize.STRING
        },
        ConsumoMensualAdblue: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
