import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrainIcon from '@material-ui/icons/TrainOutlined';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { Input, TextField, Container, Typography } from '@material-ui/core';
import { sendData } from '../../Functions/EstatusPatio'

const EstatusPatio = () => {

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
      
      const classes = useStyles();
      const history = useHistory()
      function getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
          return `${year}${separator="-"}${month<10?`0${month}`:`${month}`}${separator="-"}${date}`
      }
      const fecha = getCurrentDate();

      const [rows, setRows] = useState([{}]);
      var [numrow,setNum] = useState(1);
      var aumrow = useRef();

      const item = {
                  NumeroEconomico: "",
                  Estatus: "",
                  Sistema: "",
                  DescripcionFalla: "",
                  KilometrajeIngresa: "",
                  FechaIngreso: ""
              };
  
      const NumeroEconomicoRef = useRef([])
      const EstatusRef = useRef([])
      const SistemaRef = useRef([])
      const DescripcionRef = useRef([])
      const KilometrajeRef = useRef([])
      const FechaRef = useRef([])

      const errorEcoRef = useRef([])
      const errorEstatusRef = useRef([])
      const errorSistemaRef = useRef([])
      const errorDescripcionRef = useRef([])
      const errorKilometrajeRef = useRef([])
      const errorFechaRef = useRef([])

      const NumeroEcoError = useRef([])
      const EstatusError = useRef([])
      const SistemaError = useRef([])
      const DescripcionError = useRef([])
      const KilometrajeError = useRef([])

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

      else if(nombre.includes("Estatus")){
        if(!/^[0-9A-ZñÑa-z,. ]+$/i.test(valor)){
          errorEstatusRef.current[index] = "El estatus no admite caracteres especiales.";
          EstatusError.current[index]=true;
          setMensajes(index+"b");
        }
        else{
          errorEstatusRef.current[index] = "";
          EstatusError.current[index]=false;
          setMensajes(index+"c");
        }
      } 

      else if(nombre.includes("Sistema")){
        if(!/^[0-9A-ZñÑa-z ]+$/i.test(valor)){
          errorSistemaRef.current[index] = "El sistema no admite caracteres especiales.";
          SistemaError.current[index]=true;
          setMensajes(index+"d");
        }
        else{
          errorSistemaRef.current[index] = "";
          SistemaError.current[index]=false;
          setMensajes(index+"e");
        }
      }

      else if(nombre.includes("Descripcion")){
        if((""==valor)){
          DescripcionRef.current[index].value="-"
        }
        else if(!/^[0-9A-ZñÑa-z,. -\s]+$/i.test(valor)){
          errorDescripcionRef.current[index] = "La descripción no acepta caracteres especiales.";
          DescripcionError.current[index]=true;
          setMensajes(index+"f");
        }
        else{
          errorDescripcionRef.current[index] = "";
          DescripcionError.current[index]=false;
          setMensajes(index+"g");
        }
      }

      else if(nombre.includes("Kilometraje")){
        if(!/^[0-9 .]+$/i.test(valor)){
          errorKilometrajeRef.current[index] = "El kilometraje solo admite números.";
          KilometrajeError.current[index]=true;
          setMensajes(index+"h");
        }
        else{
          errorKilometrajeRef.current[index] = "";
          KilometrajeError.current[index]=false;
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
             NumeroEconomico: "",
               Estatus: "",
               Sistema: "",
               Descripciondefalla: "",
               Kilometraje: "",
               Fechadeingreso:""
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
	var vacia=false
  const cont = FechaRef.current.length

  for(let i=0;i<cont;i++){
    if(!FechaRef.current[i].value){
      errorFechaRef.current[i]="La fecha no debe quedar vacia"
      vacia=true
    }
    else{
      errorFechaRef.current[i]=""
      console.log("Aquiiii")
    }
    setMensajes(errorFechaRef.current[i]+i)
  }
  if(!vacia){
    await Computo()
  	swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
    history.replace("/Revisiones/Formatos")
  }
}
      const Computo = async() => {
	let arr =[]
	console.log("HoLA" + parseInt(numrow))
        for(let i = 0; i < parseInt(numrow); i++)
        {
          console.log(EstatusRef.current[i].value + " " + SistemaRef.current[i].value + " " + DescripcionRef.current[i].value + " " + KilometrajeRef.current[i].value + " " + FechaRef.current[i].value)
          if(NumeroEconomicoRef.current[i].value && EstatusRef.current[i].value && KilometrajeRef.current[i].value && FechaRef.current[i].value)
          {
             const formData = {
               NumeroEconomico: NumeroEconomicoRef.current[i].value,
               Estatus: EstatusRef.current[i].value,
               Sistema: SistemaRef.current[i].value,
               Descripciondefalla: DescripcionRef.current[i].value,
               Kilometraje: KilometrajeRef.current[i].value,
               Fechadeingreso: FechaRef.current[i].value
              } 
		arr.push(formData)
/*              if(i != parseInt(numrow) - 1 )
                sendData(formData).then(response => {
                  console.log("Enviando...")
                  console.log("Fin...")  
                })
              else
                sendData(formData).then(response => {
                  console.log("Enviando...")
                  console.log("Fin...")  
                  swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
                  history.replace("/Revisiones/Formatos")
                })*/
        }
      }
	for(let i in arr)
	{
		await sendData(arr[i]).then(response => {
                  console.log("Enviando...")
                  console.log("Fin...")
                })
	}
	
    }    

    return (
    <Container component="main">

    <Typography component="h1" variant="h5" align="left">
      Estatus Patio
    </Typography>
    <Typography component="h1" variant="h5" align="left">
      {fecha}
    </Typography>
    <TableContainer component={Paper}>
        {/*<Grid item xs={12}>
            <Box mr={2}>*/}
      <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
      <StyledTableCell align="center" component="th" scope="row">Número Económico</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Estatus</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Sistema</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Descripción de la Falla</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Kilometraje con el que Ingresa</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Fecha de Ingreso</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item, index) => (
                        <TableRow id="tablaid" key={index}>
        <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"NumeroEconomico"+index}
                                    inputRef={(el) => (NumeroEconomicoRef.current[index] = el)}
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
                                    name={"Estatus"+index}
                                    inputRef={(el) => (EstatusRef.current[index] = el)}
                                    error={EstatusError.current[index]}
                                    helperText={errorEstatusRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"Sistema"+index}
                                    inputRef={(el) => (SistemaRef.current[index] = el)}
                                    error={SistemaError.current[index]}
                                    helperText={errorSistemaRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                             <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"Descripcion"+index}
                                    inputRef={(el) => (DescripcionRef.current[index] = el)}
                                    error={DescripcionError.current[index]}
                                    helperText={errorDescripcionRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"Kilometraje"+index}
                                    inputRef={(el) => (KilometrajeRef.current[index] = el)}
                                    error={KilometrajeError.current[index]}
                                    helperText={errorKilometrajeRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                              </TableCell>  
                            <TableCell align="center" component="th" scope="row">

                              <TextField
                        htmlFor="age-native-simple"
                        native       
                        id={"date"+index}
                        label="Fecha"
                        type="date"
                        helperText={errorFechaRef.current[index]}
                        error={errorFechaRef.current[index]}
                        defaultValue={fecha}
                        inputRef={(el) => (FechaRef.current[index] = el)}
                        className={classes.textField}
                        InputLabelProps={{shrink: true,}}
                      />  

                            </TableCell>
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
     {/*       <Button className={classes.submit} 
                 onClick={handletablaidow}onClick={handleRemoveRow}>
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
ReactDOM.render(<EstatusPatio />, rootElement);
 
export default withRouter(EstatusPatio);
