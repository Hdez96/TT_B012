const path = require('path')
const express = require('express')
const datosfinales = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

const Datosfinales = require('../Models/DatosFinales.js')
datosfinales.use(cors())

process.env.SECRET_KEY = 'secret'

datosfinales.post('/datosfinales',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
        Mes: req.body.Mes,
        Año: req.body.Año,
		Hora: req.body.Hora,
		Kilometraje: req.body.Kilometraje,
		Rendimiento: req.body.Rendimiento,
		NiveldeDiesel: req.body.NiveldeDiesel,
		Temperatura: req.body.Temperatura,
		CodigosActivos: req.body.CodigosActivos,
	}
	Datosfinales.findOne({
        where: { 
          NumeroEconomico: req.body.NumeroEconomico
        }
    })
    .then(datosfinales => {
        console.log(req.body.NombredeEmpresaOperadora)
        if (!datosfinales) {
            Datosfinales.create(formData)
            .then(datosfinales => {
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

module.exports = datosfinales
