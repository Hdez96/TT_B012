const path = require('path')
const express = require('express')
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


const Fotos = require('../Models/Fotos.js')
const Reffa = require('../Models/REFFA.js')
const Fallos = require('../Models/Fallos.js')
const CedulaTRA = require('../Models/Cedulatra.js')
const RevTecInicial = require('../Models/RevTecnicaInicial.js')
const { monitorEventLoopDelay } = require('perf_hooks')

reffa.use(cors())
fotos.use(cors())

process.env.SECRET_KEY = 'secret'

fotos.get('/fetchPDF', async (req,res) => {        
    console.log(req)    
    Reffa.findOne({
        where:{
            NumeroEconomico: req.query.PDF
        }
    })
    .then(obj1 =>{        
        Fallos.findAll({
            where:{
                NumeroEconomico: req.query.PDF
            }
        })
        .then(obj2 => {
            Fotos.findAll({
                where:{
                    NumeroEconomico: req.query.PDF
                }                                    
            })
            .then(obj3 => {                               
                CedulaTRA.findOne({
                    where:{
                        NumeroEconomico: req.query.PDF
                    }
                })
                .then(obj4 => {                    
                    RevTecInicial.findOne({
                        where:{
                            Carroceria: obj4.NumeroCarroceria
                        }
                    }).then(obj5 => {
                        Fotos.findOne({
                            where:{
                                NumeroEconomico: "0000"
                            }                                    
                        })
                        .then(obj6 => {    
                            //PDF                    
                            var html = fs.readFileSync(path.join(__dirname, '../Documents/Templates/REFFA.html'),'utf-8');
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
                            const obj = {
                                EmpresaOperadora: obj5.EmpresaOperadora,
                                NumeroEconomico: obj1.NumeroEconomico,
                                FechaMatePreventivo: obj1.FechaMantePreventivo,
                                VerificacionVehicular: obj1.VerificacionVehicular,
                                ConsumoPromedioDispCalc: obj1.ConsumoPromedioDispCalc,
                                UltFechaFumigacion: obj1.UltFechaFumigacion,
                                NotaExtra: obj1.NotaExtra
                            }
                            let camion =
                            {
                                NombreEmpresaOperadora: obj5.EmpresaOperadora,
                                Año: obj5.Año,
                                NumeroMotor: obj5.Motor,
                                NumeroChasis: obj5.Chasis,
                                NumeroTransmision: obj5.Transmision,
                                Marca: obj4.Marca,
                                Modelo: obj5.Modelo,
                                PlacaVehicular: obj4.PlacaVehicular
                            }                        
                            let fallas = [];
                            for(let x in obj2){
                                const fn = {
                                    Contador: (x-0)+(1-0),
                                    Codigo: obj2[x].Codigo,
                                    Elemento: obj2[x].Elemento,
                                    Estatus: obj2[x].Estatus,
                                    Detalle: obj2[x].Detalle,
                                    Ubicaciones: obj2[x].Ubicaciones,
                                    Observaciones: obj2[x].Observaciones
                                }
                                fallas = fallas.concat(fn)
                            }       
                            const imgTest = {                            
                                Foto1: new Buffer( obj6.Foto, 'binary' ).toString('ascii'),                            
                            }
                            let fotosBD = [];
                            let tam = obj3.length                                                    
			    let x = 0
				console.log("Tam "+ obj3.length)
				for(let a in obj3)
					console.log(obj3[a].NumeroEconomico)
                            while(x < obj3.length){                                                                                  
                                let screen = {}
				console.log(x)
				console.log(obj3[x].NumeroEconomico)
                                if((x- 0)+ (1-0) <= tam-1){
                                    screen = {                                
                                        Foto1: new Buffer( obj3[x].Foto, 'binary' ).toString('ascii'),                                
                                        Codigo1: obj3[x].Codigo,                                               
                                    }
				//console.log("Holis"+obj3[x].Codigo)
                                    screen["Foto2"] = new Buffer( obj3[(x- 0) + (1 - 0)].Foto, 'binary' ).toString('ascii')                            
                                    screen["Codigo2"] = obj3[(x- 0) + (1 - 0)].Codigo        
                                    fotosBD.push(screen)                                                         	  
                                }
				else
				{
					screen = {                                
                        	                Foto1: new Buffer( obj3[x].Foto, 'binary' ).toString('ascii'),               
                	                        Codigo1: obj3[x].Codigo,                                               
        	                            }
	                          //      console.log("Holis"+obj3[x].Codigo)
					fotosBD.push(screen) 
				}
                                x = (x - 0) + (2 - 0)                                 
			    }                           
                            var document = {
                                html: html,
                                data: {                        
                                    datos: obj,
                                    fallos: fallas,
                                    datosCamion: camion,
                                    fotos: fotosBD,
                                    header: imgTest
                                },
                                path: path.join(__dirname, '../Documents/REFFA/REFFA') + req.query.PDF + ".pdf"
                            }                    
                            pdfName = "REFFA"+ req.query.PDF +".pdf"
                            pdf.create(document,options)
                            .then(pdf => { 
                                var pdfName = "REFFA" + req.query.PDF + ".pdf"
                                console.log(pdfName)                            
                                var aux = path.join(__dirname,'../', 'Documents/REFFA/', pdfName)
                                res.sendFile(aux)                           
                                console.log("Creado.")
                            })
                            .catch(error => {                            
                                console.log(error)
                            })
                            
                        })
                        .catch(error6 => {
                            console.log(error6)
                        })
                    })
                    .catch(error5 => {
                        console.log(error5)
                    })

                    //console.log(obj)
                        //res.send({ status: "Realizado!", data: obj1},)
                })
                .catch(error4 => {
                    console.log(error4)
                })                
            })
            .catch(error3 => {
                console.log(error3)
            })
        })  
        .catch(error2 => {
            console.log(error2)
        })                                
    })
    .catch(error1 => {
        console.log(error1)
    })  
})

