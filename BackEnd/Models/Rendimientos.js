const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'Rendimientos',
	{
		ID_Rendimientos: {
			type: Sequelize.INTEGER,
			primaryKey: true     
		},
		NumeroEconomico: {
			type: Sequelize.STRING,
			primaryKey: true     
		},
		Kilometraje: {
			type: Sequelize.INTEGER
		},
		ConsumoDiesel: {
			type: Sequelize.STRING
		},
		RendimientoDiesel: {
			type: Sequelize.STRING
		},
		Periodo: {
			type: Sequelize.STRING,
			primaryKey: true     
		},
		Año: {
			type: Sequelize.INTEGER
		}
	},
	{
		timestamps: false
	}
)