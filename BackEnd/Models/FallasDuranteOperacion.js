const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'FallasDuranteOperaciones',
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
		Falla: {
			type: Sequelize.STRING
		},
	},
	{
		timestamps: false
	}
)