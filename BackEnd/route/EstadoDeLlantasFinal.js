const path = require('path')
const express = require('express')
const estadodellantasf = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

const Estadodellantas = require('../Models/EstadoDeLlantasFinal.js')
estadodellantasf.use(cors())

process.env.SECRET_KEY = 'secret'

estadodellantasf.post('/estadodellantasf',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
        Mes: req.body.Mes,
        Año: req.body.Año,
		NumerodeLlanta: req.body.NumerodeLlanta,
		Eje: req.body.Eje,
		Profundidad: req.body.Profundidad,
		Presion: req.body.Presion
	}
	Estadodellantas.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Mes: req.body.Mes,
            Año: req.body.Año,
            NumerodeLlanta: req.body.NumerodeLlanta
        }
    })
    .then(estadodellantasf => {
        if (!estadodellantasf) {
            Estadodellantas.create(formData)
            .then(estadodellantasf => {
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

module.exports = estadodellantasf