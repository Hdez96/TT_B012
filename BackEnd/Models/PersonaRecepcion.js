const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'PersonaRecepcion',
	{		
		NumeroEconomico: {
			primaryKey: true,
			type: Sequelize.STRING
		},
		Nombre: {
			type: Sequelize.STRING
		},
		Cargo: {
			type: Sequelize.STRING
		},
		Fecha: {
			primaryKey: true,
			type: Sequelize.DATE
		},
		Hora: {
			type: Sequelize.STRING
		},
		Firma: {
			type: Sequelize.STRING
		},
	},
	{
		timestamps: false,
		freezeTableName: true
	}
)