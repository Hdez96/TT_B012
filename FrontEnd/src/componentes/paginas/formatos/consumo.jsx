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
import { sendData } from '../../Functions/Consumo'



function Consumo() {

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
    const history = useHistory()
    function getCurrentYear(separator=''){

        let newDate = new Date()
        let year = newDate.getFullYear();
        return `${year}`
     }
     function getCurrentMonth(separator=''){

        let newDate = new Date()
        let month = newDate.getMonth() ;
        return `${month}`
     }
      const fecha = getCurrentYear();
      const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const month = meses[getCurrentMonth()];



    const [rows, setRows] = useState([{}]);

    const NumeroEcoRef = useRef([])
    const ConsumoRef = useRef([])
    const MesRef = useRef([])

    const errorEcoRef = useRef([])
    const errorConsumoRef = useRef([])

    const NumeroEcoError = useRef([])
    const ConsumoError = useRef([])

    const item = {
            Modulo: "",
            NumeroEconomico: "",
            Consumo: ""
        };

    var [numrow,setNum] = useState(1);
    var aumrow = useRef();

    const Validaciones = (event) => {

      const nombre = event.currentTarget.name;
      const valor = event.currentTarget.value;
      const index = event.currentTarget.id;
      console.log(nombre);

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

      else if(nombre.includes("Consumo")){
	      if(!/^[0-9]+$/i.test(valor)){
	        errorConsumoRef.current[index] = "El consumo solo admite números.";
	        ConsumoError.current[index]=true;
	        setMensajes(index+"e");
	      }
	      else{
	        errorConsumoRef.current[index] = "";
	        ConsumoError.current[index]=false;
	        setMensajes(index+"i");
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
        const item = {
            Modulo: "",
            NumeroEconomico: "",
            Consumo: ""
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
      for(let i = 0; i < parseInt(numrow); i++)
      {
        if(NumeroEcoRef.current[i].value &&  ConsumoRef.current[i].value && MesRef.current[i].value)
        {
          const formData = {
            NumeroEconomico: NumeroEcoRef.current[i].value,
            Mes:  MesRef.current[i].value,
            Año: fecha,
            Consumo: ConsumoRef.current[i].value,
            Modulo: " "
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
              swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
//              history.replace("/Revisiones/Formatos")
            })
        }
      }
//    history.replace("/Revisiones/Formatos")   
      
    }

    return (
        <div>

        <Typography component="h1" variant="h5" align="left">
      Consumo de combustible.
    </Typography>
         <Typography component="h1" variant="h5" align="left">
      {fecha}
    </Typography>
    <br></br>
        <TableContainer component={Paper}>
        {/*<Grid item xs={12}>
            <Box mr={2}>*/}
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" component="th" scope="row">No.</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Número Económico</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Consumo</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Mes</StyledTableCell>
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
                                    name={"Consumo"+index}
                                    inputRef={(el) => (ConsumoRef.current[index] = el)}
                                    error={ConsumoError.current[index]}
                                    helperText={errorConsumoRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                             <StyledTableCell align="center" component="th" scope="row">
                                <Input
                                    type="text"
                                    name={"Mes"+index}
                                    defaultValue={month}
                                    inputRef={(el) => (MesRef.current[index] = el)}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="center" component="th" scope="row">
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/*</Box>*/}
            &nbsp;&nbsp;
            <Input id="standart-basic" type="number" size="small" inputRef={aumrow}/>
            <Button
                 className={classes.submit} 
                 onClick={handletablaidow}>Agregar Fila</Button>
                 &nbsp;

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
ReactDOM.render(<Consumo />, rootElement);

export default withRouter(Consumo);

