const express = require("express")
const reffa = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const REFFA = require("../Models/Codigos_REFFA")
const Reffa = require('../Models/REFFA.js')
reffa.use(cors())

process.env.SECRET_KEY = 'secret'

reffa.post('/get_Codigo', (req,res) => {
    REFFA.findAll()
    .then(obj=>{
            res.send({success:true, data:obj});
        })
        .catch(err=>{
            res.send({success:false, message:err});
        })
})

reffa.post('/getReffa', (req,res) => {
    Reffa.findAll({
        where: {
            Finalizado: null
        }
    })
    .then(obj=>{
            if(obj)
                res.send({success:true, data:obj});
            else
                res.send({success:false, message:err});
        })
        .catch(err=>{
            res.send({success:false, message:err});
        })
})

reffa.post('/reffaT',async (req, res) => {
	console.log("Datos generales REFFA en codigos REFFA")
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
		FechaMantePreventivo: req.body.FechaUltimoMantenimiento,
		VerificacionVehicular: req.body.Verificacion,
		ConsumoPromedioDispCalc: req.body.ConsumoPromedio,
		UltFechaFumigacion: req.body.FechaFumigacion,
		NotaExtra: req.body.NotaExtra,
		PersonaElaboro: req.body.Nombre,
		Fecha: req.body.Fecha
	}
	console.log(formData)
	Reffa.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Fecha: req.body.Fecha
        }
    })
    .then(reffa => {
        if (!reffa) {
            Reffa.create(formData)
            .then(reffa => {
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

module.exports = reffa

