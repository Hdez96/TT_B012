const path = require('path')
const express = require('express')
const fallasduranteoperacion = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

const Fallasduranteoperacion = require('../Models/FallasDuranteOperacion.js')
fallasduranteoperacion.use(cors())

process.env.SECRET_KEY = 'secret'

fallasduranteoperacion.post('/fallasduranteoperacion',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
		Mes: req.body.Mes,
		Año: req.body.Año,
		Falla: req.body.Falla,
	}
	Fallasduranteoperacion.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Mes: req.body.Mes,
            Año: req.body.Año,
            Falla: req.body.Falla
        }
    })
    .then(fallasduranteoperacion => {
        if (!fallasduranteoperacion) {
            Fallasduranteoperacion.create(formData)
            .then(fallasduranteoperacion => {
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

module.exports = fallasduranteoperacion