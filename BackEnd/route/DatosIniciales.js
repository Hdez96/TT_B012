const path = require('path')
const express = require('express')
const datosiniciales = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

const Datosiniciales = require('../Models/DatosIniciales.js')
datosiniciales.use(cors())

process.env.SECRET_KEY = 'secret'

datosiniciales.post('/datosiniciales',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
        Mes: req.body.Mes,
        Año: req.body.Año,
		Hora: req.body.Hora,
		Kilometraje: req.body.Kilometraje,
		Rendimiento: req.body.Rendimiento,
		Temperatura: req.body.Temperatura,
		NiveldeDiesel: req.body.NiveldeDiesel,
		CodigosActivos: req.body.CodigosActivos,
	}
	Datosiniciales.findOne({
        where: { 
          NumeroEconomico: req.body.NumeroEconomico
        }
    })
    .then(datosiniciales => {
        if (!datosiniciales) {
            Datosiniciales.create(formData)
            .then(datosiniciales => {
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

module.exports = datosiniciales
