import React, { useRef, useState, useEffect, createRef } from 'react';
import ReactDOM from "react-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import swal from "sweetalert"
import { green, purple } from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { useHistory } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Input, TextField, Container, Typography } from '@material-ui/core';
import {sendData} from '../../Functions/ConsumoEmpresa'
import {sendDataM} from '../../Functions/Mantenimientos'

const ConsumoMantenimiento = () => {

      const [Mensajes, setMensajes] = useState([]);

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
      function createData(name) {
        return { name};
      }
      const history = useHistory();
      const classes = useStyles();

      function getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
          return `${year}${separator="-"}${month<10?`0${month}`:`${month}`}${separator="-"}${date}`
      }
      function getCurrentMonth(separator=''){

        let newDate = new Date()
        let month = newDate.getMonth();
        return `${month}`
     }
     function getCurrentYear(separator=''){

        let newDate = new Date()
        let year = newDate.getFullYear();
        return `${year}`
     }
     function getCurrentDay(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        return `${date}`
     }


      const fecha = getCurrentDate();
      
      const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const month = meses[getCurrentMonth()];
      const año = getCurrentYear();
      const dia = getCurrentDay() 

      const [rows, setRows] = useState([{}]);
      var [numrow,setNum] = useState(1);
      var aumrow = useRef();

      const [rowss, setRowss] = useState([{}]);
      var [numroww,setNumm] = useState(1);
      var aumroww = useRef();


      const item = {
            NumeroEconomico: "",
            KMRecorridoPorMes: "",
            ConsumoDiesel: "",
            ConsumoAdblue: "",
            RendimientoDiesel: "",
            RendimientoAdblue: "",
      };

      const itemm = {
            NumeroEconomico: "",
            KMRecorridoPorMes: "",
            ConsumoDiesel: "",
            ConsumoAdblue: "",
            RendimientoDiesel: "",
            RendimientoAdblue: "",
      };

      const NumeroEcoRef = useRef([null])
      const KmMesRef = useRef([null])
      const ConsumoDRef = useRef(['/'])
      const ConsumoARef = useRef(['/'])
      const RendimientoDRef = useRef(['/'])
      const RendimientoARef = useRef(['/'])
      
      const EmpresaOpeRef = useRef('')
      const NumeroEcoMRef = useRef([null])
      const FechaManteRef = useRef(['/'])
      const TipoManteRef = useRef(['/'])
      const LecturaOdoARef = useRef(['/'])
      const LecturaOdoRef = useRef(['/'])
      const ObservacionesRef = useRef(['/'])

      //Constantes de consumo
      const errorNumEco = useRef([])
      const errorKilometraje = useRef([])
      const errorConsumoD = useRef([])
      const errorConsumoA = useRef([])
      const errorRendimientoD = useRef([])
      const errorRendimientoA = useRef([])

      const NumeroEcoError = useRef([])
      const KilometrajeError = useRef([])
      const ConsumoDError = useRef([])
      const ConsumoAError = useRef([])
      const RendimientoDError = useRef([])
      const RendimientoAError = useRef([])

      //Constantes de mantenimiento
      const errorEmpresa = useRef([])
      const errorNumEcoM = useRef([])
      const errorTipoM = useRef([])
      const errorOdometroAnte = useRef([])
      const errorOdometro = useRef([])

      const EmpresaError = useRef ([])
      const NumeroEcoErrorM = useRef([])
      const TipoMError = useRef([])
      const OdometroAnteError = useRef([])
      const OdometroError = useRef([])

      const Validaciones = (event) => {

      const nombre = event.currentTarget.name;
      const valor = event.currentTarget.value;
      const index = event.currentTarget.id;
      console.log(nombre);

      //Validaciones para el consumo

      if(nombre.includes("NumeroEconomico"))
      {
        if(!/^[A-ZñÑa-z0-9-. ]+$/i.test(valor))
        {
          errorNumEco.current[index] = "El número económico no acepta caracteres especiales.";
          NumeroEcoError.current[index]=true;
          setMensajes(index);
        }
        else
        {
          errorNumEco.current[index] = "";
          NumeroEcoError.current[index]=false;
          setMensajes(index+'a');
        }

      } 

      else if(nombre.includes("Kilometraje")){
        if(!/^[0-9.]+$/i.test(valor)){
          errorKilometraje.current[index] = "El kilometraje solo admite números.";
          KilometrajeError.current[index]=true;
          setMensajes(index+"b");
        }
        else{
          errorKilometraje.current[index] = "";
          KilometrajeError.current[index]=false;
          setMensajes(index+"c");
        }
      }  

      else if(nombre.includes("ConsumoD")){
        if(!/^[0-9/\A-ZñÑa-z]+$/i.test(valor)){
          errorConsumoD.current[index] = "El consumo de diesel solo admite números.";
          ConsumoDError.current[index]=true;
          setMensajes(index+"d");
        }
        else{
          errorConsumoD.current[index] = "";
          ConsumoDError.current[index]=false;
          setMensajes(index+"e");
        }
      }

      else if(nombre.includes("ConsumoA")){
        if(!/^[0-9]+$/i.test(valor)){
          errorConsumoA.current[index] = "El consumo de adblue solo admite números.";
          ConsumoAError.current[index]=true;
          setMensajes(index+"f");
        }
        else{
          errorConsumoA.current[index] = "";
          ConsumoAError.current[index]=false;
          setMensajes(index+"g");
        }
      }

      else if(nombre.includes("ConsumoA")){
        if(!/^[0-9]+$/i.test(valor)){
          errorConsumoA.current[index] = "El consumo de adblue solo admite números.";
          ConsumoAError.current[index]=true;
          setMensajes(index+"f");
        }
        else{
          errorConsumoA.current[index] = "";
          ConsumoAError.current[index]=false;
          setMensajes(index+"g");
        }
      }

      else if(nombre.includes("RendimientoD")){
        if(!/^[0-9/\A-ZñÑa-z./]+$/i.test(valor)){
          errorRendimientoD.current[index] = "El rendimiento de diesel solo admite números.";
          RendimientoDError.current[index]=true;
          setMensajes(index+"h");
        }
        else{
          errorRendimientoD.current[index] = "";
          RendimientoDError.current[index]=false;
          setMensajes(index+"i");
        }
      }

      else if(nombre.includes("RendimientoA")){
        if(!/^[0-9./]+$/i.test(valor)){
          errorRendimientoA.current[index] = "El rendimiento de adblue solo admite números.";
          RendimientoAError.current[index]=true;
          setMensajes(index+"j");
        }
        else{
          errorRendimientoA.current[index] = "";
          RendimientoAError.current[index]=false;
          setMensajes(index+"k");
        }
      }

      else if(nombre=="EmpresaOperadora"){
        if(!/^[0-9A-ZñÑa-z\- ]+$/i.test(valor)){
          errorEmpresa.current = "La empresa operadora no admite caracteres especiales.";
          EmpresaError.current.error=true;
          setMensajes("l");
        }
        else{
          errorEmpresa.current= "";
          EmpresaError.current.error=false;
          setMensajes("m");
        }
      }

      //Validaciones para el mantenimiento

      else if(nombre.includes("Economico")){
        if(!/^[A-ZñÑa-z0-9-. ]+$/i.test(valor))
        {
          errorNumEcoM.current[index] = "El número económico no acepta caracteres especiales.";
          NumeroEcoErrorM.current[index]=true;
          setMensajes(index+"n");
        }
        else
        {
          errorNumEcoM.current[index] = "";
          NumeroEcoErrorM.current[index]=false;
          setMensajes(index+"o");
        }

      }

      else if(nombre.includes("TipoMantenimiento")){
          if(!/^[A-ZñÑa-z., ]+$/i.test(valor))
          {
            errorTipoM.current[index] = "El tipo de mantenimiento no acepta caracteres especiales.";
            TipoMError.current[index]=true;
            setMensajes(index+"p");
          }
          else
          {
            errorTipoM.current[index] = "";
            TipoMError.current[index]=false;
            setMensajes(index+'q');
          }

        }  

      else if(nombre.includes("LecturaOdoA")){
          if(!/^[0-9. ]+$/i.test(valor))
          {
            errorOdometroAnte.current[index] = "La lectura del odómetro del mantenimiento anterior solo acepta números";
            OdometroAnteError.current[index]=true;
            setMensajes(index+"r");
          }
          else
          {
            errorOdometroAnte.current[index] = "";
            OdometroAnteError.current[index]=false;
            setMensajes(index+'s');
          }

        }

        else if(nombre.includes("LecturaOdo")){
          if(!/^[0-9. ]+$/i.test(valor))
          {
            errorOdometro.current[index] = "La lectura del odómetro solo acepta números";
            OdometroError.current[index]=true;
            setMensajes(index+"t");
          }
          else
          {
            errorOdometro.current[index] = "";
            OdometroError.current[index]=false;
            setMensajes(index+'u');
          }

        } 

      }

      const handletablaidow = () => {
	let a = 0 - 0
        if(aumrow.current.value)
                a = aumrow.current.value
        else
                a = 1 - 0

        setNum(numrow + parseInt(a))
        for(let i = 0; i < (a-1); i++)
          rows.push(item); 
        setRows([...rows, item]);
        aumrow.current.value=0
      };
      const handleRemoveRow = () => {
        setRows(rows.slice(0, numrow-1));
        setNum(numrow-1)
      };
