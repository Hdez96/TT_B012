const path = require('path')
const express = require("express")
const kilometraje = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var options = {
    format: "Letter"
}

var pdfName = ""

const Kilometraje = require('../Models/Kilometraje.js')
kilometraje.use(cors())

process.env.SECRET_KEY = 'secret'

kilometraje.post('/kilometraje',async (req, res) => {
    const today = new Date().toJSON()
    const formData = {
        NumeroEconomico: req.body.NumeroEconomico,
        Kilometraje: req.body.Kilometraje,
        Periodo: req.body.Periodo,
        Mes: req.body.Mes,
        Año: req.body.Año
    }
    Kilometraje.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Periodo: req.body.Periodo,
            Mes: req.body.Mes,
            Año: req.body.Año
        }
    })
    .then(kilometraje => {
        if (!kilometraje) {
            Kilometraje.create(formData)
            .then(kilometraje => {
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
      res.send('error: ' + err)
    })
})


kilometraje.post('/KilometrajePDF', (req,res) => {
	console.log(req)
    Kilometraje.findAll({
    	where: {
            Periodo: 1,
    		Mes: req.body.Mes,
    		Año: req.body.Año,
//            EmpresaOperadora: req.body.EmpresaOperadora
    	}
    })
    .then(obj1 =>{
            Kilometraje.findAll({
                where: {
                    Periodo: 2,
                    Mes: req.body.Mes,
                    Año: req.body.Año,
  //                  EmpresaOperadora: req.body.EmpresaOperadora
                }
            })
            .then(obj2 =>{
                    Kilometraje.findAll({
                        where: {
                            Periodo: 3,
                            Mes: req.body.Mes,
                            Año: req.body.Año,
   //                         EmpresaOperadora: req.body.EmpresaOperadora
                        }
                    })
                    .then(obj3 =>{
//			            console.log("HOLA"+__dirname)
                        var html = fs.readFileSync(path.join(__dirname, '../Documents/Templates/Kilometraje.html'),'utf-8');
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

                        let obj = obj1.concat(obj2,obj3)
//                        console.log(obj)
			obj.sort(function (a, b) {
                          if (a.NumeroEconomico > b.NumeroEconomico) {
                            return 1;
                          }
                          if (a.NumeroEconomico < b.NumeroEconomico) {
                            return -1;
                          }
                          // a must be equal to b
                          return 0;
                        });

                        const user = []
                        let mesn = 0
                        let mesesArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
                        for(let i = 0; i < 12; i++)
                            if(mesesArray[i] == req.body.Mes)
                            {
                                mesn = i
                                i = 13
                            }
			console.log("adios"+obj[0])
                        let NumeroEconomicoRef = obj[0].NumeroEconomico
                        let Km1 = 0
                        let Km2 = 0
                        let Km3 = 0
                        let KmTotal = 0;
                        let dias = [31,28,31,30,31,30,31,31,30,31,30,31]
                        let dia = 1

                        let fecha1 = "1-"+req.body.Mes.substr(0,3)+'-'+req.body.Año
                        let fecha2 = "15-"+req.body.Mes.substr(0,3)+'-'+req.body.Año
                        let fecha3 = dias[mesn]+'-'+req.body.Mes.substr(0,3)+'-'+req.body.Año
  //                      console.log(fecha3)
                        for(const valor in obj)
                        {
                            if(NumeroEconomicoRef != obj[valor].NumeroEconomico && NumeroEconomicoRef != null)
                            {
                                if(req.body.Periodo == 1)
                                    dia = 1
                                else if(req.body.Periodo == 2)
                                    dia = 15
                                else
                                    dia = dias[mesn]

                                var objeto = {
                                    NumeroEconomico: NumeroEconomicoRef,
                                    Dia: dia,
                                    Mes: req.body.Mes,
                                    Año: req.body.Año,
                                    Km1: Km1,
                                    Km2: Km2,
                                    Km3: Km3,
                                    KmTotal: KmTotal
                                }
                                if(NumeroEconomicoRef != " ")
                                    user.push(objeto)
                                NumeroEconomicoRef = obj[valor].NumeroEconomico
                                Km1 = 0
                                Km2 = 0
                                Km3 = 0
                                KmTotal = 0
                            }
                                if(obj[valor].Periodo == 1)
                                {
                                    Km1 = obj[valor].Kilometraje
                                    KmTotal += obj[valor].Kilometraje
                                }
                                else if(obj[valor].Periodo == 2)
                                {
                                    KmTotal += obj[valor].Kilometraje
                                    Km2 = obj[valor].Kilometraje
                                }
                                else if(obj[valor].Periodo == 3)
                                {
                                    KmTotal += obj[valor].Kilometraje
                                    Km3 = obj[valor].Kilometraje
                                }
                        }
                                if(req.body.Periodo == 1)
                                    dia = 1
                                else if(req.body.Periodo == 2)
                                    dia = 15
                                else
                                    dia = dias[mesn]

                                var objeto = {
                                    NumeroEconomico: NumeroEconomicoRef,
                                    Dia: dia,
                                    Mes: req.body.Mes,
                                    Año: req.body.Año,
                                    Km1: Km1,
                                    Km2: Km2,
                                    Km3: Km3,
                                    KmTotal: KmTotal
                                }
                                if(NumeroEconomicoRef != " ")
                                    user.push(objeto)
                        
                        var document = {
                            html: html,
                            data: {
                                users: user,
                                Fecha1: fecha1,
                                Fecha2: fecha2,
                                Fecha3: fecha3,
                                Mes: req.body.Mes
                            },
                            path: path.join(__dirname, '../Documents/Kilometraje/Kilometraje') + req.body.Mes + ".pdf"
                        }
                        pdfName = "Kilometraje"+ req.body.Mes +".pdf"
                        pdf.create(document,options)
                        .then(res => {
                            //res.send(Promise.reject());
                            console.log("Creado.")
                        })
                        .catch(error => {
                            //res.send(Promise.resolve());
                            console.log(error)
                        })
                        console.log(obj)
                        res.send({success:true, data:obj})
                    })
                    .catch(err3 =>{
                        console.log(err3)
                        res.send({success:false, message:err3});
                    })
            })
            .catch(err2 =>{
                console.log(err2)
                res.send({success:false, message:err2});
            })
    })
    .catch(err1 =>{
        console.log(err1)
        res.send({success:false, message:err1});
    })
})

kilometraje.post('/getData', (req,res) => {
    Kilometraje.findAll()
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
                    NombrePDF: "Kilometraje" + obj[valor].Mes,
                    Ruta: "/km/fetch-pdf"
                }                   
                MES = obj[valor].Mes
                mes.push(data)
            }
        }
            res.send({success:true, data:mes});
        })
        .catch(err=>{
            res.send({success:false, message:err});
        })
})

kilometraje.get('/fetch-pdf', async(req,res) => {
	console.log(req.query.PDF)
    var pdfName = req.query.PDF+".pdf"
    console.log(pdfName)
    var aux = path.join(__dirname,'../', 'Documents/Kilometraje/', pdfName)
    console.log(aux)
    res.sendFile(aux)
})



module.exports = kilometraje