fotos.post('/fotos',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
		Foto: req.body.Foto,
		Codigo: req.body.Codigo,
		Fecha: req.body.Fecha
	}
	Fotos.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Codigo: req.body.Codigo,
            Fecha: req.body.Fecha
        }
    })
    .then(fotos => {
        if (!fotos) {
            Fotos.create(formData)
            .then(fallos => {
                    console.log("Registrado.")
                    let estado = 1
                    Reffa.update({
                        Finalizado: estado
                        }, {
                        where: {
                            NumeroEconomico: req.body.NumeroEconomico
                        }
                    })
                    .then(user => {
                        console.log("Aquí pediremos datos")
                            // Reffa.findAll({
                            //     where:{
                            //         NumeroEconomico: "ECO121"
                            //     }
                            // })
                            // .then(obj1 =>{
                            //     console.log(obj1)
                            //     // Fallos.findAll({
                            //     //     where:{
                            //     //         NumeroEconomico: "ECO121"
                            //     //     }
                            //     // })
                            //     // .then(obj2 => {
                            //     //     Fotos.findAll({
                            //     //         where:{
                            //     //             NumeroEconomico: "ECO121"
                            //     //         }                                    
                            //     //     })
                            //     //     .then(obj4 => {
                            //     //         let objs = obj1.concat(obj2)
                            //     //         console.log("Se logro encontrar toda la información")
                            //     //         console.log(obj)
                            //     //         console.log(obj1)
                            //     //     })
                            //     //     .catch(error2 => {
                            //     //         console.log(error2)
                            //     //     })
                            //     // })                                
                            // }).catch(error1 => {
                            //     console.log(error1)
                            // })  
                            res.send({ status: 'Registrado!'})
                                                    
                    })                        
                    .catch(err => {
                        res.send('error: ' + err)
                    })
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

fotos.post('/header',async (req, res) => {

    Fotos.findOne({
        where: { 
            NumeroEconomico: "0000",
        }
    })
    .then(fotos => {
        res.send({ success: 'true',data:fotos.Foto})
    })
    .catch(err => {
        console.log(err)
      res.send('error: ' + err)
    })
})

fotos.post('/updateheader',async (req, res) => {
    Fotos.findOne({
        where: { 
            NumeroEconomico: "0000",
        }
    })
    .then(fotos => {
        Fotos.update({
                        Foto: req.body.Foto
                        }, {
                        where: {
                            NumeroEconomico: "0000"
                        }
                    })
                    .then(user => {
                            res.send({ status: 'Registrado!'})
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
    })
    .catch(err => {
        console.log(err)
      res.send('error: ' + err)
    })
})


module.exports = fotos
