const path = require('path')
const express = require('express')
const personarecepcion = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

const Personarecepcion = require('../Models/PersonaRecepcion.js')
personarecepcion.use(cors())

process.env.SECRET_KEY = 'secret'

personarecepcion.post('/personaR',async (req, res) => {
	const today = new Date().toJSON()
    console.log(req.body)
	const formData = {		
		NumeroEconomico: req.body.NumeroEconomico,
		Nombre: req.body.Nombre,
		Cargo: req.body.Cargo,
		Fecha: req.body.Fecha,
		Hora: req.body.Hora,
		Firma: req.body.Firma
	}
	Personarecepcion.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Fecha: req.body.Fecha
        }
    })
    .then(personarecepcion => {
        if (!personarecepcion) {
            Personarecepcion.create(formData)
            .then(personarecepcion => {
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

module.exports = personarecepcion