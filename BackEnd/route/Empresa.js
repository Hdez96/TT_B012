
const path = require('path')
const express = require("express")
const empresa = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var options = {
    format: "Letter"
}

var pdfName = ""

const Empresa = require('../Models/Empresa.js')
empresa.use(cors())

process.env.SECRET_KEY = 'secret'

empresa.post('/empresa',async (req, res) => {
    const today = new Date().toJSON()
    const formData = {
            NombreEmpresaOperadora: req.body.NombreEmpresaOperadora,
            Siglas: req.body.Siglas,
            NumeroEconomico: req.body.NumeroEconomico
    }
    Empresa.findOne({
        where: { 
          NombreEmpresaOperadora: req.body.NombreEmpresaOperadora,
            Siglas: req.body.Siglas,
            NumeroEconomico: req.body.NumeroEconomico
        }
    })
    .then(empresa => {
        if (!empresa) {
            Empresa.create(formData)
            .then(empresa => {
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


module.exports = empresa

