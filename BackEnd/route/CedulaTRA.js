
const path = require('path')
const express = require("express")
const cedulatra = express.Router()
const revtecini = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var pdfName = ""

const CedulaTRA = require('../Models/Cedulatra.js')
const RevTecIni = require('../Models/RevTecnicaInicial.js')
revtecini.use(cors())
cedulatra.use(cors())

process.env.SECRET_KEY = 'secret'

cedulatra.post('/cedulatra',async (req, res) => {
    const today = new Date()
    let date = today.getFullYear() + "-"+ parseInt(today.getMonth()+1) +"-"+  today.getDate()
    console.log(date)
    const formData = {
        NumeroFactura: req.body.NumeroFactura,
        FechaAlta: date,
        Propietario: req.body.Propietario,
        Domicilio: req.body.Domicilio,
        Telefonos: req.body.Telefonos,
        Responsable: req.body.Responsable,
        Marca: req.body.Marca,
        Modelo: req.body.Modelo,
        Año: parseInt(req.body.Año),
        NumeroMotor: req.body.NumeroMotor,
        NumeroChasis: req.body.NumeroChasis,
        NumeroCarroceria: req.body.NumeroCarroceria,
        NumeroTransmision: req.body.NumeroTransmision,
        NumeroEconomico: req.body.NumeroEconomico,
        PlacaVehicular: req.body.PlacaVehicular,
        Observaciones: req.body.Observaciones,
        Nombre: req.body.Nombre,
        FechaRegistro: req.body.FechaRegistro,
//        Firma: req.body.Firma
    }
    CedulaTRA.findOne({
        where: { 
          NumeroFactura: req.body.NumeroFactura
        }
    })
    .then(cedulatra => {
        if (!cedulatra) 
        {
            CedulaTRA.create(formData)
            .then(cedulatra => {
                console.log("Registrado.")
                var html = fs.readFileSync(path.join(__dirname, '../Documents/Templates/template.html'),'utf-8');
                var options = {
                    phantomPath: path.resolve(
    process.cwd(),
    "node_modules/phantomjs/bin/phantomjs"
  ),
		    format: "A3",
                    orientation: "portrait",
                    border: "0mm",
                    header: {
                        height: "0mm",
                        contents: '<div style="text-align: center;"></div>'
                    },
                    "footer": {
                        "height": "0mm",
                        "contents": {
                            first: ' ',
                            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                            last: ' '
                        }
                    }
                };

                var cedulatrad = [
                    {
                        NumeroFactura : req.body.NumeroFactura,
                        FechaAlta : req.body.FechaAlta,
                        Propietario : req.body.Propietario,
                        Domicilio :  req.body.Domicilio,
                        Telefono : req.body.Telefonos,
                        Responsable : req.body.Responsable,
                        Marca : req.body.Marca,
                        Modelo: req.body.Modelo,
                        Año: req.body.Año,
                        NumeroMotor: req.body.NumeroMotor,
                        NumeroChasis: req.body.NumeroChasis,
                        NumeroCarroceria: req.body.NumeroCarroceria,
                        NumeroTransmision: req.body.NumeroTransmision,
                        NumeroEconomico: req.body.NumeroEconomico,
                        PlacaVehicular: req.body.PlacaVehicular,
                        Observaciones: req.body.Observaciones,
                        Nombre: req.body.Nombre,
                        FechaRegistro: req.body.FechaRegistro,
  //                      Firma: req.body.Firma
                    }
                ]
		console.log(cedulatrad)
                var document = {
                    html: html,
                    data: {
                        users: cedulatrad
                        //users: cedulatra
                    },
                    path:  path.join(__dirname, '../Documents/Cedulatra/') + req.body.NumeroFactura + ".pdf"
                }
                pdf.create(document,options)
                .then(res => {
                    //res.send(Promise.reject());
                    console.log("Creado.")
                })
                .catch(error => {
                    //res.send(Promise.resolve());
                    console.log(error)
                })
                res.json({ status: 'Registrado!' })
            })
            .catch(err => {
                console.log(err)
                res.send('error: ' + err)
            })
        }
        else 
            res.send({ error: 'La factura ya existe' })
            
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

cedulatra.get('/fetch-pdf', async(req,res) => {
	console.log(req.query.PDF)
    var pdfName = req.query.PDF+".pdf"
    console.log(pdfName)
    var aux = path.join(__dirname,'../', 'Documents/Cedulatra/', pdfName)
    console.log(aux)
    res.sendFile(aux)
})

cedulatra.post("/BusquedaPDF/fetch-cedulatra-pdf", async(req,res) => {
    CedulaTRA.findOne({
        where:{
            NumeroEconomico: req.body.NumeroEconomico
        }
    })
	.then(obj=>{
		let dat =[]
                let datos = {
                    NombrePDF: obj.NumeroFactura,
                    Ruta: "/CedulaTRA/fetch-pdf"
                }
		dat.push(datos)
		console.log(dat[0].NumeroFactura)
        	res.send({success:true, data:dat});
    	})
    	.catch(err=>{
		console.log(err)
        	res.send({success:false, message:err});
    	})
})


cedulatra.post('/pdfCedulaTRA', (req, res) => {
    CedulaTRA.findOne({
        where:{
            NumeroEconomico: req.body.NumeroEconomico
        }
    }).then(cedulatra=> {
        console.log("Buscando...")
        if(cedulatra){
            console.log("Encontrado!")
            //Insertar función de pdf c on las dataValues
        }else{
            res.status(400).json({error: "Numero economico no encontrado"})
        }
    }).catch(err =>{
        res.status(400).json({error: err})
    })
})

cedulatra.post('/get_autobus', (req,res) => {
    CedulaTRA.findOne({
        where: {
           NumeroEconomico: req.body.NumeroEconomico
        }   
    })
    .then(obj1 =>{
        RevTecIni.findOne({
            where: {
               Carroceria: obj1.NumeroCarroceria
            }   
        })
        .then(obj =>{
            let objf =
            {
                NombreEmpresaOperadora: obj.EmpresaOperadora,
                Año: obj.Año,
                NumeroMotor: obj.Motor,
                NumeroChasis: obj.Chasis,
                NumeroTransmision: obj.Transmision,
                Marca: obj1.Marca,
                Modelo: obj.Modelo,
                PlacaVehicular: obj1.PlacaVehicular
            }
            res.send({success:true, data:objf});
        })
        .catch(err=>{
            console.log("Registro incompleto.");
            res.send({success:false, message:err});
        })
    })
    .catch(err=>{
        console.log("No hay autobus");
        res.send({success:false, message:err});
    })
})

cedulatra.post('/get_autobuses', (req,res) => {
    CedulaTRA.findAll({
        attributes: ['NumeroEconomico']
    })
    .then(obj1 =>{
      	
	res.send({success:true, data:obj1})
    })
    .catch(err=>{
        console.log("No hay autobus");
        res.send({success:false, message:err});
    })
})

module.exports = cedulatra

