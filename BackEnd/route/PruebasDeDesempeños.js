const path = require('path')
const express = require('express')
const pruebasdedesempeños = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

const Pruebasdedesempeños = require('../Models/PruebasDeDesempeños.js')
const Estatus = require('../Models/Estatus.js')
const DatosI = require('../Models/DatosIniciales.js')
const EstadoLI = require('../Models/EstadoDeLlantasInicial.js')
const DatosF = require('../Models/DatosFinales.js')
const EstadoLF = require('../Models/EstadoDeLlantasFinal.js')
const Fallas = require('../Models/FallasDuranteOperacion.js')

pruebasdedesempeños.use(cors())

process.env.SECRET_KEY = 'secret'

pruebasdedesempeños.post('/pruebasdedesempeno',async (req, res) => {
	const today = new Date().toJSON()
	
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
	        Mes: req.body.Mes,
       		Año: req.body.Año,
		Ruta: req.body.Ruta,
		Fecha: req.body.Fecha,
		NombredeEncargado: req.body.NombredeEncargado,
		NombredeRevision: req.body.NombredeRevision,
		NombreVistoBueno: req.body.NombreVistoBueno,
        NombredeEmpresaOperadora: req.body.NombredeEmpresaOperadora
	}
	Pruebasdedesempeños.findOne({
        where: { 
          NumeroEconomico: req.body.NumeroEconomico
        }
    })
    .then(pruebasdedesempeños => {
        console.log(req.body.NombredeEmpresaOperadora)
        if (!pruebasdedesempeños) {
            Pruebasdedesempeños.create(formData)
            .then(pruebasdedesempeños => {
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

pruebasdedesempeños.post('/PruebasPDF', (req,res) => {
    let fec = new Date(req.body.Fecha)
    console.log("\n\n\n"+ fec+"\n\n\n")
    let y = fec.getFullYear()
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let m = meses[fec.getMonth()]
    let d = fec.getDate()
	
//    let y = fec.substr(0,4)
  //  fec = fec.substr(5,fec.length-4)
//    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
   // let m = meses[fec.substr(0,fec.indexOf('-'))-1]
   // fec = fec.substr(fec.indexOf('-'),fec.length-fec.indexOf('-'))
   // let d = fec.substr(1,fec.length)
    console.log("FECHA:"+ fec +"AÑO: "+ y + " MES: " + m + " Dia: " +d)
    let stra = req.body.NumeroEconomico.substr(16,req.body.NumeroEconomico.length)
	req.body.NumeroEconomico = stra
	console.log(req.body.NumeroEconomico)
    Pruebasdedesempeños.findOne({
        where: {
            NumeroEconomico: req.body.NumeroEconomico,
            Fecha: req.body.Fecha
        }
    })
    .then(obj1 =>{
//	console.log(obj1.dataValues)
        Estatus.findOne({
            where: {
                NumeroEconomico: req.body.NumeroEconomico,
                Mes: m,
                Año: y
            }
        })
        .then(obj2 =>{
            DatosI.findOne({
                where: {
                    NumeroEconomico: req.body.NumeroEconomico,
                    Mes: m,
                    Año: y
                }
            })
            .then(obj3 =>{
		 EstadoLI.findAll({
                    where: {
                        NumeroEconomico: req.body.NumeroEconomico,
                        Mes: m,
                        Año: y
                    }
                })
                .then(obj4 =>{
		 DatosF.findOne({
                        where: {
                            NumeroEconomico: req.body.NumeroEconomico,
                            Mes: m,
                            Año: y
                        }
                    })
                    .then(obj5 =>{
                        EstadoLF.findAll({
                            where: {
                                NumeroEconomico: req.body.NumeroEconomico,
                                Mes: m,
                                Año: y
                            }
                        })
                        .then(obj6 =>{
                            Fallas.findAll({
                                where: {
                                    NumeroEconomico: req.body.NumeroEconomico,
                                    Mes: m,
                                    Año: y
                                }
                            })
                            .then(obj7 =>{
                                //Aqui va el codigo del PDF
                                var html = fs.readFileSync(path.join(__dirname, '../Documents/Templates/PruebasDesempeño.html'),'utf-8');
                                var options = {
                                    	    phantomPath: path.resolve(
    process.cwd(),
    "node_modules/phantomjs/bin/phantomjs"
  ),
				            format: "A3",
                                            orientation: "landscape",
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
                                let DataLI = []
                                for(let valor in obj4)
                                {
                                    let objeto ={
                                        NumeroEconomico: obj4[valor].NumeroEconomico,
                                        Mes: obj4[valor].Mes,
                                        Año: obj4[valor].Año,
                                        NumerodeLlanta: obj4[valor].NumerodeLlanta,
                                        Eje: obj4[valor].Eje,
                                        Profundidad: obj4[valor].Profundidad,
                                        Presion: obj4[valor].Presion
                                    }
                                    DataLI.push(objeto)
                                }
				DataLI.sort(function (a,b) {
            				if(a.NumerodeLlanta > b.NumerodeLlanta){
		                	    return 1;
            				}
		                	if(a.NumerodeLlanta < b.NumerodeLlanta){
		                	    return -1
        		        	}
			        	    return 0
        				})	
                                let DataLF = []
                                for(let valor in obj6)
                                {
                                    let objeto ={
                                        NumeroEconomico: obj6[valor].NumeroEconomico,
                                        Mes: obj6[valor].Mes,
                                        Año: obj6[valor].Año,
                                        NumerodeLlanta: obj6[valor].NumerodeLlanta,
                                        Eje: obj6[valor].Eje,
                                        Profundidad: obj6[valor].Profundidad,
                                        Presion: obj6[valor].Presion
                                    }
                                    DataLF.push(objeto)
                                }
				DataLF.sort(function (a,b) {
                                        if(a.NumerodeLlanta > b.NumerodeLlanta){
                                            return 1;
                                        }
                                        if(a.NumerodeLlanta < b.NumerodeLlanta){
                                            return -1
                                        }
                                            return 0
                                        })      
                                let DataFa = []
                                for(let valor in obj7)
                                {
                                    let objeto ={
                                        NumeroEconomico: obj7[valor].NumeroEconomico,
                                        Mes: obj7[valor].Mes,
                                        Año: obj7[valor].Año,
                                        Falla: obj7[valor].Falla,
                                        Numero: parseInt(valor)+parseInt(1)
                                    }
                                    DataFa.push(objeto)
                                }
				//console.log("ADIOS"+obj1.NumeroEconomico)
                                let datas = obj1.dataValues
                                let DataP = [{
					NumeroEconomico: obj1.NumeroEconomico,
					NombredeEmpresaOperadora: obj1.NombredeEmpresaOperadora,
					Mes: obj1.Mes,
					Año: obj1.Año,
					Ruta: obj1.Ruta,
					Fecha: obj1.Fecha,
					NombredeEncargado:obj1.NombredeEncargado ,
					NombredeRevision: obj1.NombredeRevision,
					NombreVistoBueno: obj1.NombreVistoBueno,

				}]
//				console.log(obj2.dataValues)
                                datas = obj2.dataValues
				console.log(obj2)
                                let DataE = [datas]
				datas = obj3.dataValues
				console.log(datas)
				let DataI = [datas]
/*                                let DataI = [{
                                        NumeroEconomico: obj3.NumeroEconomico,
                                        Mes: obj3.Mes,
                                        Año: obj3.Año,
                                        Lugar: obj3.Lugar,
                                        TiempoReal: obj3.TiempoReal,
                                        PresiondeAceitedeMotor: obj3.PresiondeAceitedeMotor,
                                        PresiondeAire: obj3.PresiondeAire,
                                        TemperaturaParcial: obj3.TemperaturaParcial,
                                        Voltaje: obj3.Voltaje,
                                        Velocidad1a2: obj3.Velocidad1a2,
                                        Velocidad2a3: obj3.Velocidad2a3,
                                        Velocidad3a4: obj3.Velocidad3a4,
                                        Velocidad4a5: obj3.Velocidad4a5,
                                        Velocidad5a6: obj3.Velocidad5a6,
                                        FrenadoBrusco: obj3.FrenadoBrusco,
                                        NumerodeActivacionalPedaldeFreno: obj3.NumerodeActivacionalPedaldeFreno,
                                        PorcentajePasajeros: obj3.PorcentajePasajeros
                                }]
*/				console.log("V: "+DataI[0].Hora)
                                datas = obj5.dataValues
				let DataF = [datas]
/*                                let DataF = [{
                                        NumeroEconomico: obj5.NumeroEconomico,
                                        Mes: obj5.Mes,
                                        Año: obj5.Año,
                                        Lugar: obj5.Lugar,
                                        TiempoReal: obj5.TiempoReal,
                                        PresiondeAceitedeMotor: obj5.PresiondeAceitedeMotor,
                                        PresiondeAire: obj5.PresiondeAire,
                                        TemperaturaParcial: obj5.TemperaturaParcial,
                                        Voltaje: obj5.Voltaje,
                                        Velocidad1a2: obj5.Velocidad1a2,
                                        Velocidad2a3: obj5.Velocidad2a3,
                                        Velocidad3a4: obj5.Velocidad3a4,
                                        Velocidad4a5: obj5.Velocidad4a5,
                                        Velocidad5a6: obj5.Velocidad5a6,
                                        FrenadoBrusco: obj5.FrenadoBrusco,
                                        NumerodeActivacionalPedaldeFreno: obj5.NumerodeActivacionalPedaldeFreno,
                                        PorcentajePasajeros: obj5.PorcentajePasajeros
                                }]
*//*				console.log(obj5.dataValues)*/
				console.log(DataF)
				console.log("V2: " + DataF[0].Hora)
				let NFallas = DataFa.length+1
                                var document = {
                                    html: html,
                                    data: {
                                        PruebasD: DataP,
                                        Estatus: DataE,
                                        DatosInicial: DataI,
                                        LlantaInicial: DataLI,
                                        DatosFinal: DataF,
                                        LlantaFinal: DataLF,
					NumeroFallas: NFallas,
                                        Fallas: DataFa,
                                        Dia: d,
                                        Mes: m,
                                        Año: y
                                    },
                                    path: path.join(__dirname, '../Documents/PruebasDesempeño/PruebasDesempeño') + req.body.NumeroEconomico + ".pdf"
                                }
                                pdfName = "PruebasDesempeño"+req.body.NumeroEconomico +".pdf"
                                pdf.create(document,options)
                                .then(res => {
                                    //res.send(Promise.reject());
                                    console.log("Creado.")
				    console.log(NFallas)
                                })
                                .catch(error => {
                                    //res.send(Promise.resolve());
                                    console.log(error)
                                })

                                res.send({success:true, data1:obj1, data2:obj2, data3:obj3, data4:obj4, data5:obj5, data6:obj6, data7:obj7});
                            })  
                            .catch(err7 =>{
				console.log(err7)
                                res.send({success:false, message:err7});
                            })
                        })  
                        .catch(err6 =>{
				 console.log(err6)
                            res.send({success:false, message:err6});
                        })
                    })  
                    .catch(err5 =>{
			console.log(err5)
                        res.send({success:false, message:err5});
                    })
                })  
                .catch(err4 =>{
			console.log(err4)
                    res.send({success:false, message:err4});
                })
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

pruebasdedesempeños.post('/getData', (req,res) => {
    Pruebasdedesempeños.findAll()
    .then(obj=>{
        let datos = []   
        for(let valor in obj){            
                let data = {
                    NombrePDF: "PruebasDesempeño"+obj[valor].NumeroEconomico,
		    Fecha: obj[valor].Fecha,
                    Ruta: "/pruebasdesempeno/fetch-pdf"  
                }              
                datos.push(data)            
        }
            res.send({success:true, data:datos});
        })
        .catch(err=>{
            res.send({success:false, message:err});
        })
})

pruebasdedesempeños.get('/fetch-pdf', async(req,res) => {
    console.log(req.query.PDF)
    var pdfName = req.query.PDF+".pdf"
    console.log("HOLA: "+ pdfName)
    var aux = path.join(__dirname,'../', 'Documents/PruebasDesempeño/', pdfName)
    console.log(aux)
    res.sendFile(aux)
})

module.exports = pruebasdedesempeños
