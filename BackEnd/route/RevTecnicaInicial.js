
const path = require('path')
const express = require("express")
const revtecini = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
var pdf = require("pdf-creator-node");
var fs = require('fs');

var pdfName = ""

const RevTecIni = require('../Models/RevTecnicaInicial.js')
revtecini.use(cors())

process.env.SECRET_KEY = 'secret'

revtecini.post('/revteci',async (req, res) => {
    const today = new Date()
    let date = today.getFullYear() + "-"+ parseInt(today.getMonth()+1) +"-"+  today.getDate()
    const formData = {
            RevTecInID : req.body.RevTecInID,
            Economico: req.body.Economico,
            EmpresaOperadora : req.body.EmpresaOperadora,
            Año : req.body.Año,
            MotorElectrico : req.body.MotorElectrico,
            Carroceria : req.body.Carroceria,
            LecturaOdometro : req.body.LecturaOdometro,
            Modelo : req.body.Modelo,
            Motor : req.body.Motor,
            Chasis : req.body.Chasis,
            Transmision : req.body.Transmision,
            Tipo : req.body.Tipo,
            Observaciones: req.body.Observaciones,
            Fecha: req.body.Fecha,
            Elabora: req.body.Empleado
    }
    RevTecIni.findOne({
        where: { 
          RevTecInID: req.body.RevTecInID
        }
    })
    .then(revtecini => {
        if (!revtecini) {
            RevTecIni.create(formData)
            .then(revtecini => {
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

revtecini.post('/revtecPDF',async (req, res) => {
	console.log("ALOLOLO" + req.body.Fecha)
    const today = new Date(req.body.Fecha)
    console.log(today + ' ' + req.body.Fecha)
    let date = today.getFullYear() + "-"+ parseInt(today.getMonth()+1) +"-"+  today.getDate()
    let dia = today.getDate()
    let mes = today.getMonth()+1
    let año = today.getFullYear()

    console.log("Recibiendo datos para pdf.. " + date + "\n\n\n" )
    const users = [{
        RevTecInID : req.body.RevTecInID,
        NumeroEconomico: req.body.NumeroEconomico,
        EmpresaOperadora : req.body.EmpresaOperadora,
        AñoM : req.body.Año,
        MotorElectrico : req.body.MotorElectrico,
        Carroceria : req.body.Carroceria,
        LecturaOdometro : req.body.LecturaOdometro,
        Modelo : req.body.Modelo,
        Motor : req.body.Motor,
        Chasis : req.body.Chasis,
        Transmision : req.body.Transmision,
        Tipo : req.body.Tipo,
        Observaciones: req.body.Observaciones,
        Fecha: req.body.Fecha,
        Dia: dia,
        Mes: mes,
        Año: año,
        Elabora: req.body.Empleado,      
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
        Suspension: req.body.Suspension,
        TuboEscape: req.body.TuboEscape,
        SistemaRecaudo: req.body.SistemaRecaudo,
        SistemaTelematica: req.body.SistemaTelematica,
        TanqueCombustible: req.body.TanqueCombustible,
        NeumaticoSisControl: req.body.NeumaticoSisControl,
        NumeroMotorValue: req.body.NumeroMotorValue,
        SeñalInteriorExteriorValue: req.body.SeñalInteriorExteriorValue,
        EconomicoValue: req.body.EconomicoValue,
        LaminacionPinturaExteriorValue: req.body.LaminacionPinturaExteriorValue,
        DefensasValue: req.body.DefensasValue,
        ChasisGanchoValue: req.body.ChasisGanchoValue,
        PuertasValue: req.body.PuertasValue,
        CristalesParabrisasValue: req.body.CristalesParabrisasValue,
        LimpiaparabrisasValue: req.body.LimpiaparabrisasValue,
        CristalesVentanillasValue: req.body.CristalesVentanillasValue,
        CristalMedallonValue: req.body.CristalMedallonValue,
        EspejosValue: req.body.EspejosValue,
        ViseraValue: req.body.ViseraValue,
        AsientoConductorValue: req.body.AsientoConductorValue,
        AsientosPasajerosValue: req.body.AsientosPasajerosValue,
        ElementosSujecciónValue: req.body.ElementosSujecciónValue,
        EscotillasValue: req.body.EscotillasValue,
        ExtintoresValue: req.body.ExtintoresValue,
        BotiquinValue: req.body.BotiquinValue,
        AccesoriosSeguridadValue: req.body.AccesoriosSeguridadValue,
        PisosValue: req.body.PisosValue,
        ArticulacionValue: req.body.ArticulacionValue,
        Motor2Value: req.body.Motor2Value,
        AireComprimidoValue: req.body.AireComprimidoValue,
        HibridoValue: req.body.HibridoValue,
        Transmision2Value: req.body.Transmision2Value,
        EnfriamientoValue: req.body.EnfriamientoValue,
        IgnicionValue: req.body.IgnicionValue,
        TableroValue: req.body.TableroValue,
        ElectricoValue: req.body.ElectricoValue,
        LetreroRutaValue: req.body.LetreroRutaValue,
        ClaxonValue: req.body.ClaxonValue,
        SistemaDesempañanteValue: req.body.SistemaDesempañanteValue,
        SistemaAireValue: req.body.SistemaAireValue,
        ExtractoresValue: req.body.ExtractoresValue,
        AlumbradoEIValue: req.body.AlumbradoEIValue,
        FrenosValue: req.body.FrenosValue,
        CajaDireccionValue: req.body.CajaDireccionValue,
        SuspensionValue: req.body.SuspensionValue,
        TuboEscapeValue: req.body.TuboEscapeValue,
        SistemaRecaudoValue: req.body.SistemaRecaudoValue,
        SistemaTelematicaValue: req.body.SistemaTelematicaValue,
        TanqueCombustibleValue: req.body.TanqueCombustibleValue,
        NeumaticoSisControlValue: req.body.NeumaticoSisControlValue
        }
    ]
    console.log("Suspension:" + req.body.SuspensionValue)
    console.log("Laminacion: " + req.body.LaminacionPinturaExteriorValue)
    var relp = path.join(__dirname,"../Documents/Templates/CRTIA.html")
    var html = fs.readFileSync(path.join(__dirname,"../")+'/Documents/Templates/CRTIA.html','utf-8');
/*    var options = {
        format: "A3",
        orientation: "portrait",
        border: "0mm",
        header: {
            height: "0mm",
            contents: '<div></div>'
        },
        "footer": {
            "height": "0mm",
            "contents": {
                first: '',
                2: '', // Any page number is working. 1-based index
                default: '<div></div>', // fallback value
                last: ''
            }
        }
    };*/
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
    console.log("Generando pdf...\n")
    var document = {
        html: html,
        data: {
            users: users
        },
//        timeout: 10000,
        path:  path.join(__dirname, '../Documents/Cedularti/') + req.body.Carroceria + ".pdf"
    }
    pdf.create(document,options)
    .then(res => {
        //res.send(Promise.reject());
        console.log("Creado.")
    })
    .catch(error => {
        //res.send(Promise.resolve());
        console.log("No se pudo crear... "+error)
    })

})

revtecini.post('/getData', (req,res) => {    
    RevTecIni.findAll()
    .then(obj=>{
            console.log("Datos...")
//            console.log(obj)
            let obj1 = []
            for(var a in obj)
	    {
		let ru = "../Documents/Cedularti/" + obj[a].Carroceria + ".pdf"
		let aux = {
			NombrePDF: obj[a].Carroceria,
			Ruta: ru
		}
                obj1.push(aux)
                console.log("Data: " + obj[a].Carroceria)
            }
            console.log("Datos mostrados...")
            res.send({success:true, data:obj1});
        })
        .catch(err=>{
            res.send({success:false, message:err});
        })
})

revtecini.get('/fetch-pdf', async(req,res) => {
    console.log(req.query.PDF)
    var pdfName = req.query.PDF+".pdf"
    console.log(pdfName)
    var aux = path.join(__dirname,'../', 'Documents/Cedularti/', pdfName)
    //console.log(aux)
    res.sendFile(aux)
})

module.exports = revtecini

