const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'Fallos',
	{
		NumeroEconomico: {
			primaryKey: true,
			type: Sequelize.STRING
		},		
		Codigo: {
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		Elemento: {
			type: Sequelize.STRING
		},
		Detalle: {
			type: Sequelize.STRING
		},
		Ubicaciones: {
			type: Sequelize.STRING
		},
		Observaciones: {
			type: Sequelize.STRING
		},
		Fecha: {
			primaryKey: true,
			type: Sequelize.DATE
		},
		Estatus: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)