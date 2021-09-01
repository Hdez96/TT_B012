import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TrainIcon from '@material-ui/icons/TrainOutlined'; 
import {Grid,Box}  from '@material-ui/core/';
import swal from "sweetalert";
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import { TextField, Container, Typography } from '@material-ui/core';
import { formRegister,PDF } from '../../Functions/CedulaTRAFunctions'

export default function CedulaTRA() {

	function getCurrentDate(separator='')
	{

	let newDate = new Date()
	let date = newDate.getDate();
	let month = newDate.getMonth() + 1;
	let year = newDate.getFullYear();

	  return `${year}${separator="-"}${month<10?`0${month}`:`${month}`}${separator="-"}${date}`
	}

	const fecha = String(getCurrentDate());

	const [Mensajes, setMensajes] = useState([]);
  
	const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.common.white,
        
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
          width: '100%', 
          marginTop: theme.spacing(3),
        marginRight: theme.spacing(2),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundColor: theme.palette.error.dark,
        },
      }));

  	const classes = useStyles();
	const history = useHistory();
	const FacturaRef = useRef('') 
	const FechaRef = useRef('') 
	const PropietarioRef = useRef('') 
	const DomicilioRef = useRef('') 
	const TelefonoRef = useRef('') 
	const ResponsableRef = useRef('') 
	const Fecha = useRef('')
	const MarcaRef = useRef('')
	const ModeloRef = useRef('')
	const AnoRef = useRef('') 
	const NoMotorRef = useRef('')
	const NoChasiRef = useRef('')
	const NoCarroRef = useRef('')
	const NoTransmisionRef = useRef('')
	const NoEcoRef = useRef('')
	const PlacaRef = useRef('')
	const ObservacionesRef = useRef('')

	const ElaboroRef = useRef('')
	const FirmaRef = useRef('')

	const errorFactura = useRef('') 
	const errorPropietario = useRef('')
	const errorDomicilio = useRef('')
	const errorTelefono = useRef('')
	const errorResponsable = useRef('')
	const errorMarca = useRef ('')
	const errorModelo = useRef('')
	const errorAño = useRef('')
	const errorNumMotor = useRef('')
	const errorNumChasis = useRef('')
	const errorNumCarroce = useRef('')
	const errorNumTransmi = useRef('')
	const errorNumEco = useRef('')
	const errorPlaca = useRef('')

	//Precarga
  const [nombre, setNombre] = useState([]);
  const [cargo, setCargo] = useState([]);
  const [departamento, setDepartamento] = useState([]);

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

	const Validaciones = (event) => {

	    const nombre = event.currentTarget.id;
	    const valor = event.currentTarget.value;
	    console.log("Soy " + nombre + " con " +valor);

		if(nombre=="Factura")
		{
			if(!/^[A-ZñÑa-z0-9. ]+$/i.test(valor))
			{
				errorFactura.current = "La factura no admite caracteres especiales.";
				FacturaRef.current.error=true;
				setMensajes("");
			}
			else
			{
				errorFactura.current = "";
				FacturaRef.current.error=false;
				setMensajes("a");
			}
		}

		else if(nombre=="Propietario")
		{
			if(!/^[0-9A-ZñÑa-záéíóúÁÉÍÓÚ'\s. ]+$/i.test(valor))
			{
				errorPropietario.current = "El propietario no admite caracteres especiales o números.";
				PropietarioRef.current.error=true;
				setMensajes("b");
			}
			else
			{
				errorPropietario.current = "";
				PropietarioRef.current.error=false;
				setMensajes("c");
			}
		}	

		else if(nombre=="Domicilio")
		{
			if(!/^[0-9A-ZñÑa-záéíóúÁÉÍÓÚ',-\s#. ]+$/i.test(valor))
			{
				errorDomicilio.current = "El domicilio no admite caracteres especiales.";
				DomicilioRef.current.error=true;
				setMensajes("d");
			}
			else
			{
				errorDomicilio.current = "";
				DomicilioRef.current.error=false;
				setMensajes("e");
			}
		}

		else if(nombre=="Telefono")
		{
			if(!/^[0-9- ]+$/i.test(valor))
			{
				errorTelefono.current = "El teléfono solo admite números.";
				TelefonoRef.current.error=true;
				setMensajes("f");
			}
			else
			{
				errorTelefono.current = "";
				TelefonoRef.current.error=false;
				setMensajes("g");
			}
		}

		else if(nombre=="Responsable")
		{
			if(!/^[A-ZñÑa-záéíóúÁÉÍÓÚ'\s. ]+$/i.test(valor))
			{
				errorResponsable.current = "El responsable no admite caracteres especiales.";
				ResponsableRef.current.error=true;
				setMensajes("h");
			}
			else
			{
				errorResponsable.current = "";
				ResponsableRef.current.error=false;
				setMensajes("i");
			}
		}

		else if(nombre=="Responsable")
		{
			if(!/^[A-ZñÑa-záéíóúÁÉÍÓÚ'\s.]+$/i.test(valor))
			{
				errorResponsable.current = "El responsable no admite caracteres especiales.";
				ResponsableRef.current.error=true;
				setMensajes("j");
			}
			else
			{
				errorResponsable.current = "";
				ResponsableRef.current.error=false;
				setMensajes("k");
			}
		}

		else if(nombre=="Marca")
		{
			if(!/^[0-9A-ZñÑa-záéíóúÁÉÍÓÚ-\s. ]+$/i.test(valor))
			{
				errorMarca.current = "La marca no admite caracteres especiales ni números.";
				MarcaRef.current.error=true;
				setMensajes("l");
			}
			else
			{
				errorMarca.current = "";
				MarcaRef.current.error=false;
				setMensajes("m");
			}
		}

		else if(nombre=='Modelo'){
	      if(!/^[0-9A-ZñÑa-záéíóúÁÉÍÓÚ\s. ]+$/i.test(valor)){
	        errorModelo.current = "El modelo no admite caracteres especiales.";
	        ModeloRef.current.error=true;
	        setMensajes("n");
	      }
	      else{
	        errorModelo.current = "";
	        ModeloRef.current.error=false;
	        setMensajes("o");
	      }
	    }

		else if(nombre=='Año'){
	      if(!/^[0-9. ]+$/i.test(valor)){
	        errorAño.current = "El año solo admite números.";
	        AnoRef.current.error=true;
	        setMensajes("p");
	      }
	      else{
	        errorAño.current = "";
	        AnoRef.current.error=false;
	        setMensajes("q");
	      }
	    }

	    else if(nombre=='Numero de motor'){
	      if(!/^[0-9A-ZñÑa-z. ]+$/i.test(valor)){
	        errorNumMotor.current = "El motor no admite caracteres especiales.";
	        NoMotorRef.current.error=true;
	        setMensajes("r");
	      }
	      else{
	        errorNumMotor.current = "";
	        NoMotorRef.current.error=false;
	        setMensajes("s");
	      }
	    }

	    else if(nombre=='Numero de chasis'){
	      if(!/^[0-9A-ZñÑa-z. ]+$/i.test(valor)){
	        errorNumChasis.current = "El chasis no admite caracteres especiales.";
	        NoChasiRef.current.error=true;
	        setMensajes("t");
	      }
	      else{
	        errorNumChasis.current = "";
	        NoChasiRef.current.error=false;
	        setMensajes("u");
	      }
	    }

	    else if(nombre=='Numero de carroceria'){
	      if(!/^[A-ZñÑa-z0-9. ]+$/i.test(valor)){
	        errorNumCarroce.current = "La carroceria solo admite números.";
	        NoCarroRef.current.error=true;
	        setMensajes("v");
	      }
	      else{
	        errorNumCarroce.current = "";
	        NoCarroRef.current.error=false;
	        setMensajes("w");
	      }
	    }

	    else if(nombre=='Numero de transmision'){
	      if(!/^[0-9. ]+$/i.test(valor)){
	        errorNumTransmi.current = "La transmisión solo admite números.";
	        NoTransmisionRef.current.error=true;
	        setMensajes("x");
	      }
	      else{
	        errorNumTransmi.current = "";
	        NoTransmisionRef.current.error=false;
	        setMensajes("y");
	      }
	    }

	    else if(nombre=='Numero economico'){
	      if(!/^[0-9A-ZñÑa-z-. ]+$/i.test(valor)){
	        errorNumEco.current = "El número económico no admite caracteres especiales.";
	        NoEcoRef.current.error=true;
	        setMensajes("z");
	      }
	      else{
	        errorNumEco.current = "";
	        NoEcoRef.current.error=false;
	        setMensajes("aa");
	      }
	    }

	     else if(nombre=='Placa Vehicular'){
	      if(!/^[0-9A-ZñÑa-z-. ]+$/i.test(valor)){
	        errorPlaca.current = "La placa vehicular no admite caracteres especiales.";
	        PlacaRef.current.error=true;
	        setMensajes("ab");
	      }
	      else{
	        errorPlaca.current = "";
	        PlacaRef.current.error=false;
	        setMensajes("ac");
	      }
	    }			
	
	}  

const submitValue = async() =>{
	await Computo()
	history.replace("/Revisiones/Formatos")
}
  const Computo = (event) => {
	if(ObservacionesRef.current.value == '')
                ObservacionesRef.current.value = "Ninguna"
//	event.preventDefault();
	const formData = {
		NumeroFactura: FacturaRef.current.value,
        FechaAlta: FechaRef.current.value,
        Propietario: PropietarioRef.current.value,
        Domicilio: DomicilioRef.current.value,
        Responsable: ResponsableRef.current.value,
        Telefonos: TelefonoRef.current.value,
        Marca: MarcaRef.current.value,
        Modelo: ModeloRef.current.value,
        Año: AnoRef.current.value,
        NumeroMotor: NoMotorRef.current.value,
        NumeroChasis: NoChasiRef.current.value,
        NumeroCarroceria: NoCarroRef.current.value,
        NumeroTransmision: NoTransmisionRef.current.value,
        NumeroEconomico: NoEcoRef.current.value,
        PlacaVehicular: PlacaRef.current.value,
        Observaciones: ObservacionesRef.current.value,
		Nombre: ElaboroRef.current.value,
        FechaRegistro: FechaRef.current.value,
        Firma: ""
	}

	formRegister(formData).then(response => {
		if(response.success)
		{
			swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success");
		}
	})
	//history.replace("/Revisiones/Formatos")
}


return (

    <Container component="main">

	    <Typography component="h1" variant="h5" align="left">
	      Cedúla técnica de registro de autobús.
	    </Typography>
	    <Typography component="h1" variant="h5" align="left">
	      {fecha}
	    </Typography>

	    <Typography component="h1" variant="h5" align="left">
	      Datos Generales.
	    </Typography>

	    
	
	    
	    <form className={classes.form} noValidate>
		    <TableContainer component={Paper}>
		
		           
		      <Table className={classes.table} aria-label="customized table">
		        <TableHead>
		          <TableRow>
		            <StyledTableCell align="center">Campo a llenar</StyledTableCell>
		            <StyledTableCell align="center"></StyledTableCell>
		            
		          </TableRow>
		        </TableHead>
		        <TableBody>

		        <TableRow>
		              <StyledTableCell align="center" component="th" scope="row">
		                Factura o Carta Factura No.
		              </StyledTableCell>
		              <TableCell align="center">
		                <TextField
		                  variant="outlined"                          
		                  id="Factura"
		                  inputRef={FacturaRef}
		                  error={FacturaRef.current.error}
               			  helperText={errorFactura.current}
                		  onBlur={Validaciones} 
                		  required
		                />
		              </TableCell>                
		         </TableRow>  

		         <TableRow key="Fecha de alta">
		              <StyledTableCell align="center" component="th" scope="row">
		                Fecha de alta
		              </StyledTableCell>
		              <TableCell align="center">
		                <TextField
		                  type="date"
				  variant="outlined"                          
		                  defaultValue = {fecha}
				  id="Fecha"
		                  key="Fecha"
		                  inputRef={FechaRef}
				  InputLabelProps={{
                                    shrink: true,
                                  }}
		                />
		              </TableCell>                
		         </TableRow>  

		         <TableRow key="Propietario">
		              <StyledTableCell align="center" component="th" scope="row">
		                Propietario
		              </StyledTableCell>
		              <TableCell align="center">
		                <TextField
		                  variant="outlined"                          
		                  id="Propietario"
		                  key="Propietario"
		                  inputRef={PropietarioRef}
		                  error={PropietarioRef.current.error}
               			  helperText={errorPropietario.current}
                		  onBlur={Validaciones} 
                		  required
		                />
		              </TableCell>                
		         </TableRow>  

		         <TableRow key="Domicilio">
		              <StyledTableCell align="center" component="th" scope="row">
		                Domicilio
		              </StyledTableCell>
		              <TableCell align="center">
		                <TextField
		                  variant="outlined"                          
		                  id="Domicilio"
		                  key="Domicilio"
		                  inputRef={DomicilioRef}
		                  error={DomicilioRef.current.error}
               			  helperText={errorDomicilio.current}
                		  onBlur={Validaciones} 
                		  required
		                />
		              </TableCell>                
		         </TableRow>  

		         <TableRow key="Telefonos">
		              <StyledTableCell align="center" component="th" scope="row">
		                Teléfonos
		              </StyledTableCell>
		              <TableCell align="center">
		                <TextField
		                  variant="outlined"                          
		                  id="Telefono"
		                  key="Telefono"
		                  inputRef={TelefonoRef}
		                  error={TelefonoRef.current.error}
               			  helperText={errorTelefono.current}
                		  onBlur={Validaciones} 
                		  required
		                />
		              </TableCell>                
		         </TableRow>  

		         <TableRow key="Responsable">
		              <StyledTableCell align="center" component="th" scope="row">
		                Responsable
		              </StyledTableCell>
		              <TableCell align="center">
		                <TextField
		                  variant="outlined"                          
		                  id="Responsable"
		                  key="Responsable"
		                  inputRef={ResponsableRef}
		                  error={ResponsableRef.current.error}
               			  helperText={errorResponsable.current}
                		  onBlur={Validaciones} 
                		  required
		                />
		              </TableCell>                
		         </TableRow>  

		        </TableBody>
		      </Table>
		      
		      
		    </TableContainer>
		    
		    <Typography component="h1" variant="h5" align="left">
		      Datos del Autobús.
		    </Typography>
		    
		    <TableContainer component={Paper}>
		        <Grid item xs={12}>
		            <Box mr={2}>
		      <Table className={classes.table} aria-label="customized table">
		        <TableBody>
		        	
		          	<TableRow key="Marca">
						<StyledTableCell align="center" component="th" scope="row">
							Marca
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Marca"
								key="Propietario"
								inputRef={MarcaRef}
								error={MarcaRef.current.error}
               			  		helperText={errorMarca.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Modelo">
						<StyledTableCell align="center" component="th" scope="row">
						Modelo
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Modelo"
								key="Propietario"
								inputRef={ModeloRef}
								error={ModeloRef.current.error}
               			  		helperText={errorModelo.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Año">
						<StyledTableCell align="center" component="th" scope="row">
						Año
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Año"
								key="Propietario"
								inputRef={AnoRef}
								error={AnoRef.current.error}
               			  		helperText={errorAño.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Numero de motor">
						<StyledTableCell align="center" component="th" scope="row">
						Número de motor
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Numero de motor"
								key="Propietario"
								inputRef={NoMotorRef}
								error={NoMotorRef.current.error}
               			  		helperText={errorNumMotor.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Numero de chasis">
						<StyledTableCell align="center" component="th" scope="row">
						Número de chasis
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Numero de chasis"
								key="Propietario"
								inputRef={NoChasiRef}
								error={NoChasiRef.current.error}
               			  		helperText={errorNumChasis.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Numero de carroceria">
						<StyledTableCell align="center" component="th" scope="row">
						Número de carrocería
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Numero de carroceria"
								key="Propietario"
								inputRef={NoCarroRef}
								error={NoCarroRef.current.error}
               			  		helperText={errorNumCarroce.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Numero de transmision">
						<StyledTableCell align="center" component="th" scope="row">
						Número de transmisión
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Numero de transmision"
								key="Numero de transmision"
								inputRef={NoTransmisionRef}
								error={NoTransmisionRef.current.error}
               			  		helperText={errorNumTransmi.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Numero economico">
						<StyledTableCell align="center" component="th" scope="row">
						Número de económico
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Numero economico"
								key="Numero economico"
								inputRef={NoEcoRef}
								error={NoEcoRef.current.error}
               			  		helperText={errorNumEco.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Placa vehicular">
						<StyledTableCell align="center" component="th" scope="row">
						Placa vehicular
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Placa Vehicular"
								key="Placa vehicular"
								inputRef={PlacaRef}
								error={PlacaRef.current.error}
               			  		helperText={errorPlaca.current}
                		  		onBlur={Validaciones} 
                		  		required
							/>
						</TableCell>
					</TableRow>

					<TableRow key="Observaciones">
						<StyledTableCell align="center" component="th" scope="row">
						Observaciones
						</StyledTableCell>
						<TableCell align="center">
							<TextField
								variant="outlined"
								id="Propiertario"
								key="Observaciones"
								inputRef={ObservacionesRef}
							/>
						</TableCell>
					</TableRow>

		        </TableBody>
		      </Table>
		      </Box>
		      </Grid>
		    </TableContainer>

		    <TableContainer component={Paper}>
		      
		      <Table className={classes.table} aria-label="customized table">
		        <TableBody>
		          <TableCell align="center">
		              <TextField value = {nombre} label="Elaboró" variant="outlined" inputRef={ElaboroRef} />
		          </TableCell>
		        </TableBody>
		      </Table>
		    </TableContainer>
		    
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
    </Container>
    ); 

}
 
const rootElement = document.getElementById("root"); 
