const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'PruebasDeDesempeños',
	{
		NumeroEconomico: {
			type: Sequelize.STRING,
            primaryKey: true     
		},
		NombredeEmpresaOperadora: {
			type: Sequelize.STRING
		},
		Mes:{
			type: Sequelize.STRING
		},
		Año:{
			type: Sequelize.STRING
		},
		Ruta: {
			type: Sequelize.STRING
		},
		Fecha: {
			type: Sequelize.STRING
		},
		NombredeEncargado: {
			type: Sequelize.STRING
		},
		NombredeRevision: {
			type: Sequelize.STRING
		},
		NombreVistoBueno: {
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
)