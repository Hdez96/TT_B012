import React, { useRef, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TrainIcon from '@material-ui/icons/TrainOutlined'; //Agregado para la parte de validaciones 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { formRegisterA, formRegisterCompleto } from '../../Functions/RevTecnicaInicial'
import { formRegisterE } from '../../Functions/RTIEstado'
import { formRegisterF } from '../../Functions/RTIFuncionamiento'
import SignatureCanvas from 'react-signature-canvas'
/* function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Proyecto Metrobus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
} 

<TableRow>
  <TableCell component='th' scope='row'>
  	Firma
  </TableCell>

  <TableCell align='left'>
  	<SignatureCanvas penColor='blue' backgroundColor = "#ededed"
			canvasProps={{ width: 500, height: 200, className: 'sigCanvas'}} ref={FirmaRef} />
  </TableCell>

</TableRow>

*/

const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.common.white,
          size:  'small',
        
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            
          },
        },
      }))(TableRow);
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          
        },
        table: {
          minWidth: "100%",
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundColor: theme.palette.error.dark,
        },
      }));

export default function CedulaRTI() {
	const history = useHistory();
  	const classes = useStyles();

  	const [Mensajes, setMensajes] = useState([]); //Const para los mensajes agregada para validaciones

  	function getCurrentDate(separator='')
	{
		let newDate = new Date()
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
	 	return `${year}${separator="-"}${month<10?`0${month}`:`${month}`}${separator="-"}${date}`
	}

	const fecha = String(getCurrentDate())
	const [forms, setForms] = useState({})
	const [forma, setForma] = useState({})
	const [imageURL,setImageURL] = useState(null)
	const SeñalizaciónRef = useRef()
	
	const EmpresaOperadora = useRef('')
	const Año = useRef('')
	const MotorElectrico = useRef('')
	const Carroceria = useRef('')
	const LecturaOdometro = useRef('')
	const Modelo = useRef('')
	const Motor = useRef('')
	const Chasis = useRef('')
	const Transmision =  useRef('')
	const TipoAutobus = useRef('')
	const FechaRef = useRef('')
	const SeñalInteriorExterior = useRef('')
	const Economico = useRef('')
	const LaminacionPinturaExterior = useRef('')
	const Defensas = useRef('')
	const ChasisGancho = useRef('')
	const Puertas = useRef('')
	const CristalesParabrisas = useRef('')
	const Limpiaparabrisas = useRef('')
	const CristalesVentanillas = useRef('')
	const CristalMedallon = useRef('')
	const Espejos = useRef('')
	const Visera = useRef('')
	const AsientoConductor = useRef('')
	const AsientosPasajeros = useRef('')
	const ElementosSujección = useRef('')
	const Escotillas = useRef('')
	const Extintores = useRef('')
	const Botiquin = useRef('')
	const AccesoriosSeguridad = useRef('')
	const Pisos = useRef('')
	const Articulacion = useRef('')
	const Motor2 = useRef('')
	const AireComprimido = useRef('')
	const Hibrido = useRef('')
	const Transmision2 = useRef('')
	const Enfriamiento = useRef('')
	const Ignicion = useRef('')
	const Tablero = useRef('')
	const Electrico = useRef('')
	const LetreroRuta = useRef('')
	const Claxon = useRef('')
	const SistemaDesempañante = useRef('')
	const SistemaAire = useRef('')
	const Extractores = useRef('')
	const AlumbradoEI = useRef('')
	const Frenos = useRef('')
	const CajaDireccion = useRef('')
	const Suspensión = useRef('')
	const TuboEscape = useRef('')
	const SistemaRecaudo = useRef('')
	const SistemaTelematica = useRef('')
	const TanqueCombustible = useRef('')
	const NeumaticoSisControl = useRef('')
	const Observaciones = useRef('')
	const FirmaRef = useRef({})

	const errorEmpresaO = useRef('') //Const agregada para validaciones
	const errorAño = useRef('')
	const errorMotorE = useRef('')
	const errorCarroc = useRef('')
	const errorOdometro = useRef('')
	const errorModelo = useRef ('')
	const errorMotor = useRef('')
	const errorChasis = useRef('')
	const errorTransmi = useRef('')
	const errorTipoAuto = useRef('')

	//const save = () => console.log(FirmaRef.current.getTrimmedCanvas().toDataURL(fecha+"/png"))

	const HandleRadioChange = async(event) =>{
			let name = event.target.name
			let value = event.target.value
			await setForms(forms => ({ ...forms,[name]: value }))
	    	console.log(forms)
	    const nombre = name
	    const tipo = value
	    if(nombre=="Señalización"){
	  	if(tipo!="ER")
	   	SeñalInteriorExterior.current.disabled=true
	   else
	   	SeñalInteriorExterior.current.disabled=false
	 }else if(nombre=="NumeroEconomico"){
	  	if(tipo!="ER")
	   	Economico.current.disabled=true
	   else
	   	Economico.current.disabled=false
	 }else if(nombre=="Laminación"){
	  	if(tipo!="ER")
	   	LaminacionPinturaExterior.current.disabled=true
	   else
	   	LaminacionPinturaExterior.current.disabled=false
	 }else if(nombre=="Defensas"){
	  	if(tipo!="ER")
	   	Defensas.current.disabled=true
	   else
	   	Defensas.current.disabled=false
	 }else if(nombre=="Chasis"){
	  	if(tipo!="ER")
	   	 ChasisGancho.current.disabled=true
	   else
	   	ChasisGancho.current.disabled=false
	 }else if(nombre=="Puertas"){
	  	if(tipo!="ER")
	   	Puertas.current.disabled=true
	   else
	   	Puertas.current.disabled=false
	 }else if(nombre=="CristalesParabrisas"){
	  	if(tipo!="ER")
	   	CristalesParabrisas.current.disabled=true
	   else
	   	CristalesParabrisas.current.disabled=false
	 }else if(nombre=="Limpiaparabrisas"){
	  	if(tipo!="ER")
	   	Limpiaparabrisas.current.disabled=true
	   else
	   	Limpiaparabrisas.current.disabled=false
	 }else if(nombre=="CristalesVentanillas"){
	  	if(tipo!="ER")
	   	CristalesVentanillas.current.disabled=true
	   else
	   	CristalesVentanillas.current.disabled=false
	 }else if(nombre=="CristalMedallon"){
	  	if(tipo!="ER")
	   	CristalMedallon.current.disabled=true
	   else
	   	CristalMedallon.current.disabled=false
	 }else if(nombre=="Espejos"){
	  	if(tipo!="ER")
	   	Espejos.current.disabled=true
	   else
	   	Espejos.current.disabled=false
	 }else if(nombre=="Visera"){
	  	if(tipo!="ER")
	   	Visera.current.disabled=true
	   else
	   	Visera.current.disabled=false
	 }else if(nombre=="AsientoConductor"){
	  	if(tipo!="ER")
	   	AsientoConductor.current.disabled=true
	   else
	   	AsientoConductor.current.disabled=false
	 }else if(nombre=="AsientosPasajeros"){
	  	if(tipo!="ER")
	   	AsientosPasajeros.current.disabled=true
	   else
	   	AsientosPasajeros.current.disabled=false
	 }else if(nombre=="ElementosSujección"){
	  	if(tipo!="ER")
	   	ElementosSujección.current.disabled=true
	   else
	   	ElementosSujección.current.disabled=false
	 }else if(nombre=="Escotillas"){
	  	if(tipo!="ER")
	   	Escotillas.current.disabled=true
	   else
	   	Escotillas.current.disabled=false
	 }else if(nombre=="Extintores"){
	  	if(tipo!="ER")
	   	Extintores.current.disabled=true
	   else
	   	Extintores.current.disabled=false
	 }else if(nombre=="Botiquin"){
	  	if(tipo!="ER")
	   	Botiquin.current.disabled=true
	   else
	   	Botiquin.current.disabled=false
	 }else if(nombre=="AccesoriosSeguridad"){
	  	if(tipo!="ER")
	   	AccesoriosSeguridad.current.disabled=true
	   else
	   	AccesoriosSeguridad.current.disabled=false
	 }else if(nombre=="Pisos"){
	  	if(tipo!="ER")
	   	Pisos.current.disabled=true
	   else
	   	Pisos.current.disabled=false
	 }else if(nombre=="Articulación"){
	  	if(tipo!="ER")
	   	Articulacion.current.disabled=true
	   else
	   	Articulacion.current.disabled=false
	 }else if(nombre=="Motor"){
	  	if(tipo!="ER")
	   	Motor2.current.disabled=true
	   else
	   	Motor2.current.disabled=false
	 }else if(nombre=="SistemaAireComprimido"){
	  	if(tipo!="ER")
	   	AireComprimido.current.disabled=true
	   else
	   	AireComprimido.current.disabled=false
	 }else if(nombre=="SistemaHibrido"){
	  	if(tipo!="ER")
	   	Hibrido.current.disabled=true
	   else
	   	Hibrido.current.disabled=false
	 }else if(nombre=="Transmisión"){
	  	if(tipo!="ER")
	   	Transmision2.current.disabled=true
	   else
	   	Transmision2.current.disabled=false
	 }else if(nombre=="SistemaEnfriamiento"){
	  	if(tipo!="ER")
	   	Enfriamiento.current.disabled=true
	   else
	   	Enfriamiento.current.disabled=false
	 }else if(nombre=="IgniciónAutobus"){
	  	if(tipo!="ER")
	   	Ignicion.current.disabled=true
	   else
	   	Ignicion.current.disabled=false
	 }else if(nombre=="PanelInstrumentos"){
	  	if(tipo!="ER")
	   	Tablero.current.disabled=true
	   else
	   	Tablero.current.disabled=false
	 }else if(nombre=="SistemaEléctrico"){
	  	if(tipo!="ER")
	   	Electrico.current.disabled=true
	   else
	   	Electrico.current.disabled=false
	 }else if(nombre=="LetreroRuta"){
	  	if(tipo!="ER")
	   	LetreroRuta.current.disabled=true
	   else
	   	LetreroRuta.current.disabled=false
	 }else if(nombre=="Claxon"){
	  	if(tipo!="ER")
	   	Claxon.current.disabled=true
	   else
	   	Claxon.current.disabled=false
	 }else if(nombre=="SistemaDesempañante"){
	  	if(tipo!="ER")
	   	SistemaDesempañante.current.disabled=true
	   else
	   	SistemaDesempañante.current.disabled=false
	 }else if(nombre=="SistemaAC"){
	  	if(tipo!="ER")
	   	SistemaAire.current.disabled=true
	   else
	   	SistemaAire.current.disabled=false
	 }else if(nombre=="Extractores"){
	  	if(tipo!="ER")
	   	Extractores.current.disabled=true
	   else
	   	Extractores.current.disabled=false
	 }else if(nombre=="Alumbrado"){
	  	if(tipo!="ER")
	   	AlumbradoEI.current.disabled=true
	   else
	   	AlumbradoEI.current.disabled=false
	 }else if(nombre=="Frenos"){
	  	if(tipo!="ER")
	   	Frenos.current.disabled=true
	   else
	   	Frenos.current.disabled=false
	 }else if(nombre=="CajaDireccion"){
	  	if(tipo!="ER")
	   	CajaDireccion.current.disabled=true
	   else
	   	CajaDireccion.current.disabled=false
	 }else if(nombre=="Suspensión"){
	  	if(tipo!="ER")
	   	Suspensión.current.disabled=true
	   else
	   	Suspensión.current.disabled=false
	 }else if(nombre=="TuboEscape"){
	  	if(tipo!="ER")
	   	TuboEscape.current.disabled=true
	   else
	   	TuboEscape.current.disabled=false
	 }else if(nombre=="SistemaRecaudo"){
	  	if(tipo!="ER")
	   	SistemaRecaudo.current.disabled=true
	   else
	   	SistemaRecaudo.current.disabled=false
	 }else if(nombre=="SistemaTelematica"){
	  	if(tipo!="ER")
	   	SistemaTelematica.current.disabled=true
	   else
	   	SistemaTelematica.current.disabled=false
	 }else if(nombre=="TanqueCombustible"){
	  	if(tipo!="ER")
	   	TanqueCombustible.current.disabled=true
	   else
	   	TanqueCombustible.current.disabled=false
	 }else if(nombre=="Neumáticos"){
	  	if(tipo!="ER")
	   	NeumaticoSisControl.current.disabled=true
	   else
	   	NeumaticoSisControl.current.disabled=false
	 }
	}

	const Validaciones = (event) => {

	    const nombre = event.currentTarget.id;
	    const valor = event.currentTarget.value;
	    console.log(nombre);

	    if(nombre=='EmpresaOperadora'){
	      if(!/^[A-Za-z0-9áéíóúÁÉÍÓÚ\-'\s]+$/i.test(valor)){
	        errorEmpresaO.current = "La empresa operadora solo admite letras.";
	        EmpresaOperadora.current.error=true;
	        setMensajes("");
	      }
	      else{
	        errorEmpresaO.current = "";
	        EmpresaOperadora.current.error=false;
	        setMensajes("a");
	      		}
	      }		

		else if(nombre=='Modelo'){
	      if(!/^[A-Za-z0-9áéíóúÁÉÍÓÚ'\s]+$/i.test(valor)){
	        errorModelo.current = "El modelo no admite caracteres especiales.";
	        Modelo.current.error=true;
	        setMensajes("b");
	      }
	      else{
	        errorModelo.current = "";
	        Modelo.current.error=false;
	        setMensajes("c");
	      }
	    }

	    else if(nombre=='Año'){
	      if(!/^[0-9]+$/i.test(valor)){
	        errorAño.current = "El año solo admite números.";
	        Año.current.error=true;
	        setMensajes("d");
	      }
	      else{
	        errorAño.current = "";
	        Año.current.error=false;
	        setMensajes("e");
	      }
	    }

	    else if(nombre=='Motor'){
	      if(!/^[A-Za-z0-9. ]+$/i.test(valor)){
	        errorMotor.current = "El motor no admite caracteres especiales.";
	        Motor.current.error=true;
	        setMensajes("f");
	      }
	      else{
	        errorMotor.current = "";
	        Motor.current.error=false;
	        setMensajes("g");
	      }
	    }

	    else if(nombre=='MotorE'){
	      if(!/^[A-Za-z0-9. ]+$/i.test(valor)){
	        errorMotorE.current = "El motor eléctrico no admite caracteres especiales.";
	        MotorElectrico.current.error=true;
	        setMensajes("h");
	      }
	      else{
	        errorMotorE.current = "";
	        MotorElectrico.current.error=false;
	        setMensajes("i");
	      }
	    }

	    else if(nombre=='Chasis'){
	      if(!/^[A-Za-z0-9]+$/i.test(valor)){
	        errorChasis.current = "El chasis no admite caracteres especiales.";
	        Chasis.current.error=true;
	        setMensajes("j");
	      }
	      else{
	        errorChasis.current = "";
	        Chasis.current.error=false;
	        setMensajes("k");
	      }
	    }

	    else if(nombre=='Carroceria'){
	      if(!/^[A-Za-z0-9. ]+$/i.test(valor)){
	        errorCarroc.current = "La carrocería no admite caracteres especiales.";
	        Carroceria.current.error=true;
	        setMensajes("l");
	      }
	      else{
	        errorCarroc.current = "";
	        Carroceria.current.error=false;
	        setMensajes("m");
	      }
	    }

	    else if(nombre=='Transmision'){
	      if(!/^[A-Za-z0-9]+$/i.test(valor)){
	        errorTransmi.current = "La transmisión solo admite números.";
	        Transmision.current.error=true;
	        setMensajes("n");
	      }
	      else{
	        errorTransmi.current = "";
	        Transmision.current.error=false;
	        setMensajes("o");
	      }
	    }

	    else if(nombre=='Odometro'){
	      if(!/^[0-9. ]+$/i.test(valor)){
	        errorOdometro.current = "La lectura del odómetro solo admite números.";
	        LecturaOdometro.current.error=true;
	        setMensajes("p");
	      }
	      else{
	        errorOdometro.current = "";
	        LecturaOdometro.current.error=false;
	        setMensajes("q");
	      }
	    }

	    else if(nombre=='TipoAuto'){
	      if(!/^[A-Za-záéíóúÁÉÍÓÚ0-9.\s]+$/i.test(valor)){
	        errorTipoAuto.current = "El tipo de autobús no admite caracteres especiales.";
	        TipoAutobus.current.error=true;
	        setMensajes("r"); 
	      }
	      else{
	        errorTipoAuto.current = "";
	        TipoAutobus.current.error=false;
	        setMensajes("s");
	      }
	    }
	
	}  

	const prueba = (event) => {

	  const nombre = event.currentTarget.childNodes[0].childNodes[0].childNodes[0].name
	  const tipo = event.currentTarget.childNodes[0].childNodes[0].childNodes[0].value

	  console.log(nombre)
	  console.log(tipo)
	  if(nombre=="Señalización"){
	  	if(tipo!="ER")
	   	SeñalInteriorExterior.current.disabled=true
	   else
	   	SeñalInteriorExterior.current.disabled=false
	 }else if(nombre=="NumeroEconomico"){
	  	if(tipo!="ER")
	   	Economico.current.disabled=true
	   else
	   	Economico.current.disabled=false
	 }else if(nombre=="Laminación"){
	  	if(tipo!="ER")
	   	LaminacionPinturaExterior.current.disabled=true
	   else
	   	LaminacionPinturaExterior.current.disabled=false
	 }else if(nombre=="Defensas"){
	  	if(tipo!="ER")
	   	Defensas.current.disabled=true
	   else
	   	Defensas.current.disabled=false
	 }else if(nombre=="Chasis"){
	  	if(tipo!="ER")
	   	 ChasisGancho.current.disabled=true
	   else
	   	ChasisGancho.current.disabled=false
	 }else if(nombre=="Puertas"){
	  	if(tipo!="ER")
	   	Puertas.current.disabled=true
	   else
	   	Puertas.current.disabled=false
	 }else if(nombre=="CristalesParabrisas"){
	  	if(tipo!="ER")
	   	CristalesParabrisas.current.disabled=true
	   else
	   	CristalesParabrisas.current.disabled=false
	 }else if(nombre=="Limpiaparabrisas"){
	  	if(tipo!="ER")
	   	Limpiaparabrisas.current.disabled=true
	   else
	   	Limpiaparabrisas.current.disabled=false
	 }else if(nombre=="CristalesVentanillas"){
	  	if(tipo!="ER")
	   	CristalesVentanillas.current.disabled=true
	   else
	   	CristalesVentanillas.current.disabled=false
	 }else if(nombre=="CristalMedallon"){
	  	if(tipo!="ER")
	   	CristalMedallon.current.disabled=true
	   else
	   	CristalMedallon.current.disabled=false
	 }else if(nombre=="Espejos"){
	  	if(tipo!="ER")
	   	Espejos.current.disabled=true
	   else
	   	Espejos.current.disabled=false
	 }else if(nombre=="Visera"){
	  	if(tipo!="ER")
	   	Visera.current.disabled=true
	   else
	   	Visera.current.disabled=false
	 }else if(nombre=="AsientoConductor"){
	  	if(tipo!="ER")
	   	AsientoConductor.current.disabled=true
	   else
	   	AsientoConductor.current.disabled=false
	 }else if(nombre=="AsientosPasajeros"){
	  	if(tipo!="ER")
	   	AsientosPasajeros.current.disabled=true
	   else
	   	AsientosPasajeros.current.disabled=false
	 }else if(nombre=="ElementosSujección"){
	  	if(tipo!="ER")
	   	ElementosSujección.current.disabled=true
	   else
	   	ElementosSujección.current.disabled=false
	 }else if(nombre=="Escotillas"){
	  	if(tipo!="ER")
	   	Escotillas.current.disabled=true
	   else
	   	Escotillas.current.disabled=false
	 }else if(nombre=="Extintores"){
	  	if(tipo!="ER")
	   	Extintores.current.disabled=true
	   else
	   	Extintores.current.disabled=false
	 }else if(nombre=="Botiquin"){
	  	if(tipo!="ER")
	   	Botiquin.current.disabled=true
	   else
	   	Botiquin.current.disabled=false
	 }else if(nombre=="AccesoriosSeguridad"){
	  	if(tipo!="ER")
	   	AccesoriosSeguridad.current.disabled=true
	   else
	   	AccesoriosSeguridad.current.disabled=false
	 }else if(nombre=="Pisos"){
	  	if(tipo!="ER")
	   	Pisos.current.disabled=true
	   else
	   	Pisos.current.disabled=false
	 }else if(nombre=="Articulación"){
	  	if(tipo!="ER")
	   	Articulacion.current.disabled=true
	   else
	   	Articulacion.current.disabled=false
	 }else if(nombre=="Motor"){
	  	if(tipo!="ER")
	   	Motor2.current.disabled=true
	   else
	   	Motor2.current.disabled=false
	 }else if(nombre=="SistemaAireComprimido"){
	  	if(tipo!="ER")
	   	AireComprimido.current.disabled=true
	   else
	   	AireComprimido.current.disabled=false
	 }else if(nombre=="SistemaHibrido"){
	  	if(tipo!="ER")
	   	Hibrido.current.disabled=true
	   else
	   	Hibrido.current.disabled=false
	 }else if(nombre=="Transmisión"){
	  	if(tipo!="ER")
	   	Transmision2.current.disabled=true
	   else
	   	Transmision2.current.disabled=false
	 }else if(nombre=="SistemaEnfriamiento"){
	  	if(tipo!="ER")
	   	Enfriamiento.current.disabled=true
	   else
	   	Enfriamiento.current.disabled=false
	 }else if(nombre=="IgniciónAutobus"){
	  	if(tipo!="ER")
	   	Ignicion.current.disabled=true
	   else
	   	Ignicion.current.disabled=false
	 }else if(nombre=="PanelInstrumentos"){
	  	if(tipo!="ER")
	   	Tablero.current.disabled=true
	   else
	   	Tablero.current.disabled=false
	 }else if(nombre=="SistemaEléctrico"){
	  	if(tipo!="ER")
	   	Electrico.current.disabled=true
	   else
	   	Electrico.current.disabled=false
	 }else if(nombre=="LetreroRuta"){
	  	if(tipo!="ER")
	   	LetreroRuta.current.disabled=true
	   else
	   	LetreroRuta.current.disabled=false
	 }else if(nombre=="Claxon"){
	  	if(tipo!="ER")
	   	Claxon.current.disabled=true
	   else
	   	Claxon.current.disabled=false
	 }else if(nombre=="SistemaDesempañante"){
	  	if(tipo!="ER")
	   	SistemaDesempañante.current.disabled=true
	   else
	   	SistemaDesempañante.current.disabled=false
	 }else if(nombre=="SistemaAC"){
	  	if(tipo!="ER")
	   	SistemaAire.current.disabled=true
	   else
	   	SistemaAire.current.disabled=false
	 }else if(nombre=="Extractores"){
	  	if(tipo!="ER")
	   	Extractores.current.disabled=true
	   else
	   	Extractores.current.disabled=false
	 }else if(nombre=="Alumbrado"){
	  	if(tipo!="ER")
	   	AlumbradoEI.current.disabled=true
	   else
	   	AlumbradoEI.current.disabled=false
	 }else if(nombre=="Frenos"){
	  	if(tipo!="ER")
	   	Frenos.current.disabled=true
	   else
	   	Frenos.current.disabled=false
	 }else if(nombre=="CajaDireccion"){
	  	if(tipo!="ER")
	   	CajaDireccion.current.disabled=true
	   else
	   	CajaDireccion.current.disabled=false
	 }else if(nombre=="Suspensión"){
	  	if(tipo!="ER")
	   	Suspensión.current.disabled=true
	   else
	   	Suspensión.current.disabled=false
	 }else if(nombre=="TuboEscape"){
	  	if(tipo!="ER")
	   	TuboEscape.current.disabled=true
	   else
	   	TuboEscape.current.disabled=false
	 }else if(nombre=="SistemaRecaudo"){
	  	if(tipo!="ER")
	   	SistemaRecaudo.current.disabled=true
	   else
	   	SistemaRecaudo.current.disabled=false
	 }else if(nombre=="SistemaTelematica"){
	  	if(tipo!="ER")
	   	SistemaTelematica.current.disabled=true
	   else
	   	SistemaTelematica.current.disabled=false
	 }else if(nombre=="TanqueCombustible"){
	  	if(tipo!="ER")
	   	TanqueCombustible.current.disabled=true
	   else
	   	TanqueCombustible.current.disabled=false
	 }else if(nombre=="Neumáticos"){
	  	if(tipo!="ER")
	   	NeumaticoSisControl.current.disabled=true
	   else
	   	NeumaticoSisControl.current.disabled=false
	 }
	}

const submitValue = async() => {
	await Computo()
	history.replace("/Revisiones/Formatos")
}

	const Computo = (event) =>{
		//event.preventDefault();
		if(!Observaciones.current.value)
			Observaciones.current.value = "Ninguna"
		const formData = {

			RevTecInID: Carroceria.current.value,
			EmpresaOperadora : EmpresaOperadora.current.value,
			Año : Año.current.value,
			MotorElectrico : MotorElectrico.current.value,
			Carroceria : Carroceria.current.value,
			LecturaOdometro : LecturaOdometro.current.value,
			Modelo : Modelo.current.value,
			Motor : Motor.current.value,
			Chasis : Chasis.current.value,
			Transmision : Transmision.current.value,
			Tipo : TipoAutobus.current.value,
			Fecha: FechaRef.current.value,

			SeñalInteriorExterior : SeñalInteriorExterior.current.value,
			SeñalInteriorExteriorValue : forms.Señalización,
			Economico : Economico.current.value,
			EconomicoValue : forms.NumeroEconomico,
			LaminacionPinturaExterior : LaminacionPinturaExterior.current.value,
			LaminaciónPinturaExteriorValue : forms.Laminación,
			Defensas : Defensas.current.value,
			DefensasValue : forms.Defensas,
			ChasisGancho : ChasisGancho.current.value,
			ChasisValue : forms.Chasis,
			Puertas : Puertas.current.value,
			PuertasValue: forms.Puertas,
			CristalesParabrisas : CristalesParabrisas.current.value,
			CristalesParabrisasValue : forms.CristalesParabrisas,
			Limpiaparabrisas : Limpiaparabrisas.current.value,
			LimpiaparabrisasValue : forms.Limpiaparabrisas,
			CristalesVentanillas : CristalesVentanillas.current.value,
			CristalesVentanillasValue : forms.CristalesVentanillas,
			CristalMedallon : CristalMedallon.current.value,
			CristalMedallonValue : forms.CristalMedallon,
			Espejos : Espejos.current.value,
			EspejosValue : forms.Espejos,
			Visera : Visera.current.value,
			ViseraValue : forms.Visera, 
			AsientoConductor : AsientoConductor.current.value,
			AsientoConductorValue : forms.AsientoConductor,
			AsientosPasajeros : AsientosPasajeros.current.value,
			AsientosPasajerosValue : forms.AsientosPasajeros,
			ElementosSujección : ElementosSujección.current.value,
			ElementosSujecciónValue : forms.ElementosSujección,
			Escotillas : Escotillas.current.value,
			EscotillasValue : forms.Escotillas,
			Extintores : Extintores.current.value,
			ExtintoresValue : forms.Extintores,
			Botiquin : Botiquin.current.value,
			BotiquinValue : forms.Botiquin,
			AccesoriosSeguridad : AccesoriosSeguridad.current.value,
			AccesoriosSeguridadValue : forms.AccesoriosSeguridad,
			Pisos : Pisos.current.value,
			PisosValue : forms.Pisos,
			Articulacion : Articulacion.current.value,
			ArticulaciónValue : forms.Articulación,
			Motor2 : Motor2.current.value,
			Motor2Value : forms.Motor,
			AireComprimido : AireComprimido.current.value,
			AirecomprimidoValue : forms.SistemaAireComprimido,
			Hibrido : Hibrido.current.value,
			HibridoValue : forms.SistemaHibrido,
			Transmision2 : Transmision2.current.value,
			Transmision2Value : forms.Transmisión,
			Enfriamiento : Enfriamiento.current.value,
			EnfriamientoValue : forms.SistemaEnfriamiento,
			Ignicion : Ignicion.current.value,
			IgnicionValue : forms.IgniciónAutobus,
			Tablero : Tablero.current.value,
			TableroValue : forms.PanelInstrumentos,
			Electrico : Electrico.current.value,
			ElectricoValue : forms.SistemaEléctrico,
			LetreroRuta : LetreroRuta.current.value,
			LetreroRutaValue : forms.LetreroRuta,
			Claxon : Claxon.current.value,
			ClaxonValue : forms.Claxon,
			SistemaDesempañante : SistemaDesempañante.current.value,
			SistemaDesempañanteValue : forms.SistemaDesempañante,
			SistemaAire : SistemaAire.current.value,
			SistemaAireValue: forms.SistemaAC,
			Extractores : Extractores.current.value,
			ExtractoresValue : forms.Extractores,
			AlumbradoEI : AlumbradoEI.current.value,
			AlumbradoEIValue : forms.Alumbrado,
			Frenos : Frenos.current.value,
			FrenosValue : forms.Frenos,
			CajaDireccion : CajaDireccion.current.value,
			CajaDireccionValue : forms.CajaDireccion,
			Suspensión : Suspensión.current.value,
			SuspensiónValue : forms.Suspensión,
			TuboEscape : TuboEscape.current.value,
			TuboEscapeValue : forms.TuboEscape,
			SistemaRecaudo : SistemaRecaudo.current.value,
			SistemaRecaudoValue : forms.SistemaRecaudo,
			SistemaTelematica : SistemaTelematica.current.value,
			SistemaTelematicaValue : forms.SistemaTelematica,
			TanqueCombustible : TanqueCombustible.current.value,
			TanqueCombustibleValue : forms.TanqueCombustible,
			NeumaticoSisControl : NeumaticoSisControl.current.value,
			NeumaticoSisControlValue : forms.Neumáticos,
			Observaciones : Observaciones.current.value
		}

		formRegisterA(formData).then(response =>{
			
		})
		formRegisterE(formData).then(response =>{
				
		})

		console.log("Primero:"+forms.NumeroEconomico);
		console.log("Segundo:"+formData.EconomicoValue);
		console.log(formData.Fecha)
		formRegisterF(formData).then(response => {
//			swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success");
			//history.replace('/Revisiones/Formatos') 
		})
	
		formRegisterCompleto(formData).then(response =>{
//			swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success");
			console.log("Datos completos")
		})
		swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success");		
//		history.replace("/Revisiones/Formatos")
		//save()
	}
  return (
    <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            Cédula de Revisión Técnica Inicial
          </Typography>
		  <Typography component="h1" variant="h5" align="left">
		 	 {fecha}
		  </Typography>
          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableBody>
				  
					<TableRow>
					<StyledTableCell>I. Empresa Operadora</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="EmpresaOperadora" 
							inputRef = {EmpresaOperadora}
							error={EmpresaOperadora.current.error}
               				helperText={errorEmpresaO.current}
                			onBlur={Validaciones} 
                			required
						/>
						</TableCell>
					  <StyledTableCell>VI. Modelo</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="Modelo" 
					  		inputRef = {Modelo}
					  		error={Modelo.current.error}
               				helperText={errorModelo.current}
                			onBlur={Validaciones} 
                			required 
					  	/>
					  </TableCell>
					</TableRow>			
				</TableBody>
				
				<TableRow>
					  <StyledTableCell>II. Año</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="Año" 
							inputRef = {Año}
							error={Año.current.error}
               				helperText={errorAño.current}
                			onBlur={Validaciones} 
                			required 
						/>
						</TableCell>
					  <StyledTableCell>VII. Motor No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="Motor" 
					  		inputRef = {Motor}
					  		error={Motor.current.error}
               				helperText={errorMotor.current}
                			onBlur={Validaciones} 
                			required 
					  		/>
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <StyledTableCell>III. Motor Eléctrico No.</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="MotorE"  
							inputRef = {MotorElectrico}
							error={MotorElectrico.current.error}
               				helperText={errorMotorE.current}
                			onBlur={Validaciones} 
                			required 
						/>
						</TableCell>
					  <StyledTableCell>VIII. Chasis No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="Chasis" 
					  		inputRef = {Chasis}
					  		error={Chasis.current.error}
               				helperText={errorChasis.current}
                			onBlur={Validaciones} 
                			required  
					  	/>
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <StyledTableCell>IV. Carrocería No.</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="Carroceria"  
							inputRef = {Carroceria}
							error={Carroceria.current.error}
               				helperText={errorCarroc.current}
                			onBlur={Validaciones} 
                			required 
						/>
						</TableCell>
					  <StyledTableCell>IX. Transmisión No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="Transmision" 
					  		inputRef = {Transmision}
					  		error={Transmision.current.error}
               				helperText={errorTransmi.current}
                			onBlur={Validaciones} 
                			required  
					  	/>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <StyledTableCell>V. Lectura del Odómetro.</StyledTableCell>
					  <TableCell align="right">
						<TextField 
							id="Odometro"  
							inputRef = {LecturaOdometro}
							error={LecturaOdometro.current.error}
               				helperText={errorOdometro.current}
                			onBlur={Validaciones} 
                			required 
						/>
						</TableCell>
					  <StyledTableCell>X. Tipo de autobús</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		id="TipoAuto" 
					  		inputRef = {TipoAutobus} 
					  		error={TipoAutobus.current.error}
               				helperText={errorTipoAuto.current}
                			onBlur={Validaciones} 
                			required 
					  	/>
					  </TableCell>
					</TableRow>	
					<TableRow>
                        <StyledTableCell>XI. Fecha</StyledTableCell>
                        <TableCell>
                        <Typography component="h1" align="right">
            <TextField      
                id=""
                type="date"
                defaultValue={fecha}
		inputRef = {FechaRef}
                className={classes.textField}
                InputLabelProps={{shrink: true,}}
            />
            </Typography>  
                        </TableCell>
                    </TableRow>
			  </Table>
			</TableContainer>			 							
           </Grid>
          </form>

          <br></br>
          <br></br>

          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<StyledTableCell>No.</StyledTableCell>
					<StyledTableCell align="left">Descripción</StyledTableCell>
					<StyledTableCell align="left">Estado</StyledTableCell>
					<StyledTableCell
					align="left">Funcionamiento</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  
					<TableRow>
					  <TableCell component="th" scope="row">
					  	1
					  </TableCell>
					  <TableCell align="left">
						Señalización interior y exterior
						</TableCell>
					  <TableCell align="left">
						  <RadioGroup aria-label="" name="Señalización"  onChange={HandleRadioChange} row>
		  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
		  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
		  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1" inputRef = {SeñalInteriorExterior}/>
					  </TableCell>
					</TableRow>			
				</TableBody>
				
				<TableRow>
					  <TableCell component="th" scope="row">
					  2
					  </TableCell>
					  <TableCell align="left">
					  Número económico de la unidad
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="NumeroEconomico"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>		
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Economico}/>
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <TableCell component="th" scope="row">
					  3
					  </TableCell>
					  <TableCell align="left">
					  Laminación y pintura exterior e interior de la unidad
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Laminación"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>		
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {LaminacionPinturaExterior} />
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <TableCell component="th" scope="row">
					  4
					  </TableCell>
					  <TableCell align="left">
					  Defensas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Defensas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Defensas} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  5
					  </TableCell>
					  <TableCell align="left">
					  Chasis y gancho de arrastre
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Chasis"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>		
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1"  inputRef = {ChasisGancho} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  6
					  </TableCell>
					  <TableCell align="left">
					  Puertas
						</TableCell>
					  <TableCell align="left">
					  	<RadioGroup aria-label="" name="Puertas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Puertas} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  7
					  </TableCell>
					  <TableCell align="left">
					  Cristales del parabrisas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="CristalesParabrisas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1"  inputRef = {CristalesParabrisas} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  8
					  </TableCell>
					  <TableCell align="left">
						Limpiaparabrisas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Limpiaparabrisas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Limpiaparabrisas} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  9
					  </TableCell>
					  <TableCell align="left">
						Cristales de ventanillas, ventilas y emergencia
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="CristalesVentanillas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {CristalesVentanillas} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  10
					  </TableCell>
					  <TableCell align="left">
					  Cristal de medallón
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="CristalMedallon" onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {CristalMedallon} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  11
					  </TableCell>
					  <TableCell align="left">
					  Espejos
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Espejos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Espejos} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  12
					  </TableCell>
					  <TableCell align="left">
					  Visera o parasol
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Visera"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Visera} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  13
					  </TableCell>
					  <TableCell align="left">
					  Asiento del conductor
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="AsientoConductor"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {AsientoConductor} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  14
					  </TableCell>
					  <TableCell align="left">
					  Asientos de pasajeros
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="AsientosPasajeros"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {AsientosPasajeros} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  15
					  </TableCell>
					  <TableCell align="left">
						Elementos de sujección
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="ElementosSujección"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {ElementosSujección} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  16
					  </TableCell>
					  <TableCell align="left">
					  Escotillas o fallebas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Escotillas"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Escotillas} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  17
					  </TableCell>
					  <TableCell align="left">
					  Extintores
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Extintores"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto"/>
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto"/>
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica"/>
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Extintores} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  18
					  </TableCell>
					  <TableCell align="left">
				      Botiquín
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Botiquin"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Botiquin} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  19
					  </TableCell>
					  <TableCell align="left">
					  Accesorios de seguridad vial
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="AccesoriosSeguridad"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {AccesoriosSeguridad} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  20
					  </TableCell>
					  <TableCell align="left">
					  Pisos
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Pisos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Pisos} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  21
					  </TableCell>
					  <TableCell align="left">
					  Articulación
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Articulación"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Articulacion} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  22
					  </TableCell>
					  <TableCell align="left">
					  Motor
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Motor"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Motor2} />
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <TableCell component="th" scope="row">
					  23
					  </TableCell>
					  <TableCell align="left">
					  Sistema de aire comprimido
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaAireComprimido"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {AireComprimido} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  24
					  </TableCell>
					  <TableCell align="left">
					  Sistema Híbrido
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaHibrido" onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Hibrido} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  25
					  </TableCell>
					  <TableCell align="left">
					  Transmisión
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Transmisión"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Transmision2} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  26
					  </TableCell>
					  <TableCell align="left">
					  Sistema de enfriamiento
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaEnfriamiento"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Enfriamiento} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  27
					  </TableCell>
					  <TableCell align="left">
					  Ignición del autobús
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="IgniciónAutobus"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Ignicion} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  28
					  </TableCell>
					  <TableCell align="left">
					  Panel o Tablero de instrumentos
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="PanelInstrumentos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Tablero} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  29
					  </TableCell>
					  <TableCell align="left">
					  Sistema eléctrico
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaEléctrico"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Electrico} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  30
					  </TableCell>
					  <TableCell align="left">
					  Letrero electrónico de ruta
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="LetreroRuta"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {LetreroRuta} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  31
					  </TableCell>
					  <TableCell align="left">
					  Claxon
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Claxon"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Claxon} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  32
					  </TableCell>
					  <TableCell align="left">
					  Sistema desempañante del parabrisas
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaDesempañante"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {SistemaDesempañante} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  33
					  </TableCell>
					  <TableCell align="left">
					  Sistema de aire acondicionado
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaAC"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {SistemaAire} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  34
					  </TableCell>
					  <TableCell align="left">
					  Extractores y ventiladores
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Extractores"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Extractores} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  35
					  </TableCell>
					  <TableCell align="left">
					  Alumbrado exterior e interior
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Alumbrado"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {AlumbradoEI} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  36
					  </TableCell>
					  <TableCell align="left">
					  Frenos
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Frenos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Frenos} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  37
					  </TableCell>
					  <TableCell align="left">
					  Caja de Dirección y Soportes 
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="CajaDireccion"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {CajaDireccion} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  38
					  </TableCell>
					  <TableCell align="left">
					  Suspensión
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Suspensión"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {Suspensión} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  39
					  </TableCell>
					  <TableCell align="left">
					  Tubo de escape y silenciador
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="TuboEscape"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {TuboEscape} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  40
					  </TableCell>
					  <TableCell align="left">
					  Sistema de recaudo
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaRecaudo"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {SistemaRecaudo} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  41
					  </TableCell>
					  <TableCell align="left">
					  Sistema de telemática
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="SistemaTelematica"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {SistemaTelematica} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  42
					  </TableCell>
					  <TableCell align="left">
					  Tanque de combustible y Urea
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="TanqueCombustible"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {TanqueCombustible} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  43
					  </TableCell>
					  <TableCell align="left">
					  Neumáticos y sistemas de control de presión
						</TableCell>
					  <TableCell align="left">
					  <RadioGroup aria-label="" name="Neumáticos"  onChange={HandleRadioChange} row>
	  					  <FormControlLabel value="AC" control={<Radio />} label="Correcto" />
	  					  <FormControlLabel value="ER" control={<Radio />} label="Incorrecto" />
	  					  <FormControlLabel value="NA" control={<Radio />} label="No Aplica" />
						  </RadioGroup>	
					  </TableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" inputRef = {NeumaticoSisControl} />
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	Observaciones
					  </TableCell>
					  <TableCell align="left" colspan="3">
					  <TextField fullWidth="true" id="desc1" inputRef = {Observaciones} />
					  </TableCell>

					</TableRow>
			  </Table>
			</TableContainer>			 							
           </Grid>
	<Button
                            width= "25%"
                            align= "left"
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            type="submit"
                            onClick={()=> {
			    	history.push('/Revisiones/Formatos')
			    }}>
                          Anterior
                    </Button>	
			<Button
		            width= "25%"
		            align= "right"
		            variant="contained"
		            color="secondary"
			    style={{float: 'right'}}
		            className={classes.submit}
		            
		            onClick={submitValue}>
		          Siguiente    
		    </Button>
          </form>
				
            
        </div>
	</Container>	
  );
}
const rootElement = document.getElementById("root");
