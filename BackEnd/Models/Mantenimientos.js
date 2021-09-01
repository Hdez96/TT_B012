const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'Mantenimientos',
	{
		EmpresaOperadora:{
			type: Sequelize.STRING
		},
		NumeroEconomico: {
			type: Sequelize.STRING,
	            primaryKey: true        
		},
		Dia: {
			type: Sequelize.INTEGER
		},
		Mes: {
			type: Sequelize.STRING
		},
		Año: {
			type: Sequelize.INTEGER
		},
		TipoMantenimiento: {
			type: Sequelize.STRING
		},
		LecturaOdometroAnterior: {
			type: Sequelize.DOUBLE
		},
		LecturaOdometro: {
			type: Sequelize.DOUBLE
		},
		Observaciones: {
			type: Sequelize.STRING
		},
	},
	{
		timestamps: false
	}
)