/***********************************Falta cambiar las variables con las de la BD*********************************************************************/
      const handletablaidoww = () => {
	let a = 0 - 0
        if(aumroww.current.value)
                a = aumroww.current.value
        else
                a = 1 - 0

        //let a = aumroww.current.value
        setNumm(numroww + parseInt(a))
        for(let i = 0; i < (a-1); i++)
          rowss.push(itemm); 
        setRowss([...rowss, itemm]);
        aumroww.current.value=0
      };
      const handleRemoveRoww = () => {
        setRowss(rowss.slice(0, numroww-1));
        setNumm(numroww-1)
      };

      function updateInputValue(evt) {
        numrow += evt.target.value;
        aumrow =  evt.target.value;
      }

      

      useEffect(() => {
        handleUpdate();
      }, [])
/***********************************Falta cambiar las variables con las de la BD para la parte de matenimiento*********************************************************************/
      function handleUpdate(){        
        let tam = parseInt(localStorage.getItem('Size'));
        if(tam > 0){
          for(let i = 0; i <tam; i++){
            console.log('NumeroEcoRef: ' + localStorage.getItem('NumeroEcoRef'+i))
            NumeroEcoRef.current[i].value = localStorage.getItem('NumeroEcoRef'+i)
            //localStorage.removeItem('NumeroEcoRef'+i)
            KmMesRef.current[i].value = localStorage.getItem('KmMesRef'+i)
            //localStorage.removeItem('KmMesRef'+i)
          }
        }
      }  
    const Envio = async() =>{
	await Computo()
	swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
        history.replace("/Revisiones/Formatos")
    }
    const Computo = () => {
        //
        for(let i = 0; i < parseInt(numrow); i++)
        {
          if(NumeroEcoRef.current[i].value && KmMesRef.current[i].value && ConsumoDRef.current[i].value && ConsumoARef.current[i].value && RendimientoDRef.current[i].value && RendimientoARef.current[i].value)
          {
            const formData = {
              NumeroEconomico: NumeroEcoRef.current[i].value,
              Mes: month, 
              KilometrajePorMes: KmMesRef.current[i].value,
	          ConsumoMensualDiesel: RendimientoDRef.current[i].value,
    ConsumoMensualAdblue: RendimientoARef.current[i].value,
    RendimientoDiesel: ConsumoDRef.current[i].value, 
    RendimientoAdblue: ConsumoARef.current[i].value	
	/*
              ConsumoMensualDiesel: ConsumoDRef.current[i].value,
              ConsumoMensualAdblue: ConsumoARef.current[i].value,
              RendimientoDiesel: RendimientoDRef.current[i].value,
              RendimientoAdblue: RendimientoARef.current[i].value*/
            }
            if(i != parseInt(numrow) - 1 )
              sendData(formData).then(response => {
                console.log("Enviando...")
                console.log("Fin...")  
              })
            else
              sendData(formData).then(response => {
                console.log("Enviando...")
                console.log("Fin...")  
                //swal("Felicidades!","Tus datos se enviaron correctamente. ", "success")
                //history.replace("/Revisiones/Formatos")
              })
          }
        }
        console.log(numroww)
        for(let i = 0; i < parseInt(numroww); i++)
        {
          if(NumeroEcoMRef.current[i].value && FechaManteRef.current[i].value && TipoManteRef.current[i].value && LecturaOdoARef.current[i].value && LecturaOdoRef.current[i].value)
          {
            if(!ObservacionesRef.current[i].value)
              ObservacionesRef.current[i].value = "Ninguna"
            let fecha1 = new Date(FechaManteRef.current[i].value)
            let año1 = fecha1.getFullYear()
            let mes1 = meses[fecha1.getMonth()]
            let dia1 = fecha1.getDate()+1
            const formData = {
              EmpresaOperadora: EmpresaOpeRef.current.value,
              NumeroEconomico: NumeroEcoMRef.current[i].value,
              Dia: dia1,
              Mes: mes1, 
              Año: año1,
              TipoMantenimiento: TipoManteRef.current[i].value,
              LecturaOdometroAnterior: LecturaOdoARef.current[i].value,
              LecturaOdometro: LecturaOdoRef.current[i].value,
              Observaciones: ObservacionesRef.current[i].value
            }
//            if(i != parseInt(numrow) - 1 )
              sendDataM(formData).then(response => {
  /*              console.log("Enviando...")
                console.log("Fin...")  
              })
           else
              sendDataM(formData).then(response => {
                console.log("Enviando...")
                console.log("Fin...")  
         */     swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
//                history.replace("/Revisiones/Formatos")
              })
          }
        }
// history.replace("/Revisiones/Formatos")
      }

    return (
    <Container component="main">

    <Typography component="h1" variant="h5" align="left">
      Consumo y mantenimiento de combustible
    </Typography>
    <Typography component="h1" variant="h5" align="left">
      {fecha}
    </Typography>
    <TableContainer component={Paper}>
        {/* <Grid item xs={12}>
            <Box mr={2}>*/}
      <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" component="th" scope="row">Número Económico</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">KM Recorrido por Mes</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Consumo Diesel (lts)</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Consumo Adblue (lts)</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Rendimiento Diesel (km/lts)</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Rendimiento Adblue (km/lts)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item, index) => (
                        <TableRow id="tablaid" key={index}>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    defaultValue = {(el) => (NumeroEcoRef.current[index] = el)}
                                    variant="outlined"
                                    type="text"
                                    id= {index}
                                    name={"NumeroEconomico"+index}
                                    defaultvalue = {(el) => (el = NumeroEcoRef.current[index].value)}
                                    inputRef={(el) => (NumeroEcoRef.current[index] = el)}
                                    error={NumeroEcoError.current[index]}
                                    helperText={errorNumEco.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id={index}
                                    name={"Kilometraje"+index}
                                    inputRef={(el) => (KmMesRef.current[index] = el)}
                                    error={KilometrajeError.current[index]}
                                    helperText={errorKilometraje.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                             <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id={index}
                                    name={"ConsumoD"+index}
                                    inputRef={(el) => (ConsumoDRef.current[index] = el)}
                                    error={ConsumoDError.current[index]}
                                    helperText={errorConsumoD.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id= {index}
                                    name={"ConsumoA"+index}
                                    inputRef={(el) => (ConsumoARef.current[index] = el)}
                                    error={ConsumoAError.current[index]}
                                    helperText={errorConsumoA.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                              </TableCell>  
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id={index}
                                    name={"RendimientoD"+index}
                                    inputRef={(el) => (RendimientoDRef.current[index] = el)}
                                    error={RendimientoDError.current[index]}
                                    helperText={errorRendimientoD.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id={index}
                                    name={"RendimientoA"+index}
                                    inputRef={(el) => (RendimientoARef.current[index] = el)}
                                    error={RendimientoAError.current[index]}
                                    helperText={errorRendimientoA.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
      {/* </Box>*/}
      &nbsp;&nbsp;
      <Input id="standart-basic" type="number" size="small" inputRef={aumrow}/>
      <Button
                 className={classes.submit} 
                 onClick={handletablaidow}>Agregar Fila(s)</Button>
                 &nbsp;
{/*            <Button className={classes.submit} 
                 onClick={handletablaidow}onClick={handleRemoveRow}>
                Borrar Fila
            </Button>
    </Grid>*/}
    </TableContainer>
    &nbsp;
    &nbsp;
    <Typography component="h1" variant="h5" align="left">
      Reporte Mensual de Mantenimiento Preventivo
    </Typography>
    <Typography component="h1" variant="h5" align="left">
      <p>Empresa Operadora:
      <TextField 
        variant="outlined" 
        style={{marginLeft : 15 }} 
        type="text" 
        id= "EmpresaOperadora"
        name={"EmpresaOperadora"} 
        inputRef={EmpresaOpeRef}
        error={EmpresaError.current.error}
        helperText={errorEmpresa.current}
        onBlur={Validaciones} 
        required
        />
      </p>
    </Typography>
    <TableContainer component={Paper}>
        {/* <Grid item xs={12}>
            <Box mr={2}>*/}
      <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" component="th" scope="row">No.</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Número Económico</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Fecha de Mantenimiento</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Tipo de Mantenimiento</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Lectura de Odómetro del Mantenimiento Anterior</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Lectura de Odómetro</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Observaciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowss.map((itemm, index) => (
                        <TableRow id="tablaid" key={index}>
                          <StyledTableCell align="center" component="th" scope="row">{index+1}</StyledTableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    defaultValue = {(el) => (NumeroEcoMRef.current[index] = el)}
                                    variant="outlined"
                                    type="text"
                                    id= {index}
                                    name={"Economico"+index}
                                    defaultvalue = {(el) => (el = NumeroEcoMRef.current[index].value)}
                                    inputRef={(el) => (NumeroEcoMRef.current[index] = el)}
                                    error={NumeroEcoErrorM.current[index]}
                                    helperText={errorNumEcoM.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    htmlFor="age-native-simple"
                                    native       
                                    id={"date"+index}
                                    type="date"
                                    defaultValue={fecha}
                                    inputRef={(el) => (FechaManteRef.current[index] = el)}
                                    className={classes.textField}
                                    InputLabelProps={{shrink: true,}}
                                  />  
                            </TableCell>
                             <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id={index}
                                    name={"TipoMantenimiento"+index}
                                    inputRef={(el) => (TipoManteRef.current[index] = el)}
                                    error={TipoMError.current[index]}
                                    helperText={errorTipoM.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id={index}
                                    name={"LecturaOdoA"+index}
                                    inputRef={(el) => (LecturaOdoARef.current[index] = el)}
                                    error={OdometroAnteError.current[index]}
                                    helperText={errorOdometroAnte.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                              </TableCell>  
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    id={index}
                                    name={"LecturaOdo"+index}
                                    inputRef={(el) => (LecturaOdoRef.current[index] = el)}
                                    error={OdometroError.current[index]}
                                    helperText={errorOdometro.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    name={"Observaciones"+index}
                                    inputRef={(el) => (ObservacionesRef.current[index] = el)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
      {/* </Box>*/}
      &nbsp;&nbsp;
      <Input id="standart-basic" type="number" size="small" inputRef={aumroww}/>
      <Button
                 className={classes.submit} 
                 onClick={handletablaidoww}>Agregar Fila(s)</Button>
                 &nbsp;
      {/*      <Button className={classes.submit} 
                 onClick={handletablaidoww}onClick={handleRemoveRoww}>
                Borrar Fila
            </Button>
     </Grid>*/}
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
            type="submit"
            width= "25%"
            align= "right"
      style={{float:"right"}}
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={Envio}>
          Siguiente
    </Button>
    </Container>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ConsumoMantenimiento />, rootElement);
 
export default withRouter(ConsumoMantenimiento);

