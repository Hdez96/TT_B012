const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'Fotos',
	{
		NumeroEconomico: {
			primaryKey: true,
			type: Sequelize.STRING
		},
		Foto: {
			type: Sequelize.BLOB('long')
		},
		Codigo: {
			primaryKey: true,
			type: Sequelize.STRING
		},
		Fecha: {
			type: Sequelize.DATE
		}
	},
	{
		timestamps: false
	}
)