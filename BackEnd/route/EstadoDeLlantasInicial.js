const path = require('path')
const express = require('express')
const estadodellantasi = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

const Estadodellantas = require('../Models/EstadoDeLlantasInicial.js')
estadodellantasi.use(cors())

process.env.SECRET_KEY = 'secret'

estadodellantasi.post('/estadodellantasi',async (req, res) => {
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
    .then(estadodellantasi => {
        if (!estadodellantasi) {
            Estadodellantas.create(formData)
            .then(estadodellantasi => {
                console.log("Registrado.")
                res.send({ status: 'Registrado!' })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        } else {
            res.json({ error: 'El numero economico ya existe' })
        }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = estadodellantasi