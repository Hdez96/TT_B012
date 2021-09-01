
const path = require('path')
const express = require("express")
const rtiestado = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var options = {
    format: "Letter"
}

var pdfName = ""

const RTIEstado = require('../Models/RTIEstado.js')
rtiestado.use(cors())

process.env.SECRET_KEY = 'secret'

rtiestado.post('/rtiautobusE',async (req, res) => {
    console.log(req.body.Economico);
    const formData = {
            RevTecInID: req.body.RevTecInID,
            NumeroMotor : req.body.NumeroMotor,
            SeñalInteriorExterior: req.body.SeñalInteriorExterior,
            Economico: req.body.Economico,
            LaminacionPinturaExterior: req.body.LaminacionPinturaExterior,
            Defensas: req.body.Defensas,
            ChasisGancho: req.body.ChasisGancho,
            Puertas: req.body.Puertas,
            CristalesParabrisas: req.body.CristalesParabrisas,
            Limpiaparabrisas: req.body.Limpiaparabrisas,
            CristalesVentanillas: req.body.CristalesVentanillas,
            CristalMedallon: req.body.CristalMedallon,
            Espejos: req.body.Espejos,
            Visera: req.body.Visera,
            AsientoConductor: req.body.AsientoConductor,
            AsientosPasajeros: req.body.AsientosPasajeros,
            ElementosSujección: req.body.ElementosSujección,
            Escotillas: req.body.Escotillas,
            Extintores: req.body.Extintores,
            Botiquin: req.body.Botiquin,
            AccesoriosSeguridad: req.body.AccesoriosSeguridad,
            Pisos: req.body.Pisos,
            Articulacion: req.body.Articulacion,
            Motor2: req.body.Motor2,
            AireComprimido: req.body.AireComprimido,
            Hibrido: req.body.Hibrido,
            Transmision2: req.body.Transmision2,
            Enfriamiento: req.body.Enfriamiento,
            Ignicion: req.body.Ignicion,
            Tablero: req.body.Tablero,
            Electrico: req.body.Electrico,
            LetreroRuta: req.body.LetreroRuta,
            Claxon: req.body.Claxon,
            SistemaDesempañante: req.body.SistemaDesempañante,
            SistemaAire: req.body.SistemaAire,
            Extractores: req.body.Extractores,
            AlumbradoEI: req.body.AlumbradoEI,
            Frenos: req.body.Frenos,
            CajaDireccion: req.body.CajaDireccion,
            Suspension: req.body.Suspensión,
            TuboEscape: req.body.TuboEscape,
            SistemaRecaudo: req.body.SistemaRecaudo,
            SistemaTelematica: req.body.SistemaTelematica,
            TanqueCombustible: req.body.TanqueCombustible,
            NeumaticoSisControl: req.body.NeumaticoSisControl
    }
    RTIEstado.findOne({
        where: { 
          RevTecInID: req.body.RevTecInID
        }
    })
    .then(rtiestado => {
        if (!rtiestado) {
            RTIEstado.create(formData)
            .then(rtiestado => {
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


module.exports = rtiestado

