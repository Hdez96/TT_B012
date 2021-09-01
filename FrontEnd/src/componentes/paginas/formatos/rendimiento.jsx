import React, { useRef, useState, useEffect, createRef } from 'react';
import ReactDOM from "react-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrainIcon from '@material-ui/icons/TrainOutlined';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import swal from "sweetalert";
import { Input, TextField, Container, Typography } from '@material-ui/core';
import { sendData } from '../../Functions/Rendimientos'

function Rendimientos() {

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
  const classes = useStyles();
  const history = useHistory();   

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
      const fecha = getCurrentDate();

      const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const month = meses[getCurrentMonth()];
      const mes = meses[parseInt(fecha.substr(5,2))];
      
    const [rows, setRows] = useState([{}]);

    const NumeroEcoRef = useRef([])
    const KmRef = useRef([])
    const ConsumoRef = useRef([])
    const RendimientoRef = useRef([])
    const PeriodoRef = useRef([])

    var [numrow,setNum] = useState(1);
    var aumrow = useRef();

    const errorEcoRef = useRef([])
    const errorKilometrajeRef = useRef([])
    const errorConsumoRef = useRef([])
    const errorRendimientoRef = useRef([])

    const NumeroEcoError = useRef([])
    const KilometrajeError = useRef([])
    const ConsumoError = useRef([])
    const RendimientoError = useRef([])

    const Validaciones = (event) => {

      const nombre = event.currentTarget.name;
      const valor = event.currentTarget.value;
      const index = event.currentTarget.id;
      console.log(nombre + valor + index);

      if(nombre.includes("NumeroEconomico"))
      {
        if(!/^[A-ZñÑa-z0-9-. ]+$/i.test(valor))
        {
          errorEcoRef.current[index] = "El número económico no acepta caracteres especiales.";
          NumeroEcoError.current[index]=true;
          setMensajes(index);
        }
        else
        {
          errorEcoRef.current[index] = "";
          NumeroEcoError.current[index]=false;
          setMensajes(index+'a');
        }

      }

      else if(nombre.includes("Kilometraje")){
        if(!/^[0-9.]+$/i.test(valor)){
          errorKilometrajeRef.current[index] = "El kilometraje solo admite números.";
          KilometrajeError.current[index]=true;
          setMensajes(index+"e");
        }
        else{
          errorKilometrajeRef.current[index] = "";
          KilometrajeError.current[index]=false;
          setMensajes(index+"i");
        }
      } 

      else if(nombre.includes("Consumo")){
        if(!/^[0-9/\A-ZñÑa-z]+$/i.test(valor)){
          errorConsumoRef.current[index] = "El consumo solo admite números.";
          ConsumoError.current[index]=true;
          setMensajes(index+"o");
        }
        else{
          errorConsumoRef.current[index] = "";
          ConsumoError.current[index]=false;
          setMensajes(index+"u");
        }
      } 

      else if(nombre.includes("Rendimiento")){
        if(!/^[0-9/\A-ZñÑa-z]+$/i.test(valor)){
          errorRendimientoRef.current[index] = "El rendimiento solo admite números.";
          RendimientoError.current[index]=true;
          setMensajes(index+"aa");
        }
        else{
          errorRendimientoRef.current[index] = "";
          RendimientoError.current[index]=false;
          setMensajes(index+"ee");
        }
      } 

    } 

    const handletablaidow = () => {
//        let a = aumrow.current.value
  	let a = 0 - 0
        if(aumrow.current.value)
                a = aumrow.current.value
        else
                a = 1 - 0

        setNum(numrow + parseInt(a))
        const item = {
            NumeroEconomico: "",
            Kilometraje: "",
            Fecha: ""
        };
        for(let i = 0; i < (a-1); i++)
          rows.push(item); 
        setRows([...rows, item]);
        aumrow.current.value=null
    };
    const handleRemoveRow = () => {
        setRows(rows.slice(0, numrow-1));
        setNum(numrow-1)
    };

    function updateInputValue(evt) {
      numrow += evt.target.value;
      aumrow =  evt.target.value;
  	}
  const Envio = async() => {
	await Computo()
	history.replace("/Revisiones/Formatos")
  }
  const Computo = () => {
      console.log(numrow)
  		for(let i = 0; i < parseInt(numrow); i++)
      {
        var mesValue = "", año = "";
        if(NumeroEcoRef.current[i].value &&  KmRef.current[i].value && ConsumoRef.current[i].value && PeriodoRef.current[i].value)
        {
          mesValue = PeriodoRef.current[i].value;          
          console.log(NumeroEcoRef.current[i].value + " " + KmRef.current[i].value + " " + ConsumoRef.current[i].value + " " + PeriodoRef.current[i].value + "\n")
          const formData = {
            NumeroEconomico: NumeroEcoRef.current[i].value,
            Kilometraje: KmRef.current[i].value,
            ConsumoDiesel: ConsumoRef.current[i].value,
            RendimientoDiesel: RendimientoRef.current[i].value,
            Periodo: mesValue,
            Año: getCurrentYear()
          }
          sendData(formData).then(response => {
            console.log("Enviando...")
            console.log("Fin...")  
          })
          
        }
      }
      swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
      //history.replace("/Revisiones/Formatos")
  	}

    return (
        <div>

        <Typography component="h1" variant="h5" align="left">
      Rendimiento.
    </Typography>
         <Typography component="h1" variant="h5" align="left">
      {fecha}
    </Typography>
    <br></br>
        <TableContainer component={Paper}>
        {/* <Grid item xs={12}>
            <Box mr={2}>
           */} <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" component="th" scope="row">No.</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Número Económico</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Kilometraje</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Consumo Diesel (lts)</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Rendimiento Diesel (km/lts)</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Período</StyledTableCell>
                        <StyledTableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item, index) => (
                        <TableRow id="tablaid" key={index+1}>
                            <StyledTableCell align="center" component="th" scope="row">{index+1}</StyledTableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"NumeroEconomico"+index}
                                    inputRef={(el) => (NumeroEcoRef.current[index] = el)}
                                    error={NumeroEcoError.current[index]}
                                    helperText={errorEcoRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"Kilometraje"+index}
                                    inputRef={(el) => (KmRef.current[index] = el)}
                                    error={KilometrajeError.current[index]}
                                    helperText={errorKilometrajeRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"Consumo"+index}
                                    inputRef={(el) => (ConsumoRef.current[index] = el)}
                                    error={ConsumoError.current[index]}
                                    helperText={errorConsumoRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"Rendimiento"+index}
                                    inputRef={(el) => (RendimientoRef.current[index] = el)}
                                    error={RendimientoError.current[index]}
                                    helperText={errorRendimientoRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                             <StyledTableCell align="center" component="th" scope="row">
                               <Input
                                    type="text"
                                    name={"Mes"+index}
                                    defaultValue={month}
                                    inputRef={(el) => (PeriodoRef.current[index] = el)}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="center" component="th" scope="row">
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* </Box>*/}
            &nbsp;&nbsp;
            <Input id="standart-basic" type="number" size="small" inputRef={aumrow}/>
            <Button
                 className={classes.submit} 
                 onClick={handletablaidow}>Agregar Fila</Button>
                 &nbsp;
      {/*      <Button className={classes.submit} 
                 onClick={handletablaidow}onClick={handleRemoveRow}>
                Borrar Fila
            </Button>*/}
            {/* </Grid>*/}
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
            onClick={Envio}
            >
          Siguiente
    </Button>
        </div>
    );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Rendimientos />, rootElement);

export default withRouter(Rendimientos);
