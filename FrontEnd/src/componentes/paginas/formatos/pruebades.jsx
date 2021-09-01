import React, {useEffect,useRef,useState} from 'react';
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TrainIcon from '@material-ui/icons/TrainOutlined'; 
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
import { useHistory } from "react-router-dom";
//import TimePicker from 'react-time-picker';
import swal from 'sweetalert';
import Input from '@material-ui/core/Input';
import { sendDataFa } from '../../Functions/FallasDuranteOperacion'
import { sendDataP } from '../../Functions/PruebasDeDesempeños'
import { sendDataE } from '../../Functions/Estatus'
import { sendDataLI } from '../../Functions/EstadoDeLlantasInicial'
import { sendDataLF } from '../../Functions/EstadoDeLlantasFinal'
import { sendDataF } from '../../Functions/DatosFinales'
import { sendDataI } from '../../Functions/DatosIniciales'
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
} */
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
	  
function createData( elemento, cantidad) {
  return { elemento, cantidad};
}

function createData2(elemento){
    return {elemento}
}
/*  const [nombre, setNombre] = useState([]);
 const [cargo, setCargo] = useState([]);
  const [departamento, setDepartamento] = useState([]);
*/
	function getCurrentDate(separator='-'){
		let newDate = new Date()
		let date = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();
		return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
//		return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
	}
	function getCurrentYear(separator=''){

        let newDate = new Date()
        let year = newDate.getFullYear();
        return `${year}`
 	}
	function getCurrentMonth(separator=''){
		let newDate = new Date()
		let month = newDate.getMonth() + 1;
		return `${month}`
	}
	const fecha = getCurrentDate();
	const año = getCurrentYear();
	const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	const month = meses[getCurrentMonth()-1];

const campos = [
    createData2('Lugar'),
    createData2('Tiempo real (hrs de salida)'),
    createData2('Presión de aceite de motor'),
    createData2('Presión de aire(lbs)'),
    createData2('Temperatura parcial ºC'),
    createData2('Voltaje'),
    createData2('1ra-2da(rpms)'),
    createData2('2da-3ra(rpms)'),
    createData2('3ra-4ta(rpms)'),
    createData2('4ta-5ta(rpms)'),
    createData2('5ta-6ta(rpms)'),
    createData2('Frenado brusco'),
    createData2('No. de activación al pedal de freno'),
    createData2('Porcentaje de pasajeros(%)'),    
];

