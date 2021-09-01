const path = require('path')
const express = require('express')
const mantenimientos = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

var pdfName = ""

const Mantenimientos = require('../Models/Mantenimientos.js')
mantenimientos.use(cors())

process.env.SECRET_KEY = 'secret'

mantenimientos.post('/mantenimientos',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		EmpresaOperadora: req.body.EmpresaOperadora,
		NumeroEconomico: req.body.NumeroEconomico,
		Dia: req.body.Dia,
		Mes: req.body.Mes,
		Año: req.body.Año,
		TipoMantenimiento: req.body.TipoMantenimiento,
		LecturaOdometroAnterior: req.body.LecturaOdometroAnterior,
		LecturaOdometro: req.body.LecturaOdometro,
		Observaciones: req.body.Observaciones
	}
	Mantenimientos.findOne({
        where: { 
				NumeroEconomico: req.body.NumeroEconomico,
				Mes: req.body.Mes,
				Año: req.body.Año
        }
    })
    .then(mantenimientos => {
        if (!mantenimientos) {
            Mantenimientos.create(formData)
            .then(mantenimientos => {
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

module.exports = mantenimientos
