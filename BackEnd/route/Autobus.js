const path = require('path')
const express = require("express")
const autobus = express.Router()
const autobus1 = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var options = {
    format: "Letter"
}

var pdfName = ""

const Autobus = require('../Models/Autobus.js')
const Autobus_a = require('../Models/Cedulatra.js')
autobus.use(cors())
autobus1.use(cors())

process.env.SECRET_KEY = 'secret'

autobus.post('/autobus',async (req, res) => {
    const today = new Date().toJSON()
    const formData = {
        NombreEmpresaOperadora: req.body.NombreEmpresaOperadora,
        Año: req.body.Año,
        NumeroMotorElectrico: req.body.NumeroMotorElectrico,
        NumeroCarroceria: req.body.NumeroCarroceria,
        LecturaOdometro: req.body.LecturaOdometro,
        Modelo: req.body.Modelo,
        NumeroMotor: req.body.NumeroMotor,
        NumeroChasis: req.body.NumeroChasis,
        NumeroTransmision: req.body.NumeroTransmision,
        TipoAutobus: req.body.TipoAutobus,
        NumeroEconomico: req.body.NumeroEconomico,
        Ruta: req.body.Ruta
    }
    Autobus.findOne({
        where: { 
          NumeroEconomico: req.body.NumeroEconomico
        }
    })
    .then(autobus => {
        if (!autobus) {
            Autobus.create(formData)
            .then(autobus => {
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

autobus.post('/get_autobus', (req,res) => {
	console.log(req.body.NumeroEconomico)
    Autobus.findOne({
    where: {
         NumeroEconomico: req.body.NumeroEconomico
        } 
    })
    .then(obj=>{
            console.log(obj)
            Autobus_a.findOne({
                where: {
            	   NumeroEconomico: req.body.NumeroEconomico
                }   
            })
            .then(obj1 =>{
                console.log("HOLIS")
            	let objf =
            	{
					NombreEmpresaOperadora: obj.NombreEmpresaOperadora,
					Año: obj.Año,
					NumeroMotor: obj.NumeroMotor,
					NumeroChasis: obj.NumeroChasis,
					NumeroTransmision: obj.NumeroTransmision,
					Marca: obj1.Marca,
					Modelo: obj.Modelo,
					PlacaVehicular: obj1.PlacaVehicular
            	}
            	res.send({success:true, data:objf});
            })
             .catch(err=>{
	            console.log("No hay autobus");
	            res.send({success:false, message:err});
        	})
        })
        .catch(err=>{
            console.log("No hay autobus");
            res.send({success:false, message:err});
        })
})

module.exports = autobus