export default function Almacen() {

	const [Mensajes, setMensajes] = useState([]);

	const NumeroEconomicoRef = useRef('')
	const EmpresaOperadoraRef = useRef('')
	const RutaRef = useRef('')
	const HoraInicial = useRef()
	const NiveldeDieselInicial = useRef('')
	const TemperaturaInicial = useRef('')
	const KilometrajeInicial = useRef('')
	const RendimientoInicial = useRef('')
	const CodigosActivosInicial = useRef('')
	const ProfundidadLlantaInicial = useRef([])
	const PresionNeumaticoInicial = useRef([])

	const Data = useRef([])
	const Lugar = useRef([])
	const TiempoReal = useRef([])
	const PresiondeAceitedeMotor = useRef([])
	const PresiondeAire = useRef([])
	const TemperaturaParcial = useRef([])
	const Voltaje = useRef([])
	const Primera = useRef([])
	const Segunda = useRef([])
	const Tercera = useRef([])
	const Cuarta = useRef([])
	const Quinta = useRef([])
	const FrenadoBrusco = useRef([])
	const ActivacionPedalFreno = useRef([])
	const PorcentajedePasajeros = useRef([])

	const HoraFinal = useRef()
	const NiveldeDieselFinal = useRef('')
	const TemperaturaFinal = useRef('')
	const KilometrajeFinal = useRef('')
	const RendimientoFinal = useRef('')
	const CodigosActivosFinal = useRef('')

	const ProfundidadLlantaFinal = useRef([])
	const PresionNeumaticoFinal = useRef([])
	
	const FallaOperacion = useRef([])

	const ElaboroRef = useRef()
	const RevisoRef = useRef()
	const VoRef = useRef()
	const [selectedDate, setSelectedDate] = useState();

	//Constantes de error Header
	const errorNumEco = useRef('')
	const errorEmpresaO = useRef('')
	const errorRuta = useRef('')

	//Constantes de error para datos iniciales
	const errorKilometraje = useRef('')
	const errorNivelDiesel = useRef('')
	const errorRendimiento = useRef('')
	const errorTemperatura = useRef('')
	const errorCodigosActi = useRef('')
	const errorData = useRef([])
	const TexterrorData = useRef([])

	//Constantes de error para datos finales
	const errorKilometrajeF = useRef('')
	const errorNivelDieselF = useRef('')
	const errorRendimientoF = useRef('')
	const errorTemperaturaF = useRef('')
	const errorCodigosActiF = useRef('')
	
	//Contantes de error para Profundidad de Llanta Inicial
	const errorProfundidadLlantaInicial = useRef([]);
	const TexterrorProfundidadLlantaInicial = useRef([]);
	
	//Contantes de error para Presion de Neumatico de Inicial
	const errorPresionNeumaticoInicial = useRef([]);
	const TexterrorPresionNeumaticoInicial = useRef([]);
	
	//Contantes de error para Profundidad de Llanta Final
	const errorProfundidadLlantaFinal = useRef([]);
	const TexterrorProfundidadLlantaFinal = useRef([]);
	
	//Contantes de error para Presion de Neumatico de Final
	const errorPresionNeumaticoFinal = useRef([]);
	const TexterrorPresionNeumaticoFinal = useRef([]);

	//Contantes de error para Fallas durante operación
	const errorFallaOperacion = useRef([])
	const TexterrorFallaOperacion = useRef([])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

	const Validaciones = (event) => {

	    console.log(event.currentTarget);
		const nombre = event.currentTarget.id;
	    const valor = event.currentTarget.value;
	    console.log(nombre);

	    //Condiciones para el header

	    if(nombre=='ecoID'){
	      if(!/^[0-9A-ZñÑa-z-. ]+$/i.test(valor)){
	        errorNumEco.current = "El número económico no acepta caracteres especiales.";
	        NumeroEconomicoRef.current.error=true;
	        setMensajes("");
	      }
	      else{
	        errorNumEco.current = "";
	        NumeroEconomicoRef.current.error=false;
	        setMensajes("a");
	      		}
	      }		

		else if(nombre=='empreOp'){
	      if(!/^[A-ZñÑa-z0-9áéíóúÁÉÍÓÚ\-\s]+$/i.test(valor)){
	        errorEmpresaO.current = "La empresa operadora solo admite letras.";
	        EmpresaOperadoraRef.current.error=true;
	        setMensajes("b");
	      }
	      else{
	        errorEmpresaO.current = "";
	        EmpresaOperadoraRef.current.error=false;
	        setMensajes("c");
	      		}
	      }

	      else if(nombre=='route'){
	      if(!/^[A-ZñÑa-z0-9ñÑáéíóúÁÉÍÓÚ\s-.,/]+$/i.test(valor)){
	        errorRuta.current = "La ruta solo admite letras.";
	        RutaRef.current.error=true;
	        setMensajes("d");
	      }
	      else{
	        errorRuta.current = "";
	        RutaRef.current.error=false;
	        setMensajes("e");
	      		}
	      }

	      //Condiciones para los datos iniciales

	      else if(nombre=='kilometraje'){
	      if(!/^[0-9.]+$/i.test(valor)){
	        errorKilometraje.current = "El kilometraje solo admite números.";
	        KilometrajeInicial.current.error=true;
	        setMensajes("f");
	      }
	      else{
	        errorKilometraje.current = "";
	        KilometrajeInicial.current.error=false;
	        setMensajes("g");
	      		}
	      }

	      else if(nombre=='diesel'){
	      if(!/^[0-9/\A-ZñÑa-z ]+$/i.test(valor)){
	        errorNivelDiesel.current = "El nivel de diesel solo admite números.";
	        NiveldeDieselInicial.current.error=true;
	        setMensajes("h");
	      }
	      else{
	        errorNivelDiesel.current = "";
	        NiveldeDieselInicial.current.error=false;
	        setMensajes("i");
	      		}
	      }

	      else if(nombre=='rendimiento'){
	      if(!/^[0-9. ]+$/i.test(valor)){
	        errorRendimiento.current = "El rendimiento solo admite números.";
	        RendimientoInicial.current.error=true;
	        setMensajes("j");
	      }
	      else{
	        errorRendimiento.current = "";
	        RendimientoInicial.current.error=false;
	        setMensajes("k");
	      		}
	      }

	      else if(nombre=='temperatura'){
	      if(!/^[0-9]+$/i.test(valor)){
	        errorTemperatura.current = "La temperatura solo admite números.";
	        TemperaturaInicial.current.error=true;
	        setMensajes("l");
	      }
	      else{
	        errorTemperatura.current = "";
	        TemperaturaInicial.current.error=false;
	        setMensajes("m");
	      		}
	      }

	      else if(nombre=='codActivos'){
	      if(!/^[A-ZñÑa-z0-9\s]+$/i.test(valor)){
	        errorCodigosActi.current = "Los códigos activos no aceptan caracteres especiales.";
	        CodigosActivosInicial.current.error=true;
	        setMensajes("n");
	      }
	      else{
	        errorCodigosActi.current = "";
	        CodigosActivosInicial.current.error=false;
	        setMensajes("o");
	      		}
	      }

	      //Condiciones para los datos finales

	      else if(nombre=='kilometrajeF'){
	      if(!/^[0-9]+$/i.test(valor)){
	        errorKilometrajeF.current = "El kilometraje solo admite números.";
	        KilometrajeFinal.current.error=true;
	        setMensajes("af");
	      }
	      else{
	        errorKilometrajeF.current = "";
	        KilometrajeFinal.current.error=false;
	        setMensajes("bf");
	      		}
	      }

	      else if(nombre=='dieselF'){
	      if(!/^[0-9/\A-ZñÑa-z ]+$/i.test(valor)){
	        errorNivelDieselF.current = "El nivel de diesel solo admite números.";
	        NiveldeDieselFinal.current.error=true;
	        setMensajes("cf");
	      }
	      else{
	        errorNivelDieselF.current = "";
	        NiveldeDieselFinal.current.error=false;
	        setMensajes("df");
	      		}
	      }

	      else if(nombre=='rendimientoF'){
	      if(!/^[0-9. ]+$/i.test(valor)){
	        errorRendimientoF.current = "El rendimiento solo admite números.";
	        RendimientoFinal.current.error=true;
	        setMensajes("ef");
	      }
	      else{
	        errorRendimientoF.current = "";
	        RendimientoFinal.current.error=false;
	        setMensajes("ff");
	      		}
	      }

	      else if(nombre=='temperaturaF'){
	      if(!/^[0-9]+$/i.test(valor)){
	        errorTemperaturaF.current = "La temperatura solo admite números.";
	        TemperaturaFinal.current.error=true;
	        setMensajes("gf");
	      }
	      else{
	        errorTemperaturaF.current = "";
	        TemperaturaFinal.current.error=false;
	        setMensajes("hf");
	      		}
	      }

	      else if(nombre=='codActivosF'){
			  if(!/^[A-ZñÑa-z0-9\s ]+$/i.test(valor)){
				errorCodigosActiF.current = "Los códigos activos solo aceptan letras.";
				CodigosActivosFinal.current.error=true;
				setMensajes("if");
			}
			  else{
				errorCodigosActiF.current = "";
				CodigosActivosFinal.current.error=false;
				setMensajes("jf");
	      	}
	      }else if(nombre=='PLI'){
			  const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorProfundidadLlantaInicial.current[index] = true;
				  TexterrorProfundidadLlantaInicial.current[index]="La profundidad del dibujo inicial solo admite números."
				  setMensajes(index+"kf");
			  }else{
				  errorProfundidadLlantaInicial.current[index] = false;
				  TexterrorProfundidadLlantaInicial.current[index]=""
				  setMensajes(index+"lf");
			  }
		  }else if(nombre=='PNI'){
			  const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorPresionNeumaticoInicial.current[index] = true;
				  TexterrorPresionNeumaticoInicial.current[index]="La presión de los neumáticos inicial solo admite números."
				  setMensajes(index+"mf");
			  }else{
				  errorPresionNeumaticoInicial.current[index] = false;
				  TexterrorPresionNeumaticoInicial.current[index]=""
				  setMensajes(index+"nf");
			  }
		  }else if(nombre=='PLF'){
			  const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorProfundidadLlantaFinal.current[index] = true;
				  TexterrorProfundidadLlantaFinal.current[index]="La profundidad del dibujo final solo admite números."
				  setMensajes(index+"of");
			  }else{
				  errorProfundidadLlantaFinal.current[index] = false;
				  TexterrorProfundidadLlantaFinal.current[index]=""
				  setMensajes(index+"pf");
			  }
			  
		  }else if(nombre=='PNF'){
			  const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorPresionNeumaticoFinal.current[index] = true;
				  TexterrorPresionNeumaticoFinal.current[index]="La presión de los neumáticos final solo admite números."
				  setMensajes(index+"qf");
			  }else{
				  errorPresionNeumaticoFinal.current[index] = false;
				  TexterrorPresionNeumaticoFinal.current[index]=""
				  setMensajes(index+"rf");
			  }
		  }
		  else if(nombre=='Lugar'){
		  	const index = event.currentTarget.name;
			  if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚñÑ0-9. ]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="Este campo no debe de estar vacio."
				  setMensajes(index+"sf");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"tf");
			  }
		  }else if(nombre=='Tiempo real (hrs de salida)'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9:]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="Este campo no debe de estar vacio."
				  setMensajes(index+"uf");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"vf");
			  }
		  }else if(nombre=='Presiondeaceite de motor'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9. ]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La presión de aceite solo debe ser expresada en número."
				  setMensajes(index+"wf");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"xf");
			  }
		  }else if(nombre=='Presiondeaire(lbs)'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9. ]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La presión del aire solo debe ser expresada en número."
				  setMensajes(index+"yf");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"zf");
			  }
		  }else if(nombre=='TemperaturaparcialC'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La temperatura inicial solo debe ser expresada en número."
				  setMensajes(index+"ag");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"bg");
			  }
		  }else if(nombre=='Voltaje'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="El voltaje solo debe ser expresada en número."
				  setMensajes(index+"cg");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"dg");
			  }
		  }else if(nombre=='1ra-2da(rpms)'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La cantidad de revoluciones para el cambio solo debe ser expresada en número."
				  setMensajes(index+"dg");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"eg");
			  }
		  }else if(nombre=='2da-3ra(rpms)'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La cantidad de revoluciones para el cambio solo debe ser expresada en número."
				  setMensajes(index+"fg");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"gg");
			  }
		  }else if(nombre=='3ra-4ta(rpms)'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La cantidad de revoluciones para el cambio solo debe ser expresada en número."
				  setMensajes(index+"hg");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"ig");
			  }
		  }else if(nombre=='4ta-5ta(rpms)'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La cantidad de revoluciones para el cambio solo debe ser expresada en número."
				  setMensajes(index+"jg");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"kg");
			  }
		  }else if(nombre=='5ta-6ta(rpms)'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La cantidad de revoluciones para el cambio solo debe ser expresada en número."
				  setMensajes(index+"lg");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"mg");
			  }
		  }else if(nombre=='Frenadobrusco'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La cantidad del frenado brusco solo debe ser expresado con números."
				  setMensajes(index+"ng");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"og");
			  }
		  }else if(nombre=='No.deactivacionalpedaldefreno'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="La cantidad de activaciones de frenado solo debe ser expresado con números."
				  setMensajes(index+"pg");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"qg");
			  }
		  }else if(nombre=='Porcentajedepasajeros(%)'){
		  	const index = event.currentTarget.name;
			  if(!/^[0-9]+$/i.test(valor)){
				  errorData.current[index] = true;
				  TexterrorData.current[index]="El porcentaje es de caracter númerico."
				  setMensajes(index+"rg");
			  }else{
				  errorData.current[index] = false;
				  TexterrorData.current[index]=""
				  setMensajes(index+"sg");
			  }
		  }else if(nombre=='FDO'){
		  	const index = event.currentTarget.name;
		  	console.log(index)
		  	if(valor==""){
		  		errorFallaOperacion.current[index] = false;
				TexterrorFallaOperacion.current[index]=""
				setMensajes(index+"ur");
		  	}else{
			  if(!/^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/i.test(valor)){
				  errorFallaOperacion.current[index] = true;
				  TexterrorFallaOperacion.current[index]="Este campo no acepta caracteres especiales."
				  setMensajes(index+"tg");
			  }else{
				  errorFallaOperacion.current[index] = false;
				  TexterrorFallaOperacion.current[index]=""
				  setMensajes(index+"ug");
			  }
			}
		  }
	}    
  
