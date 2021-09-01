const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'EstadoDeLlantasFinales',
	{
		NumeroEconomico: {
			type: Sequelize.STRING,
            primaryKey: true  
		},
		Mes:{
			type: Sequelize.STRING
		},
		Año:{
			type: Sequelize.STRING
		},
		NumerodeLlanta: {
			type: Sequelize.INTEGER,
            primaryKey: true  
		},
		Eje: {
			type: Sequelize.INTEGER
		},
		Profundidad: {
			type: Sequelize.INTEGER
		},
		Presion: {
			type: Sequelize.INTEGER
		}
	},
	{
		timestamps: false
	}
)