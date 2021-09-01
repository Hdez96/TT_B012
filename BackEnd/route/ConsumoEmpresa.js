const path = require('path')
const express = require("express")
const consumoE = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var pdfName = ""

const ConsumoE = require('../Models/ConsumoEmpresa.js')
const Mantenimientos = require('../Models/Mantenimientos.js')
consumoE.use(cors())

process.env.SECRET_KEY = 'secret'

consumoE.post('/consumoE',async (req, res) => {
    const today = new Date().toJSON()
    const formData = {
        NumeroEconomico: req.body.NumeroEconomico,
        Mes: req.body.Mes,
	    KilometrajePorMes: req.body.KilometrajePorMes,
        RendimientoDiesel: req.body.RendimientoDiesel,
        RendimientoAdblue: req.body.RendimientoAdblue,
        ConsumoMensualDiesel: req.body.ConsumoMensualDiesel,
        ConsumoMensualAdblue: req.body.ConsumoMensualAdblue
    }
    ConsumoE.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Mes: req.body.Mes
        }
    })
    .then(consumoE => {
        if (!consumoE) {
            ConsumoE.create(formData)
            .then(consumoE => {
                console.log("Registrado.")
		res.send({ status: 'Registrado!' })
            })
            .catch(err => {
                res.send('error: ' + err)
            })
        } else {
            res.json({ error: 'La factura ya existe' })
        }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


consumoE.post('/ConsumoEPDF', (req,res) => {
	console.log(req.body.Mes)
    ConsumoE.findAll({
        where: {
            Mes: req.body.Mes
            //Año: req.body.Año
        }
    })
    .then(obj =>{
        Mantenimientos.findAll({
            where: {
                Mes: req.body.Mes,
                Año: req.body.Año
            }
        })
        .then(objm =>{
	console.log(obj)
            var html = fs.readFileSync(path.join(__dirname, '../Documents/Templates/Consumo_y_Mantenimiento_de_Empresas.html'),'utf-8');
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
            var users = [] 
            var user = []      
//            let EO = objm[0].EmpresaOperadora
	console.log(objm.dataValues)
	  let EO = "ECO"
          for(const valor in objm){
                let cont = parseInt(valor) + parseInt(1)
                var objeto = {
//                    EmpresaOperadora: objm[valor].EmpresaOperadora,
                    NumeroEconomico: objm[valor].NumeroEconomico,
                    Numero: cont,
                    Fecha: objm[valor].Dia + "-" + objm[valor].Mes + "-" + objm[valor].Año,
                    TipoMantenimiento: objm[valor].TipoMantenimiento,
                    LecturaOdometroAnterior: objm[valor].LecturaOdometroAnterior,
                    LecturaOdometro: objm[valor].LecturaOdometro,
                    Observaciones: objm[valor].Observaciones
                }
                user.push(objeto)
            }

            for(const valor in obj){
                var objeto = {
                    NumeroEconomico: obj[valor].NumeroEconomico,
                    Mes: obj[valor].Mes,
                    KilometrajePorMes: obj[valor].KilometrajePorMes,
                    RendimientoDiesel: obj[valor].RendimientoDiesel,
                    RendimientoAdblue: obj[valor].RendimientoAdblue,
                    ConsumoMensualDiesel: obj[valor].ConsumoMensualDiesel,
                    ConsumoMensualAdblue: obj[valor].ConsumoMensualAdblue
                }
                users.push(objeto)
            }
		console.log("HOLA")
		console.log(objm + ' '+ obj)
            var document = {
                html: html,
                data: {
                    users: users,
                    user:user,
                    Mes: req.body.Mes,
                    Año: req.body.Año,
                    EmpresaOperadora: EO
                },
                path:  path.join(__dirname, '../Documents/ConsumoMantenimiento/Consumo-y-Mantenimiento-Empresas') + req.body.Mes + ".pdf"
            }
            pdfName = "Consumo"+ req.body.Mes+".pdf"
            pdf.create(document,options)
            .then(res => {
                //res.send(Promise.reject());
                console.log("Creado.")
            })
            .catch(error => {
                //res.send(Promise.resolve());
                console.log(error)
            })
            res.send({success:true, data:obj,data1:objm});
        })
        .catch(err1 =>{
		console.log(err1)
            res.send({success:false, message:err1});
        })
    })
    .catch(err =>{
	console.log(err)
        res.send({success:false, message:err});
    })
})

consumoE.post('/getData', (req,res) => {
    ConsumoE.findAll()
    .then(obj=>{
        let mes = []
        let MES = 0
        obj.sort(function (a,b) {
            if(a.Mes > b.Mes){
                return 1;
            }
            if(a.Mes < b.Mes){
                return -1
            }
            return 0
        });
        for(let valor in obj){
            if(MES != obj[valor].Mes){ 
                let data = {
                    NombrePDF: "Consumo-y-Mantenimiento-Empresas"+obj[valor].Mes,
                    Ruta: "/ConsumoE/fetch-pdf"
                }                   
                MES = obj[valor].Mes
                mes.push(data)
            }
        }
        console.log("Enviando meses de ConsumoEmpresa")
            res.send({success:true, data:mes});
        })
        .catch(err=>{
            res.send({success:false, message:err});
        })
})

consumoE.get('/fetch-pdf', (req, res) =>{
    console.log(req.query.PDF)
    var pdfName = req.query.PDF+".pdf"
    console.log(pdfName)
    var aux = path.join(__dirname,'../', 'Documents/ConsumoMantenimiento/', pdfName)
    console.log(aux)
    res.sendFile(aux)

    //res.sendFile("./Documents/ConsumoMantenimiento/Consumo" + pdfName + ".pdf")
 })



module.exports = consumoE

