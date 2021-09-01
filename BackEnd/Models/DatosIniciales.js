const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'DatosIniciales',
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
		Hora: {
			type: Sequelize.STRING
		},
		Kilometraje: {
			type: Sequelize.INTEGER
		},
		Rendimiento: {
			type: Sequelize.INTEGER
		},
		NiveldeDiesel: {
                        type: Sequelize.INTEGER
                },

		Temperatura: {
			type: Sequelize.INTEGER
		},
		CodigosActivos: {
			type: Sequelize.STRING
		},
	},
	{
		timestamps: false
	}
)
