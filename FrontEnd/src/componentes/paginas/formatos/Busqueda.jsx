import React, {useState, useRef, useEffect} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { green, purple } from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { useHistory } from "react-router-dom";
import {downloadPDF,viewPDF,downloadPDFP,downloadExcel} from '../../Functions/Busqueda';
import {getData} from '../../Functions/CedulaTRAFunctions';
import {getDataCedularti,downloadPDFR} from '../../Functions/RevTecnicaInicial';
import {getDataCon,PDF} from '../../Functions/Consumo';
import {sendFecha,sendFechaExcel} from '../../Functions/EstatusPatio';
import {getDataConsumoEmpresa,EPDF} from '../../Functions/ConsumoEmpresa';
import {getDataKilometraje,KPDF} from '../../Functions/Kilometraje'; 
import {getDataPruebas} from '../../Functions/PruebasDeDesempeños';
import {getDataRendimientos,RPDF} from '../../Functions/Rendimientos';
import swal from "sweetalert";


const Busqueda = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundColor: theme.palette.error.dark,
        },
        button: {
          margin: theme.spacing(1),
        },
  }));

    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(green[500]),
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[700],
          },
        },
      }))(Button);
      
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
            backgroundColor: theme.palette.action.hover,
            
          },
        },
      }))(TableRow);
      
      function createData(name, calories, fat) {
        return { name, calories, fat};
      }                        

      const classes = useStyles();           
      function getCurrentDate(separator='/'){
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
          return `${date<10?`0${date}`:`${date}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
        }
        var fecha = getCurrentDate();     
        const history = useHistory();
    
  const [age, setAge] = React.useState('');
  const [selectedValue, setSelectedValue]= useState(null);
  const dato = '';

  const handleChange = (event) => {
    setAge(event.target.value)
    if(event.target.value == 2 || event.target.value == 8 )
    {
      const formData = [{
       TipoBusqueda:  "Número Económico"
      } ]
	setRango(data2)
    setBusqueda(formData)
    }else if(event.target.value == 5){
      const formData = [{
        TipoBusqueda:  "Rango Fecha"
       } ]
	setBusqueda(data2)
       setRango(formData)
    }
/*    else if(event.target.value == 6)
    {
      const formData = [{
       TipoBusqueda:  "Empresa Operadora"
      } ]

    setBusqueda(formData)
    }*/
    else
	{
      setBusqueda(data2)
	setRango(data2)
	}    
console.log(event.target.value)
  };

  const formatos = ["Cedularti","Cedulatra","Consumo","ConsumoEmpresa","EstatusPatio","Kilometraje","PruebasDesempeño","REFFA","Rendimientos","ReporteIncidencias"]
  const mesesArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  const [age2, setAge2] = React.useState('');
  const [selectedValue2, setSelectedValue2]= useState(null);
  const dato2 = '';

  const handleChange2 = (event) => {
    setAge2(event.target.value);  
  };    
   const fechaInput = useRef('');
   const fechaInput2 = useRef('');
   const archivo = useRef('');

   const [data, setData] = useState([]);
   const [data1, setData1] = useState([]); 
   const [data2, setData2] = useState([]);
   const [data3, setData3] = useState([]);
   const [TipoBusqueda, setBusqueda] = useState([]);
   const [TipoFecha, setRango] = useState([]);
   const [preload, setPreload] = useState(true); 
   const NumeroEcoRef = useRef('')  

  const Envio = async() =>{
    setData3(data2)
    setData1(data2)
    setData(data2)   
   
    //console.log("Dato de Busqueda:" + NumeroEcoRef.current.value)
    if(archivo.current.value == 1){
      const _data = await getDataCedularti()
      if(_data.data)
      {
          console.log(_data.data)    
          setData3(_data.data)
          console.log(data3[0])
          setPreload(false)      
      }
      console.log("Data: " + data);
    }
    else if(archivo.current.value == 2)
    {
      if(NumeroEcoRef.current.value)
      {
        const _data = await getData(NumeroEcoRef.current.value)
        if(_data.data)
        {
          console.log(_data.data)    
          setData(_data.data)
          setPreload(false)      
        }
      }
      else
        swal("¡Error!","Ingrese el número económico.","error")
    }
    else if(archivo.current.value == 3)
    {
      let f = fechaInput.current.value
      let año = f.substring(0,4)
      f = f.substring(5,f.length)
      let m = f.substring(0,f.indexOf('-'))
      var meses = mesesArray[m-1]
      let expi = new Date(Number(new Date()) + (4 * 60 * 60000) )
      let formData = {
      	Mes: m,
      	Año: año
      }
      const espera = await PDF(formData);
      const _data = await getDataCon()
      console.log(_data)
      if(_data.data)
      {
        console.log(_data.data)    
        setData(_data.data)
        setPreload(false)              
      }
      console.log("Data incluye: " + data);
    }
    else if(archivo.current.value == 4)
    {
      let f = fechaInput.current.value
      let año = f.substring(0,4)
      f = f.substring(5,f.length)
      let m = f.substring(0,f.indexOf('-'))
      var meses = mesesArray[m-1]
      console.log("Hola en "+ meses+ ' '+m);
      let expi = new Date(Number(new Date()) + (4 * 60 * 60000) )
      let formData = {
        Mes: meses,
        Año: año
      }
      const espera = await EPDF(formData);
      const _data = await getDataConsumoEmpresa()
      if(_data.data){
        console.log(_data.data)    
        setData(_data.data)
        setPreload(false)      
      }
    }
    else if(archivo.current.value == 5)
    {
      var meses = fechaInput.current.value;    
      var meses2 = fechaInput2.current.value;
	if(meses2 < meses)
	{
		let a = meses
		meses = meses2
		meses2 = a
	}
      let formData = {}
      if(meses2 && meses)
	{
		if(meses2 == meses)
		{
			formData = {
                        	Fechadeliberacion: meses,
                	}
		}
		else
		{
			console.log(meses+ ' ' + meses2);
	      		formData = {
		       		Fechadeliberacion: meses,
				FechaFin: meses2
      			}
		}
	}
      else if(meses2 && !meses)
	{
		formData = {
                        Fechadeliberacion: meses2,
                }
	}
      else
	{
		formData = {
                	Fechadeliberacion: meses,
        	}
	}
	swal({
        title: "Descarga de archivos.",
        text: "Seleccione el tipo de archivo.",
        type: "success",
        buttons:{
	  cancel: "Cancelar",
          catch:{
            text: "PDF",
            value: "pdf"
          },
          catch1:{
            text: "EXCEL",
            value: "excel"
          },
        }
      }).then( async (value) => {	
	console.log(value)
	switch(value){
          case "pdf":
	    swal({
	        title: "¡Espere!",
	        text: "Generando PDF.",
	        type: "success",
        	showConfirmButton: "false"
       	    });
            await sendFecha(formData).then(response =>{
              const timer = setTimeout(() => {
                  if(meses && meses2)
                    downloadPDF('EstatusPatio'+meses+'a'+meses2,'estatusP/fetch-pdf')
                  else if(meses && !meses2)
                    downloadPDF('EstatusPatio'+meses,'estatusP/fetch-pdf')
                  else if(meses2 && !meses)
                    downloadPDF('EstatusPatio'+meses2,'estatusP/fetch-pdf')
                  swal("¡Listo!","Se descargó tu pdf.","success")
                }, 15000);
              })
            break;
          case "excel":
		 swal({
		        title: "¡Espere!",
		        text: "Generando Excel.",
		        type: "success",
		        showConfirmButton: "false"
	         });
            await sendFechaExcel(formData).then(response =>{
              const timer = setTimeout(() => {
                if(meses && meses2)
                        downloadExcel('EstatusPatio'+meses+'a'+meses2,'estatusP/fetch-excel')
                else if(meses && !meses2)
                        downloadExcel('EstatusPatio'+meses,'estatusP/fetch-excel')
                else if(meses2 && !meses)
                        downloadExcel('EstatusPatio'+meses2,'estatusP/fetch-excel')
                  swal("¡Listo!","Se descargó tu Excel.","success")
              }, 15000);
        
              })
            break;
        }
      })

    }
    else if(archivo.current.value == 6)
    {
//      if(NumeroEcoRef.current.value)
//      {
        let f = fechaInput.current.value
        let año = f.substring(0,4)
        f = f.substring(5,f.length)
        let m = f.substring(0,f.indexOf('-'))
        var meses = mesesArray[m-1]
        console.log(meses);
        let formData = {
          Año: año,
          Mes: meses,
          EmpresaOperadora: NumeroEcoRef.current.value
        }
        // console.log("Aqui")
        swal({
          title: "¡Espere!",
          text: "Generando pdf.",
          type: "success"
        });
        let esp = await KPDF(formData)
        const _data = await getDataKilometraje()
        if(_data.data)
        {
          console.log(_data.data)    
          setData(_data.data)
          setPreload(false)      
        } 
        swal("¡Listo!","Puede descargar los pdf.","success")                              
  /*    }
      else
        swal("¡Error!","Ingrese la empresa operadora.","error")
   */   
    }
    else if(archivo.current.value == 7)
    {
      const _data = await getDataPruebas()
      if(_data.data)
      {
        console.log(_data.data)    
        setData1(_data.data)
        setPreload(false)      
      }      
    }
    else if(archivo.current.value == 8)
    {
      swal({
        title: "¡Espere!",
        text: "Generando pdf.",
        type: "success",
        showConfirmButton: "false"
      });
      await(downloadPDF(NumeroEcoRef.current.value,'fotos/fetchPDF')).then(respone => {
        const timer = setTimeout(() => {            
          swal("¡Listo!","Se descargó tu pdf.","success")
        }, 15000);
      }) 
      
    }
    else if(archivo.current.value == 9)
    {
      console.log("Buscando rendimientos")
      let f = fechaInput.current.value
      let año = f.substring(0,4)
      f = f.substring(5,f.length)
      let m = f.substring(0,f.indexOf('-'))
      var meses = mesesArray[m-1]
      let formData = {
        Año: año,
        Mes: meses
      }
      let esp = await RPDF(formData)
      const _data = await getDataRendimientos()
      if(_data.data)
      {
        console.log(_data.data)    
        setData(_data.data)
        setPreload(false)      
      }  
    }
  }

  
  useEffect(() => {
    //función que va a cargar los datos
  }, []);

    return (       
     
      <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>
        Para buscar un formato seleccione el tipo y la fecha.
        <FormControl className={classes.paper}>

        <InputLabel htmlFor="age-native-simple">Seleccione el tipo de formato</InputLabel>
        <Select inputRef = {archivo} native onChange={handleChange} inputProps={{
             name: 'age',
             id: 'age-native-simple',             
           }}
        >
          <option aria-label="None" value="" />
          <option value={1}>Cédula de revisión técnica inicial del autobús</option>
          <option value={2}>Cédula técnica de registro del autobús</option>
          <option value={3}>Consumo de combustible</option>
          <option value={4}>Consumo y mantenimiento</option>
          <option value={5}>Estatus de patio</option>
          <option value={6}>Kilometraje</option>
          <option value={7}>Pruebas de desempeño</option>
          <option value={8}>REFFA</option>
          <option value={9}>Rendimientos</option>          
          
        </Select>
      {TipoBusqueda.map((row) => (
                  <div>
                      
                  <TextField label={row.TipoBusqueda}   inputRef={NumeroEcoRef} id="TipoBusqueda" />
                  </div>
      ))}
        

        <TextField  

            htmlFor="age-native-simple"
            native              
           onChange={handleChange2}
           inputProps={{
             name: 'age2',
             id: 'age2-native-simple',
           }}

            id="date"
            label="Fecha"
            type="date"
            inputRef = {fechaInput}
            defaultValue={fecha}
            className={classes.textField}
            InputLabelProps={{shrink: true,}}
          />  

{TipoFecha.map((row) => (
                  
                  <TextField label={row.TipoFecha} 
                  type="date"
		  label="Fecha 2"
                  inputRef = {fechaInput2}
                  defaultValue={fecha} 
                  id="TipoFecha"
                  InputLabelProps={{shrink: true,}} />
                  
      ))} 

        <Button
            type="submit"
            width= "25%"
            align= "right"
            variant="contained"
            className={classes.submit}
            onClick={Envio}>
            Buscar 
          </Button> {/* Finaliza "Buscar." */}

      </FormControl>  

      <br/>    

      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre del PDF</StyledTableCell>
            <StyledTableCell align="center">Descargar</StyledTableCell>
            <StyledTableCell align="center">Visualizar</StyledTableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.NombrePDF}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.NombrePDF}                
              </StyledTableCell>              
              <StyledTableCell align="center">
              {/* <Button
                    type="submit"
                    width= "25%"
                    align= "right"
                    variant="contained"
                    className={classes.submit}
                    onClick={() => {                                    
                        downloadPDF(row.NombrePDF,row.Ruta)
                      }}>
                    Descar
                </Button> */}
                 <Button
                                    type="submit"
                                    variant="contained"
                                    color="Primary"
                                    className={classes.button}
                                    startIcon={<AssignmentIcon />}
                                    onClick={() => {
                                      downloadPDF(row.NombrePDF,row.Ruta)
                                    }}
                          >
                              PDF
                          </Button>
                          <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<BarChartIcon />}
                                    onClick={() => {
                                      downloadPDF(row.NombrePDF,row.Ruta)
                                    }}
                                    disabled
                          >
                              Excel
                          </Button>
                </StyledTableCell>
                <StyledTableCell align="center" component="th" scope="row"> 
              <IconButton 
              type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                     onClick={() => {
                                       viewPDF(row.NombrePDF,row.Ruta)
                                   }}
              >
                  <VisibilityIcon />
              </IconButton>          
              </StyledTableCell> 
            </StyledTableRow>
          ))}
      	  {data1.map((row) => (
                  <StyledTableRow key={row.NombrePDF}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.NombrePDF}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="Primary"
                                    className={classes.button}
                                    startIcon={<AssignmentIcon />}
                                    onClick={() => {
                                      downloadPDFP(row)
                                    }}
                          >
                              PDF
                          </Button>
                          <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<BarChartIcon />}
                                    onClick={() => {
                                      downloadPDFP(row)
                                    }}
                                    disabled
                          >
                              Excel
                          </Button></StyledTableCell>
                          <StyledTableCell align="center" component="th" scope="row"> 
              <IconButton 
              type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                     onClick={() => {
                                       viewPDF(row.NombrePDF,row.Ruta)
                                   }}
              >
                  <VisibilityIcon />
              </IconButton>          
              </StyledTableCell> 

                  </StyledTableRow>
                  
                ))}
          	{data3.map((row) => (
                      <StyledTableRow key={row.NombrePDF}>
                        <StyledTableCell align="center" component="th" scope="row">
                          {row.NombrePDF}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                        {/* <Button
                              type="submit"
                              width= "25%"
                              align= "right"
                              variant="contained"
                              className={classes.submit}
                              onClick={() => {
                                  downloadPDFR(row)
                                }}>
                              Descargar PDF
                          </Button> */}
                          <Button
                                    type="submit"
                                    variant="contained"
                                    color="Primary"
                                    className={classes.button}
                                    startIcon={<AssignmentIcon />}
                                    onClick={() => {
                                      downloadPDFR(row)
                                    }}
                          >
                              PDF
                          </Button>
                          <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<BarChartIcon />}
                                    onClick={() => {
                                      downloadPDFR(row)
                                    }}
                                    disabled
                          >
                              Excel
                          </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center" component="th" scope="row"> 
              <IconButton 
              type="submit"
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                     onClick={() => {
                                       viewPDF(row.NombrePDF,row.Ruta)
                                   }}
              >
                  <VisibilityIcon />
              </IconButton>          
              </StyledTableCell> 

                      </StyledTableRow>
                    ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  </Container>
    );
}
 
export default withRouter(Busqueda);