useEffect(() => {
    getLocal();
  }, []);

  const getLocal = async () => {
    let data = Cookies.get("Nombre")
    setNombre(data)
    let data1 = Cookies.get("Cargo")
    setCargo(data1)
    let data2 = Cookies.get("Departamento")
    setDepartamento(data2)
};   
const [nombre, setNombre] = useState([]);
const [cargo, setCargo] = useState([]);
const [departamento, setDepartamento] = useState([]);
const history = useHistory();

const Envio = async() =>{
        await Computo()
        history.replace("/Revisiones/Formatos")
}
	const Computo = async() =>{

		const formDataPruebas = {
			Fecha: fecha,
			NumeroEconomico: NumeroEconomicoRef.current.value,
			Mes: month,
			Año: año,
			NombredeEmpresaOperadora: EmpresaOperadoraRef.current.value,
			Ruta: RutaRef.current.value,
			NombredeEncargado: ElaboroRef.current.value,
			NombredeRevision: RevisoRef.current.value,
			NombreVistoBueno: VoRef.current.value
		}
		console.log(formDataPruebas)
		const formDataEstatus = {
			NumeroEconomico: NumeroEconomicoRef.current.value,
			Mes: month,
			Año: año,
			Lugar: Data.current[0].value,			
			TiempoReal: Data.current[1].value,			
			PresiondeAceitedeMotor: Data.current[2].value,			
			PresiondeAire: Data.current[3].value,			
			TemperaturaParcial: Data.current[4].value,						
			Voltaje: Data.current[5].value, 						
			Velocidad1a2: Data.current[6].value, 						 
			Velocidad2a3: Data.current[7].value, 			
			Velocidad3a4: Data.current[8].value, 			
			Velocidad4a5: Data.current[9].value, 	
			Velocidad5a6: Data.current[10].value,		
			FrenadoBrusco: Data.current[11].value, 			 
			NumerodeActivacionalPedaldeFreno: Data.current[12].value, 			
			PorcentajePasajeros: Data.current[13].value
		}
		console.log(formDataEstatus)
		const formDataInicial = {
			NumeroEconomico: NumeroEconomicoRef.current.value,
			Mes: month,
			Año: año,
			Hora: HoraInicial.current.value,
			NiveldeDiesel: NiveldeDieselInicial.current.value,
			Temperatura: TemperaturaInicial.current.value,
			Kilometraje: KilometrajeInicial.current.value,
			Rendimiento: RendimientoInicial.current.value,
			CodigosActivos: CodigosActivosInicial.current.value
		}
		console.log(formDataInicial)
		const formDataFinal = {
			NumeroEconomico: NumeroEconomicoRef.current.value,
			Mes: month,
			Año: año,
			Hora: HoraFinal.current.value,
			NiveldeDiesel: NiveldeDieselFinal.current.value,
			Temperatura: TemperaturaFinal.current.value,
			Kilometraje: KilometrajeFinal.current.value,
			Rendimiento: RendimientoFinal.current.value,
			CodigosActivos: CodigosActivosFinal.current.value
		}
		console.log(formDataFinal)
		const formDataLlantasInicial = []
		for(let i = 0; i < 14; i++)
		{
			if(ProfundidadLlantaInicial.current[i].value && PresionNeumaticoInicial.current[i].value)
			{
				console.log("Llegue aqui "+i + " " + ProfundidadLlantaInicial.current[i].value + " " +PresionNeumaticoInicial.current[i].value)
				const Llanta = {
					NumeroEconomico: NumeroEconomicoRef.current.value,
					NumerodeLlanta: (parseInt(i)+parseInt(1)),
					Mes: month,
					Año: año,
					Eje: (parseInt(i)+parseInt(1))%4,
					Profundidad: ProfundidadLlantaInicial.current[i].value,
					Presion: PresionNeumaticoInicial.current[i].value
				}
				formDataLlantasInicial.push(Llanta)
			}
		}
		console.log(formDataLlantasInicial)
		const formDataLlantasFinal = []
		for(let i = 0; i < 14; i++)
		{
			if(ProfundidadLlantaFinal.current[i].value && PresionNeumaticoFinal.current[i].value)
			{
				const Llanta = {
					NumeroEconomico: NumeroEconomicoRef.current.value,
					NumerodeLlanta: (parseInt(i)+parseInt(1)),
					Mes: month,
					Año: año,
					Eje: (parseInt(i)+parseInt(1))%4,
					Profundidad: ProfundidadLlantaFinal.current[i].value,
					Presion: PresionNeumaticoFinal.current[i].value
				}
				formDataLlantasFinal.push(Llanta)
			}
		}
		console.log(formDataLlantasFinal)
		const formDataFallas = [] 
		for(let i = 0; i < 10; i++)
		{
			if(FallaOperacion.current[i].value)
			{
				const Fallas = {
					NumeroEconomico: NumeroEconomicoRef.current.value,
					Mes: month,
					Año: año,
					Falla: FallaOperacion.current[i].value
				}
				formDataFallas.push(Fallas)
			}
		}
		let tam = formDataFallas.length 
		let li = formDataLlantasInicial.length
		let lf = formDataLlantasFinal.length
		console.log(formDataFallas)
		await sendDataP(formDataPruebas).then(response  =>{
			 sendDataI(formDataInicial).then(response =>{
				
			})
			 sendDataE(formDataEstatus).then(response =>{
				
			})
			for(let i = 0; i < li; i++)
			{
				sendDataLI(formDataLlantasInicial[i]).then(response =>{
					
				})
			}
			for(let i = 0; i < lf; i++)
			{
				sendDataLF(formDataLlantasFinal[i]).then(response =>{
					
				})
			}
			sendDataF(formDataFinal).then(response =>{
				
			})
			for(let i = 0; i < tam; i++)
			{
				sendDataFa(formDataFallas[i]).then(response =>{
					
				})
			}
		})
		console.log(formDataPruebas);
		swal({
            		title: "¡Felicidades!",
            		text: "Tus datos se enviaron correctamente. ",
            		icon: "success",
            		buttons: ["Siguiente"]
        	})
	}	

  const classes = useStyles();  
  return (
  <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" align="center">
            Pruebas de desempeño
          </Typography>
		  <Typography component="h1" variant="h5" align="center">
		 	 {fecha}
		  </Typography>
          <br/>
          <Typography component="h1" variant="h5" align="left">
              Número económico: <TextField 
              	inputRef={NumeroEconomicoRef} 
              	id="ecoID" 
              	error={NumeroEconomicoRef.current.error}
               	helperText={errorNumEco.current}
                onBlur={Validaciones} 
                required
              	/>  
              Empresa operadora: <TextField 
              	inputRef = {EmpresaOperadoraRef} 
              	id="empreOp"
              	error={EmpresaOperadoraRef.current.error}
               	helperText={errorEmpresaO.current}
                onBlur={Validaciones} 
                required
              	/> 
              Ruta: <TextField 
              	inputRef = {RutaRef} 
              	id="route"
              	error={RutaRef.current.error}
               	helperText={errorRuta.current}
                onBlur={Validaciones} 
                required 
              	/> 
		  </Typography>
           

          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
              <TableHead>
				  <TableRow>
					<StyledTableCell align="center" colSpan={4}>DATOS INICIALES</StyledTableCell>					
				  </TableRow>
				</TableHead>
				<TableBody>
				    <TableRow>
					<StyledTableCell>Hora</StyledTableCell>
					  <TableCell component="th" scope="row">
						<TextField
        id="time"
        type="time"
        inputRef={HoraInicial}
	defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
						{/*<TextField id="time" inputRef = {HoraInicial} />*/}
						</TableCell>
                        <StyledTableCell>Kilometraje (km) </StyledTableCell>
                    <TableCell component="th" scope="row">
						<TextField 
							inputRef = {KilometrajeInicial} 
							id="kilometraje"
							error={KilometrajeInicial.current.error}
               				helperText={errorKilometraje.current}
                			onBlur={Validaciones} 
                			required 
							/>
						</TableCell>
					</TableRow>	

					<TableRow>
                    <StyledTableCell>Nivel de Diesel</StyledTableCell>
                      <TableCell component="th" scope="row">
                        <TextField 
                        	inputRef = {NiveldeDieselInicial} 
                        	id="diesel"
                        	error={NiveldeDieselInicial.current.error}
               				helperText={errorNivelDiesel.current}
                			onBlur={Validaciones} 
                			required 
                			/>
						</TableCell>
                        <StyledTableCell>Rendimiento (km/lts) </StyledTableCell>
					  <TableCell component="th" scope="row">
                        <TextField 
                        	inputRef = {RendimientoInicial} 
                        	id="rendimiento"
                        	error={RendimientoInicial.current.error}
               				helperText={errorRendimiento.current}
                			onBlur={Validaciones} 
                			required
                        	/>

						</TableCell>			  
					</TableRow>		
					<TableRow>
					  <StyledTableCell>Temperatura ºC</StyledTableCell>
					  <TableCell component="th" scope="row">
                        <TextField 
                        	inputRef = {TemperaturaInicial} 
                        	id="temperatura"
                        	error={TemperaturaInicial.current.error}
               				helperText={errorTemperatura.current}
                			onBlur={Validaciones} 
                			required
                        	/>
						</TableCell>
                        <StyledTableCell>Códigos Activos</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		inputRef = {CodigosActivosInicial} 
					  		id="codActivos" 
					  		error={CodigosActivosInicial.current.error}
               				helperText={errorCodigosActi.current}
                			onBlur={Validaciones} 
                			required
					  		/>
					  </TableCell>					  					  
					</TableRow>						
				</TableBody>	
			  </Table>
			</TableContainer>			 							


			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableBody>

				<TableRow>
					  <TableCell component="th" scope="row">
					  	01.- Profundidad del dibujo de llantas 
					  </TableCell>
					  <TableCell align="left">
					  1ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[0] = el)}
					  id="PLI"
					  name="0"
					  error = {errorProfundidadLlantaInicial.current[0]}
					  helperText={TexterrorProfundidadLlantaInicial.current[0]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  2ª<TextField 
					  inputRef={(el) => (ProfundidadLlantaInicial.current[1] = el)}
					  id="PLI"
					  name="1"
					  error = {errorProfundidadLlantaInicial.current[1]}
					  helperText={TexterrorProfundidadLlantaInicial.current[1]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  3ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[2] = el)}
					  id="PLI"
					  name="2"
					  error = {errorProfundidadLlantaInicial.current[2]}
					  helperText={TexterrorProfundidadLlantaInicial.current[2]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  4ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[3] = el)}
					  id="PLI"
					  name="3"
					  error = {errorProfundidadLlantaInicial.current[3]}
					  helperText={TexterrorProfundidadLlantaInicial.current[3]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  5ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[4] = el)}
					  id="PLI"
					  name="4"
					  error = {errorProfundidadLlantaInicial.current[4]}
					  helperText={TexterrorProfundidadLlantaInicial.current[4]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  6ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[5] = el)}
					  id="PLI"
					  name="5"
					  error = {errorProfundidadLlantaInicial.current[5]}
					  helperText={TexterrorProfundidadLlantaInicial.current[5]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  7ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[6] = el)}
					  id="PLI"
					  name="6"
					  error = {errorProfundidadLlantaInicial.current[6]}
					  helperText={TexterrorProfundidadLlantaInicial.current[6]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  8ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[7] = el)}
					  id="PLI"
					  name="7"
					  error = {errorProfundidadLlantaInicial.current[7]}
					  helperText={TexterrorProfundidadLlantaInicial.current[7]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  9ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[8] = el)}
					  id="PLI"
					  name="8"
					  error = {errorProfundidadLlantaInicial.current[8]}
					  helperText={TexterrorProfundidadLlantaInicial.current[8]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  10ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[9] = el)}
					  id="PLI"
					  name="9"
					  error = {errorProfundidadLlantaInicial.current[9]}
					  helperText={TexterrorProfundidadLlantaInicial.current[9]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  11ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[10] = el)}
					  id="PLI"
					  name="10"
					  error = {errorProfundidadLlantaInicial.current[10]}
					  helperText={TexterrorProfundidadLlantaInicial.current[10]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  12ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[11] = el)}
					  id="PLI"
					  name="11"
					  error = {errorProfundidadLlantaInicial.current[11]}
					  helperText={TexterrorProfundidadLlantaInicial.current[11]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					  <TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  13ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[12] = el)}
					  id="PLI"
					  name="13"
					  error = {errorProfundidadLlantaInicial.current[12]}
					  helperText={TexterrorProfundidadLlantaInicial.current[12]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  14ª<TextField
					  inputRef={(el) => (ProfundidadLlantaInicial.current[13] = el)}
					  id="PLI"
					  name="14"
					  error = {errorProfundidadLlantaInicial.current[13]}
					  helperText={TexterrorProfundidadLlantaInicial.current[13]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					</TableRow>

                    <TableRow>
					  <TableCell component="th" scope="row">
					  	02.- Presión de neumáticos 
					  </TableCell>
					  <TableCell align="left">
					  1ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[0] = el)}
					  id="PNI"
					  name="1"
					  error = {errorPresionNeumaticoInicial.current[1]}
					  helperText={TexterrorPresionNeumaticoInicial.current[1]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  2ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[1] = el)}
					  id="PNI"
					  name="2"
					  error = {errorPresionNeumaticoInicial.current[2]}
					  helperText={TexterrorPresionNeumaticoInicial.current[2]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  3ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[2] = el)}
					  id="PNI"
					  name="3"
					  error = {errorPresionNeumaticoInicial.current[3]}
					  helperText={TexterrorPresionNeumaticoInicial.current[3]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  4ª<TextField 
					  inputRef = {(el) => (PresionNeumaticoInicial.current[3] = el)}
					  id="PNI"
					  name="4"
					  error = {errorPresionNeumaticoInicial.current[4]}
					  helperText={TexterrorPresionNeumaticoInicial.current[4]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  5ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[4] = el)}
					  id="PNI"
					  name="5"
					  error = {errorPresionNeumaticoInicial.current[5]}
					  helperText={TexterrorPresionNeumaticoInicial.current[5]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  6ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[5] = el)}
					  id="PNI"
					  name="6"
					  error = {errorPresionNeumaticoInicial.current[6]}
					  helperText={TexterrorPresionNeumaticoInicial.current[6]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  7ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[6] = el)}
					  id="PNI"
					  name="7"
					  error = {errorPresionNeumaticoInicial.current[7]}
					  helperText={TexterrorPresionNeumaticoInicial.current[7]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  8ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[7] = el)}
					  id="PNI"
					  name="8"
					  error = {errorPresionNeumaticoInicial.current[8]}
					  helperText={TexterrorPresionNeumaticoInicial.current[8]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  9ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[8] = el)}
					  id="PNI"
					  name="9"
					  error = {errorPresionNeumaticoInicial.current[9]}
					  helperText={TexterrorPresionNeumaticoInicial.current[9]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  10ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[9] = el)}
					  id="PNI"
					  name="10"
					  error = {errorPresionNeumaticoInicial.current[10]}
					  helperText={TexterrorPresionNeumaticoInicial.current[10]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  11ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[10] = el)}
					  id="PNI"
					  name="6"
					  error = {errorPresionNeumaticoInicial.current[11]}
					  helperText={TexterrorPresionNeumaticoInicial.current[11]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  12ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[11] = el)}
					  id="PNI"
					  name="12"
					  error = {errorPresionNeumaticoInicial.current[12]}
					  helperText={TexterrorPresionNeumaticoInicial.current[12]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					  <TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  13ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[12] = el)}
					  id="PNI"
					  name="13"
					  error = {errorPresionNeumaticoInicial.current[13]}
					  helperText={TexterrorPresionNeumaticoInicial.current[13]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  14ª<TextField
					  inputRef = {(el) => (PresionNeumaticoInicial.current[13] = el)}
					  id="PNI"
					  name="14"
					  error = {errorPresionNeumaticoInicial.current[14]}
					  helperText={TexterrorPresionNeumaticoInicial.current[14]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					</TableRow>
				</TableBody>	
			  </Table>
			</TableContainer>			 							

			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableBody>
                {campos.map((row, index) => (
					<TableRow key={row.elemento}>
					  <TableCell component="th" scope="row">
						{row.elemento}						
					  </TableCell>
					  <TableCell align="center"><TextField
					  inputRef = {(el) => (Data.current[index] = el)}
					  id={row.elemento}
					  name={index}
					  error={errorData.current[index]}
					  helperText={TexterrorData.current[index]}
					  onBlur={Validaciones} /></TableCell>                      				  
					</TableRow>
				  ))}
				</TableBody>	
			  </Table>
			</TableContainer>			 							
        
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
              <TableHead>
				  <TableRow>
					<StyledTableCell align="center" colSpan={4}>DATOS FINALES</StyledTableCell>					
				  </TableRow>
				</TableHead>
				<TableBody>
				<TableRow>
					<StyledTableCell>Hora</StyledTableCell>
					  <TableCell component="th" scope="row">
						<TextField
        id="time"
        type="time"
        inputRef={HoraFinal}
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />

{/*<TextField id="time" inputRef = {HoraFinal} />*/}
						</TableCell>
                        <StyledTableCell>Kilometraje (km)</StyledTableCell>
                    <TableCell component="th" scope="row">
						<TextField 
							inputRef = {KilometrajeFinal} 
							id="kilometrajeF"
							error={KilometrajeFinal.current.error}
               				helperText={errorKilometrajeF.current}
                			onBlur={Validaciones} 
                			required 
                			/>
						</TableCell>
					</TableRow>	

					<TableRow>
                    <StyledTableCell>Nivel de Diesel</StyledTableCell>
                      <TableCell component="th" scope="row">
                        <TextField 
                        	inputRef = {NiveldeDieselFinal} 
                        	id="dieselF"
               				helperText={errorNivelDieselF.current}
                			onBlur={Validaciones} 
                			required
                        	/>
						</TableCell>
                        <StyledTableCell>Rendimiento (km/lts)</StyledTableCell>
					  <TableCell component="th" scope="row">
                        <TextField 
                        	inputRef = {RendimientoFinal} 
                        	id="rendimientoF"
                        	error={RendimientoFinal.current.error}
               				helperText={errorRendimientoF.current}
                			onBlur={Validaciones} 
                			required
                			/>
						</TableCell>			  
					</TableRow>		
					<TableRow>
					  <StyledTableCell>Temperatura ºC</StyledTableCell>
					  <TableCell component="th" scope="row">
                        <TextField 
                        	inputRef = {TemperaturaFinal} 
                        	id="temperaturaF"
                        	error={TemperaturaFinal.current.error}
               				helperText={errorTemperaturaF.current}
                			onBlur={Validaciones} 
                			required
                			/>
						</TableCell>
                        <StyledTableCell>Códigos Activos</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField 
					  		inputRef = {CodigosActivosFinal} 
					  		id="codActivosF" 
					  		error={CodigosActivosFinal.current.error}
               				helperText={errorCodigosActiF.current}
                			onBlur={Validaciones} 
                			required/>
					  </TableCell>					  					  
					</TableRow>						
				</TableBody>	
			  </Table>
			</TableContainer>			 							
          

         
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableBody>

				<TableRow>
				<TableCell component="th" scope="row">
					  	01.- Profundidad del dibujo de llantas 
					  </TableCell>
					  <TableCell align="left">
					  1ª<TextField 
					  inputRef={(el) => (ProfundidadLlantaFinal.current[0] = el)}
					  id="PLF"
					  name="1"
					  error = {errorProfundidadLlantaFinal.current[1]}
					  helperText={TexterrorProfundidadLlantaFinal.current[1]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  2ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[1] = el)}
					  id="PLF"
					  name="2"
					  error = {errorProfundidadLlantaFinal.current[2]}
					  helperText={TexterrorProfundidadLlantaFinal.current[2]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  3ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[2] = el)}
					  id="PLF"
					  name="3"
					  error = {errorProfundidadLlantaFinal.current[3]}
					  helperText={TexterrorProfundidadLlantaFinal.current[3]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  4ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[3] = el)}
					  id="PLF"
					  name="4"
					  error = {errorProfundidadLlantaFinal.current[4]}
					  helperText={TexterrorProfundidadLlantaFinal.current[4]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  5ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[4] = el)}
					  id="PLF"
					  name="5"
					  error = {errorProfundidadLlantaFinal.current[5]}
					  helperText={TexterrorProfundidadLlantaFinal.current[5]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  6ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[5] = el)}
					  id="PLF"
					  name="6"
					  error = {errorProfundidadLlantaFinal.current[6]}
					  helperText={TexterrorProfundidadLlantaFinal.current[6]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  7ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[6] = el)}
					  id="PLF"
					  name="7"
					  error = {errorProfundidadLlantaFinal.current[7]}
					  helperText={TexterrorProfundidadLlantaFinal.current[7]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  8ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[7] = el)}
					  id="PLF"
					  name="8"
					  error = {errorProfundidadLlantaFinal.current[8]}
					  helperText={TexterrorProfundidadLlantaFinal.current[8]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  9ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[8] = el)}
					  id="PLF"
					  name="9"
					  error = {errorProfundidadLlantaFinal.current[9]}
					  helperText={TexterrorProfundidadLlantaFinal.current[9]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  10ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[9] = el)}
					  id="PLF"
					  name="10"
					  error = {errorProfundidadLlantaFinal.current[10]}
					  helperText={TexterrorProfundidadLlantaFinal.current[10]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  11ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[10] = el)}
					  id="PLF"
					  name="11"
					  error = {errorProfundidadLlantaFinal.current[11]}
					  helperText={TexterrorProfundidadLlantaFinal.current[11]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  12ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[11] = el)}
					  id="PLF"
					  name="12"
					  error = {errorProfundidadLlantaFinal.current[12]}
					  helperText={TexterrorProfundidadLlantaFinal.current[12]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					  <TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  13ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[12] = el)}
					  id="PLF"
					  name="13"
					  error = {errorProfundidadLlantaFinal.current[13]}
					  helperText={TexterrorProfundidadLlantaFinal.current[13]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  14ª<TextField
					  inputRef={(el) => (ProfundidadLlantaFinal.current[13] = el)}
					  id="PLF"
					  name="14"
					  error = {errorProfundidadLlantaFinal.current[14]}
					  helperText={TexterrorProfundidadLlantaFinal.current[14]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					</TableRow>

                    <TableRow>
					  <TableCell component="th" scope="row">
					  	02.- Presión de neumáticos 
					  </TableCell>
					  <TableCell align="left">
					  1ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[0] = el)}
					  id="PNF"
					  name="1"
					  error = {errorPresionNeumaticoFinal.current[1]}
					  helperText={TexterrorPresionNeumaticoFinal.current[1]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  2ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[1] = el)}
					  id="PNF"
					  name="2"
					  error = {errorPresionNeumaticoFinal.current[2]}
					  helperText={TexterrorPresionNeumaticoFinal.current[2]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  3ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[2] = el)}
					  id="PNF"
					  name="3"
					  error = {errorPresionNeumaticoFinal.current[3]}
					  helperText={TexterrorPresionNeumaticoFinal.current[3]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  4ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[3] = el)}
					  id="PNF"
					  name="4"
					  error = {errorPresionNeumaticoFinal.current[4]}
					  helperText={TexterrorPresionNeumaticoFinal.current[4]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  5ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[4] = el)}
					  id="PNF"
					  name="5"
					  error = {errorPresionNeumaticoFinal.current[5]}
					  helperText={TexterrorPresionNeumaticoFinal.current[5]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  6ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[5] = el)}
					  id="PNF"
					  name="6"
					  error = {errorPresionNeumaticoFinal.current[6]}
					  helperText={TexterrorPresionNeumaticoFinal.current[6]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  7ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[6] = el)}
					  id="PNF"
					  name="7"
					  error = {errorPresionNeumaticoFinal.current[7]}
					  helperText={TexterrorPresionNeumaticoFinal.current[7]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  8ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[7] = el)}
					  id="PNF"
					  name="8"
					  error = {errorPresionNeumaticoFinal.current[8]}
					  helperText={TexterrorPresionNeumaticoFinal.current[8]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  9ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[8] = el)}
					  id="PNF"
					  name="9"
					  error = {errorPresionNeumaticoFinal.current[9]}
					  helperText={TexterrorPresionNeumaticoFinal.current[9]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  10ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[9] = el)}
					  id="PNF"
					  name="10"
					  error = {errorPresionNeumaticoFinal.current[10]}
					  helperText={TexterrorPresionNeumaticoFinal.current[10]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  11ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[10] = el)}
					  id="PNF"
					  name="11"
					  error = {errorPresionNeumaticoFinal.current[11]}
					  helperText={TexterrorPresionNeumaticoFinal.current[11]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  12ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[11] = el)}
					  id="PNF"
					  name="12"
					  error = {errorPresionNeumaticoFinal.current[12]}
					  helperText={TexterrorPresionNeumaticoFinal.current[12]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					</TableRow>

					  <TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  13ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[12] = el)}
					  id="PNF"
					  name="13"
					  error = {errorPresionNeumaticoFinal.current[13]}
					  helperText={TexterrorPresionNeumaticoFinal.current[13]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  14ª<TextField
					  inputRef = {(el) => (PresionNeumaticoFinal.current[13] = el)}
					  id="PNF"
					  name="14"
					  error = {errorPresionNeumaticoFinal.current[14]}
					  helperText={TexterrorPresionNeumaticoFinal.current[14]}
					  style = {{width: 50}}
					  onBlur={Validaciones}
					  required/>
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					</TableRow>
				</TableBody>	
			  </Table>
			</TableContainer>			 							
           
          
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
              <TableHead>
				  <TableRow>
					<StyledTableCell align="center" colSpan={4}>Fallas durante operación</StyledTableCell>					
				  </TableRow>
				</TableHead>
				<TableBody>
				    <TableRow>
					<StyledTableCell>01.-</StyledTableCell>
					  <TableCell component="th" scope="row" >
						<TextField
						inputRef = {(el) => (FallaOperacion.current[0] = el)}
						id="FDO"
						name="1"
						error = {errorFallaOperacion.current[1]}
						helperText={TexterrorFallaOperacion.current[1]}
						onBlur={Validaciones}
						required/>
						</TableCell>
                        
					</TableRow>	

					<TableRow>
                        <TableCell >02.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[1] = el)}
						id="FDO"
						name="2"
						error = {errorFallaOperacion.current[2]}
						helperText={TexterrorFallaOperacion.current[2]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>		
					<TableRow>
                        <TableCell >03.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[2] = el)}
						id="FDO"
						name="3"
						error = {errorFallaOperacion.current[3]}
						helperText={TexterrorFallaOperacion.current[3]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>
                    <TableRow>
                        <TableCell >04.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[3] = el)}
						id="FDO"
						name="4"
						error = {errorFallaOperacion.current[4]}
						helperText={TexterrorFallaOperacion.current[4]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>	
                    <TableRow>
                        <TableCell >05.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[4] = el)}
						id="FDO"
						name="5"
						error = {errorFallaOperacion.current[5]}
						helperText={TexterrorFallaOperacion.current[5]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>		
                    <TableRow>
                        <TableCell >06.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[5] = el)}
						id="FDO"
						name="6"
						error = {errorFallaOperacion.current[6]}
						helperText={TexterrorFallaOperacion.current[6]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>		
                    <TableRow>
                        <TableCell >07.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[6] = el)}
						id="FDO"
						name="7"
						error = {errorFallaOperacion.current[7]}
						helperText={TexterrorFallaOperacion.current[7]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>		
                    <TableRow>
                        <TableCell >08.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[7] = el)}
						id="FDO"
						name="8"
						error = {errorFallaOperacion.current[8]}
						helperText={TexterrorFallaOperacion.current[8]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>	
                    <TableRow>
                        <TableCell >09.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[8] = el)}
						id="FDO"
						name="9"
						error = {errorFallaOperacion.current[9]}
						helperText={TexterrorFallaOperacion.current[9]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>		
                    <TableRow>
                        <TableCell >10.-</TableCell>
                        <TableCell component="th" scope="row" >
                            <TextField
						inputRef = {(el) => (FallaOperacion.current[9] = el)}
						id="FDO"
						name="10"
						error = {errorFallaOperacion.current[10]}
						helperText={TexterrorFallaOperacion.current[10]}
						onBlur={Validaciones}
						required/>
                        </TableCell>			  
					</TableRow>				
				</TableBody>	
			  </Table>
			</TableContainer>	

            <TableContainer component={Paper}>
                <Grid item xs={12}>
                    <Box mr={2}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableBody>
                            <StyledTableCell align="center">
                                <TextField id="outlined-basic" value={nombre} label="Elaboró" inputRef = {ElaboroRef} variant="outlined" />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TextField id="outlined-basic" label="Revisó" inputRef = {RevisoRef} variant="outlined" />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <TextField id="outlined-basic" label="Vo. Bo."inputRef = {VoRef} variant="outlined" />
                            </StyledTableCell>
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
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
		            
		            onClick={Envio}>
		          Siguiente    
		    </Button>
		{/*
                <Button	  
				  width= "25%"
				  align= "right"
				  variant="contained"
				  color="secondary"
				  
				  onClick = {Envio}				
				>
				  Siguiente
				</Button>*/}
            </form>                          
        </div>

	</Container>	
  );
}
