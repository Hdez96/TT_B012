
const path = require('path')
const express = require("express")
const rtifuncionamiento = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var options = {
    format: "Letter"
}

var pdfName = ""

const RTIFuncionamiento = require('../Models/RTIFuncionamiento.js')
rtifuncionamiento.use(cors())

process.env.SECRET_KEY = 'secret'

rtifuncionamiento.post('/rtiautobusF',async (req, res) => {
    const today = new Date()
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
    RTIFuncionamiento.findOne({
        where: { 
          RevTecInID: req.body.RevTecInID
        }
    })
    .then(rtifuncionamiento => {
        if(!rtifuncionamiento) 
        {
            RTIFuncionamiento.create(formData)
            .then(rtifuncionamiento => {
                console.log("Registrado.")
                res.send({ status: 'Registrado!' })
            })
            .catch(err => {
                console.log(err)
                res.send('error: ' + err)
            })
        } 
        else {
            res.json({ error: 'El numero economico ya existe' })
        }
    })
    .catch(err => {
        console.log(err)
      res.send('error: ' + err)
    })
})


module.exports = rtifuncionamiento

