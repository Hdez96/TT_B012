var express = require("express")
var cookieParser = require('cookie-parser');
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 5000

app.use(cors())
//Asignando limite de archivos
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser());

var Users = require('./route/Users')
var CedulaTRA = require('./route/CedulaTRA')
var Cedularti = require('./route/Autobus')
var Consumo = require('./route/Consumo')
var RTIFuncionamiento = require('./route/RTIFuncionamiento')
var RTIEstado = require('./route/RTIEstado')
var Empresa = require('./route/Empresa')
var RevTecInicial = require('./route/RevTecnicaInicial')
var Codigos_Reffa = require('./route/Codigos_REFFA')
var ConsumoEmpresa = require('./route/ConsumoEmpresa')
var Mantenimiento = require('./route/Mantenimientos')
var EstatusPatio = require('./route/EstatusPatio')
var Rendimientos = require('./route/Rendimientos')
var PruebasDesempeño = require('./route/PruebasDeDesempeños') 
var Estatus = require('./route/Estatus')
var FallasOperacion = require('./route/FallasDuranteOperacion') 
var DatosIniciales = require('./route/DatosIniciales') 
var DatosFinales = require('./route/DatosFinales') 
var EstadoLlantasI = require('./route/EstadoDeLlantasInicial') 
var EstadoLlantasF = require('./route/EstadoDeLlantasFinal') 
var Kilometraje = require('./route/Kilometraje')
var Fallos = require('./route/Fallos')
var PersonaR = require('./route/PersonaRecepcion')
var Fotos = require('./route/Fotos')

app.use('/cedulatra', CedulaTRA)
app.use('/cedularti', Cedularti)
app.use('/consumo',Consumo)
app.use('/rtiestado',RTIEstado)
app.use('/rtifuncionamiento',RTIFuncionamiento)
app.use('/users',Users)
app.use('/empresa',Empresa)
app.use('/revtecinicial',RevTecInicial)
app.use('/reffa',Codigos_Reffa)
app.use('/consumoE',ConsumoEmpresa)
app.use('/mantenimiento',Mantenimiento)
app.use('/estatusP',EstatusPatio)
app.use('/rendimientos',Rendimientos)
app.use('/pruebasdesempeno',PruebasDesempeño)
app.use('/estatus',Estatus)
app.use('/fallasoperacion',FallasOperacion)
app.use('/datosiniciales',DatosIniciales)
app.use('/datosfinales',DatosFinales)
app.use('/estadollantasi',EstadoLlantasI)
app.use('/estadollantasf',EstadoLlantasF)
app.use('/km',Kilometraje)
app.use('/personarecepcion',PersonaR)
app.use('/fallos',Fallos)
app.use('/fotos',Fotos)


app.listen(port, () => {
    console.log("Server is running on port: "+  port)
})




