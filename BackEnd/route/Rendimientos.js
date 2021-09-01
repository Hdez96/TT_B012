const path = require('path')
const express = require('express')
const rendimientos = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var pdf = require('pdf-creator-node')
var fs = require('fs')
var options = {
	format: 'Letter'
}

var pdfName = ""

const Rendimientos = require('../Models/Rendimientos.js')
rendimientos.use(cors())

process.env.SECRET_KEY = 'secret'

rendimientos.post('/rendimientos',async (req, res) => {
	const today = new Date().toJSON()
	const formData = {
		NumeroEconomico: req.body.NumeroEconomico,
		Kilometraje: req.body.Kilometraje,
		ConsumoDiesel: req.body.ConsumoDiesel,
		RendimientoDiesel: req.body.RendimientoDiesel,
		Periodo: req.body.Periodo,
		Año: req.body.Año,
	}
	Rendimientos.findOne({
        where: { 
          NumeroEconomico: req.body.NumeroEconomico,
          Periodo: req.body.Periodo
        }
    })
    .then(rendimientos => {
        if (!rendimientos) {
            Rendimientos.create(formData)
            .then(rendimientos => {
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


rendimientos.post('/RendimientosPDF', (req,res) => {
    Rendimientos.findAll({
        where: {
            Periodo: req.body.Periodo,
            Año: req.body.Año
        }
    })
    .then(obj=>{
        var html = fs.readFileSync(path.join(__dirname, '../Documents/Templates/Rendimientos.html'),'utf-8');
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
        var users=[]
        for(const valor in obj){
            var objeto = {
                NumeroEconomico: obj[valor].NumeroEconomico,
                Kilometraje: obj[valor].Kilometraje,
                ConsumoDiesel: obj[valor].ConsumoDiesel,
                RendimientoDiesel: obj[valor].RendimientoDiesel,
                Periodo: obj[valor].Periodo,
                Año: obj[valor].Año
            }
            users.push(objeto)
        }

        var document = {
            html: html,
            data: {
                users: users
            },
            path:  path.join(__dirname, '../Documents/Rendimientos/Rendimiento') + req.body.Periodo + ".pdf"
        }
        pdfName = "Rendimiento"+ req.body.Periodo+".pdf"
        pdf.create(document,options)
        .then(res => {
            //res.send(Promise.reject());
            console.log("Creado.")
        })
        .catch(error => {
            //res.send(Promise.resolve());
            console.log(error)
        })
//        console.log(obj)
        res.send({success:true, data:obj});
    })
    .catch(err=>{
        res.send({success:false, message:err});
    })
})

rendimientos.post('/getData', (req,res) => {
    console.log("Buscando rendimientos...")
    Rendimientos.findAll()
    .then(obj=>{
        let datos = []   
        let mesActual = obj[0].Periodo
        for(let valor in obj)
        {
//		console.log(obj[valor].Periodo)
            if(mesActual != obj[valor].Periodo)
            {
                let data ={
                    NombrePDF: "Rendimiento"+mesActual,
                    Ruta: "/Rendimientos/fetch-pdf"
                } 
                mesActual = obj[valor].Periodo
                datos.push(data)
            }
        }
                let data ={
                    NombrePDF: "Rendimiento"+obj[obj.length-1].Periodo,
                    Ruta: "/Rendimientos/fetch-pdf"
                }
                datos.push(data)
            
	console.log(datos)
            res.send({success:true, data:datos});
        })
        .catch(err=>{
            res.send({success:false, message:err});
        })
})

rendimientos.get('/fetch-pdf', async(req,res) => {
	console.log(req.query.PDF)
    var pdfName = req.query.PDF+".pdf"
    console.log(pdfName)
    var aux = path.join(__dirname,'../', 'Documents/Rendimientos/', pdfName)
    console.log(aux)
    res.sendFile(aux)
})


module.exports = rendimientos
