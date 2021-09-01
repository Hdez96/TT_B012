const path = require('path')
const express = require('express')
const fallos = express.Router()
const fotos = express.Router()
const reffa = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

const Fallos = require('../Models/Fallos.js')
const Fotos = require('../Models/Fotos.js')
const Reffa = require('../Models/REFFA.js')
reffa.use(cors())
fotos.use(cors())
fallos.use(cors())

process.env.SECRET_KEY = 'secret'

fallos.post('/anexoT',async (req, res) => {
	const today = new Date().toJSON()
	console.log("Crayolis")
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,		
        Estatus: req.body.Estatus,
		Codigo: req.body.Codigo,
		Elemento: req.body.Elemento,
		Detalle: req.body.Detalle,
		Ubicaciones: req.body.Ubicaciones,
		Observaciones: req.body.Observaciones,
		Fecha: req.body.Fecha
	}    
	Fallos.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Codigo: req.body.Codigo,
            Fecha: req.body.Fecha
        }
    })
    .then(fallos => {
        if (!fallos) {
            Fallos.create(formData)
            .then(fallos => {
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

fallos.post("/getFallos",async (req, res) => {
    const fallossinfoto = []
    const fotos = []
    const p = []
    Fallos.findAll(
    {
        where:{
            NumeroEconomico: req.body.NumeroEconomico
        }
    })
    .then(fallos => {
        res.send({success:true, data:fallos});
    })
    .catch(err =>{
        res.send({success:false});
        console.log(err)
     })
})

module.exports = fallos
