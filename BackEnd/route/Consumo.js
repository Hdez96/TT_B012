const path = require('path')
const express = require("express")
const consumo = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var options = {
    format: "Letter"
}

var pdfName = ""

const Consumo = require('../Models/Consumo.js')
consumo.use(cors())

process.env.SECRET_KEY = 'secret'

consumo.post('/consumo',async (req, res) => {
    const today = new Date().toJSON()
    const formData = {
        NumeroEconomico: req.body.NumeroEconomico,
        Mes: req.body.Mes,
        Año: req.body.Año,
        Consumo: req.body.Consumo,
        Modulo: req.body.Modulo
    }
    Consumo.findOne({
        where: { 
            NumeroEconomico: req.body.NumeroEconomico,
            Mes: req.body.Mes,
            Año: req.body.Año,
            Consumo: req.body.Consumo
        }
    })
    .then(consumo => {
        if (!consumo) {
            Consumo.create(formData)
            .then(consumo => {
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

consumo.post('/getData', (req,res) => {    
    let año = []
    Consumo.findAll()
    .then(obj=>{
            let año = []
            let añoA = 0
            obj.sort(function (a, b) {
            if (a.Año > b.Año) {
                return 1;
            }
            if (a.Año < b.Año) {
                return -1;
            }
            // a must be equal to b
            return 0;
            });            
            for(let valor in obj){
                if(añoA != obj[valor].Año){ 
                    let data = {
                        NombrePDF: "Consumo-de-Combustible" + obj[valor].Año,
                        Ruta: "/Consumo/fetch-pdf"
                    }                   
                    añoA = obj[valor].Año
                    año.push(data)
                }
            }
            res.send({success:true, data:año});
        })
        .catch(err=>{
            res.send({success:false, message:err});
        })
})


consumo.post('/ConsumoPDF', (req,res) => {
	console.log(req.body.Año)
    Consumo.findAll({
        where: {
            Año: req.body.Año
        }
    })
    .then(obj=>{
        //Aqui va la funcion de PDF con los datos del mes correspondiente
        var html = fs.readFileSync(path.join(__dirname, '../')+'/Documents/Templates/Consumo_de_Gasolina.html','utf-8');
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
	var users=[]
        for(const valor in obj){
            var objeto = {
                NumeroEconomico: obj[valor].NumeroEconomico,
                Mes: obj[valor].Mes,
                Año: obj[valor].Año,
                Consumo: obj[valor].Consumo,
                Modulo: obj[valor].Año,
            }
            users.push(objeto)
        }
        users.sort(function (a, b) {
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

        let NumeroEconomicoRef = users[0].NumeroEconomico
        let ConsumoEneroRef = 0
        let ConsumoFebreroRef = 0
        let ConsumoMarzoRef = 0
        let ConsumoAbrilRef = 0
        let ConsumoMayoRef = 0
        let ConsumoJunioRef = 0
        let ConsumoJulioRef = 0
        let ConsumoAgostoRef = 0
        let ConsumoSeptiembreRef = 0
        let ConsumoOctubreRef = 0
        let ConsumoNoviembreRef = 0
        let ConsumoDiciembreRef = 0
        let ConsumoTotalRef = 0
	console.log(users.length)
        for(const valor in users)
        {
//		console.log(users[valor].NumeroEconomico+' '+users[valor].Consumo + ' '+users[valor].Mes)
		if(NumeroEconomicoRef != users[valor].NumeroEconomico)
    		{
    			var objeto = {
		                NumeroEconomico: NumeroEconomicoRef,
			        ConsumoEnero: ConsumoEneroRef,
			        ConsumoFebrero: ConsumoFebreroRef,
			        ConsumoMarzo: ConsumoMarzoRef,
			        ConsumoAbril: ConsumoAbrilRef,
			        ConsumoMayo: ConsumoMayoRef,
			        ConsumoJunio: ConsumoJunioRef,
			        ConsumoJulio: ConsumoJulioRef,
			        ConsumoAgosto: ConsumoAgostoRef,
			        ConsumoSeptiembre: ConsumoSeptiembreRef,
			        ConsumoOctubre: ConsumoOctubreRef,
			        ConsumoNoviembre: ConsumoNoviembreRef,
			        ConsumoDiciembre: ConsumoDiciembreRef,
			        ConsumoTotal: ConsumoTotalRef,
			        Año: req.body.Año
	            	}
	            if(NumeroEconomicoRef != " ")
	            	user.push(objeto)
	            NumeroEconomicoRef = users[valor].NumeroEconomico
		    ConsumoEneroRef = 0
		    ConsumoFebreroRef = 0
		    ConsumoMarzoRef = 0
		    ConsumoAbrilRef = 0
		    ConsumoMayoRef = 0
		    ConsumoJunioRef = 0
		    ConsumoJulioRef = 0
		    ConsumoAgostoRef = 0
		    ConsumoSeptiembreRef = 0
		    ConsumoOctubreRef = 0
		    ConsumoNoviembreRef = 0
		    ConsumoDiciembreRef = 0
		    ConsumoTotalRef = 0
    		}
    			if(users[valor].Mes == "Enero")
    			{
    				ConsumoEneroRef = users[valor].Consumo
    				ConsumoTotalRef += users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Febrero")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoFebreroRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Marzo")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoMarzoRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Abril")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoAbrilRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Mayo")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoMayoRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Junio")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoJunioRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Julio")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoJulioRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Agosto")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoAgostoRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Septiembre")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoSeptiembreRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Octubre")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoOctubreRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Noviembre")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoNoviembreRef = users[valor].Consumo
    			}
    			else if(users[valor].Mes == "Diciembre")
    			{
    				ConsumoTotalRef += users[valor].Consumo
    				ConsumoDiciembreRef = users[valor].Consumo
    			}
    		
        }
			if(users[users.length-1].Mes == "Enero")
    			{
    				ConsumoEneroRef = users[users.length-1].Consumo
    				ConsumoTotalRef += users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Febrero")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoFebreroRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Marzo")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoMarzoRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Abril")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoAbrilRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Mayo")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoMayoRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Junio")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoJunioRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Julio")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoJulioRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Agosto")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoAgostoRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Septiembre")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoSeptiembreRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Octubre")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoOctubreRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Noviembre")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoNoviembreRef = users[users.length-1].Consumo
    			}
    			else if(users[users.length-1].Mes == "Diciembre")
    			{
    				ConsumoTotalRef += users[users.length-1].Consumo
    				ConsumoDiciembreRef = users[users.length-1].Consumo
    			}
//			console.log("Hola: "+users[users.length-1].Consumo)
var objeto = {
                                NumeroEconomico: NumeroEconomicoRef,
                                ConsumoEnero: ConsumoEneroRef,
                                ConsumoFebrero: ConsumoFebreroRef,
                                ConsumoMarzo: ConsumoMarzoRef,
                                ConsumoAbril: ConsumoAbrilRef,
                                ConsumoMayo: ConsumoMayoRef,
                                ConsumoJunio: ConsumoJunioRef,
                                ConsumoJulio: ConsumoJulioRef,
                                ConsumoAgosto: ConsumoAgostoRef,
                                ConsumoSeptiembre: ConsumoSeptiembreRef,
                                ConsumoOctubre: ConsumoOctubreRef,
                                ConsumoNoviembre: ConsumoNoviembreRef,
                                ConsumoDiciembre: ConsumoDiciembreRef,
                                ConsumoTotal: ConsumoTotalRef,
                                Año: req.body.Año
                    }
  //                      console.log(objeto)
                    if(NumeroEconomicoRef != " ")
                        user.push(objeto)

//console.log(user)
		var document = {
            html: html,
            data: {
                users: user,
                Año: req.body.Año
            },
            path:  path.join(__dirname, '../Documents/Consumo/Consumo-de-Combustible') + req.body.Año + ".pdf"
        }
        pdfName = "Consumo"+ req.body.Año
        pdf.create(document,options)
        .then(res => {
            //res.send(Promise.reject());
            console.log("Creado.")
        })
        .catch(error => {
            //res.send(Promise.resolve());
            console.log(error)
        })
        //console.log(user)
        res.send({success:true, data:users});
    })
    .catch(err=>{
    	console.log(err)
        res.send({success:false, message:err});
    })
})


consumo.get('/fetch-pdf', async(req,res) => {
	console.log(req.query.PDF)
    var pdfName = req.query.PDF+".pdf"
    console.log(pdfName)
    var aux = path.join(__dirname,'../', 'Documents/Consumo/', pdfName)
    console.log(aux)
    res.sendFile(aux)
})

module.exports = consumo

