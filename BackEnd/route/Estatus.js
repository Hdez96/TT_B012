const path = require('path')
const express = require('express')
const estatus = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

var pdfName = ""

const Estatus = require('../Models/Estatus.js')
estatus.use(cors())

process.env.SECRET_KEY = 'secret'

estatus.post('/estatus',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
		Mes: req.body.Mes,
		Año: req.body.Año,
		Lugar: req.body.Lugar,
		TiempoReal: req.body.TiempoReal,
		PresiondeAceitedeMotor: req.body.PresiondeAceitedeMotor,
		PresiondeAire: req.body.PresiondeAire,
		TemperaturaParcial: req.body.TemperaturaParcial,
		Voltaje: req.body.Voltaje,
		Velocidad1a2: req.body.Velocidad1a2,
		Velocidad2a3: req.body.Velocidad2a3,
		Velocidad3a4: req.body.Velocidad3a4,
		Velocidad4a5: req.body.Velocidad4a5,
		Velocidad5a6: req.body.Velocidad5a6,
		FrenadoBrusco: req.body.FrenadoBrusco,
		NumerodeActivacionalPedaldeFreno: req.body.NumerodeActivacionalPedaldeFreno,
		PorcentajePasajeros: req.body.PorcentajePasajeros,
	}
	console.log(formData)
	Estatus.findOne({
        where: { 
          NumeroEconomico: req.body.NumeroEconomico
        }
    })
    .then(estatus => {
        if (!estatus) {
            Estatus.create(formData)
            .then(estatus => {
                console.log("Registrado.")
				res.send({ status: 'Registrado!' })
            })
            .catch(err => {
            	console.log(err)
                res.send('error: ' + err)
            })
        } else {
            res.json({ error: 'El numero economico ya existe' })
        }
    })
    .catch(err => {
    	console.log(err)
      res.send('error: ' + err)
    })
})

module.exports = estatus