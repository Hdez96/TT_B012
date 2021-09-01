const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
	'Estatus',
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
		Lugar: {
			type: Sequelize.STRING
		},
		TiempoReal:{
			type:Sequelize.STRING
		},
		PresiondeAceitedeMotor: {
			type: Sequelize.STRING
		},
		PresiondeAire: {
			type: Sequelize.STRING
		},
		TemperaturaParcial: {
			type: Sequelize.STRING
		},
		Voltaje: {
			type: Sequelize.STRING
		},
		Velocidad1a2: {
			type: Sequelize.STRING
		},
		Velocidad2a3: {
			type: Sequelize.STRING
		},
		Velocidad3a4: {
			type: Sequelize.STRING
		},
		Velocidad4a5: {
			type: Sequelize.STRING
		},
		Velocidad5a6: {
			type: Sequelize.STRING
		},
		FrenadoBrusco: {
			type: Sequelize.STRING
		},
		NumerodeActivacionalPedaldeFreno: {
			type: Sequelize.STRING
		},
		PorcentajePasajeros: {
			type: Sequelize.STRING
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
)
