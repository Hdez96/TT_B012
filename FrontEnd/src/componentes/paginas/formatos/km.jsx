import React, { useRef, useState, useEffect, createRef } from 'react';
import ReactDOM from "react-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TrainIcon from '@material-ui/icons/TrainOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import swal from "sweetalert";
import { Input, TextField, Container, Typography } from '@material-ui/core';
import { sendData } from '../../Functions/Kilometraje'
import { getEcos } from '../../Functions/CedulaTRAFunctions'

function Kilometraje() {
	const [eco,setEco] = useState([])
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

  const mesSelect = useRef([])
  const diaSelect = useRef([])   

  function getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
          return `${year}${separator="-"}${month<10?`0${month}`:`${month}`}${separator="-"}${date}`
      }
      const fecha = getCurrentDate();

      const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

      const mes = meses[parseInt(fecha.substr(5,2))];
      
    const [rows, setRows] = useState([{}]);

    const NumeroEcoRef = useRef([])
    const ConsumoRef = useRef([])
    const FechaRef = useRef([])

    var [numrow,setNum] = useState(1);
    var aumrow = useRef();

    const errorEcoRef = useRef([])
    const errorKilometrajeRef = useRef([])
    const errorMes = useRef([])
    const errorDia = useRef([])

    const NumeroEcoError = useRef([])
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

      }

	useEffect(() => {
	    getLocal();
	  }, []); 
	const [value, setValue] = React.useState();
 	const [inputValue, setInputValue] = React.useState();
	const [data,setData] = useState([])
	const [Codes,setCodes] = useState([]);

	const getLocal = async () => {
		let _data = await getEcos()
		if (_data.success){
		   setData(_data.data)
      		}
		let arr = []
		for(let i in _data.data)
			arr.push(_data.data[i].NumeroEconomico)
		setCodes(arr)	
		console.log(Codes)

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
      var vacia = false
      const cont = mesSelect.current.length
      for(let i=0; i<cont;i++){
        if(!mesSelect.current[i].value){
          errorMes.current[i]=true
          vacia = true
        }
        if(!diaSelect.current[i].value){
          errorDia.current[i]=true
          vacia = true
        }
        if((!errorMes.current[i]) && (!errorDia.current[i])){
          vacia = false
        }
        setMensajes("eojobfb"+i)
      }
      if(!vacia){
        await Computo()
        swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
        history.replace("/Revisiones/Formatos")
        //window.location.replace("/Revisiones/Formatos")
      }else{
        swal("¡Error!","Todos los kilometrajes deben tener una fecha, verifique las fechas subrayadas de color verde. ", "error")
      }
    }
  	
    const Computo = async() => {
  		for(let i = 0; i < parseInt(numrow); i++)
  		{
//			console.log("ADIOS: "+FechaRef.current[i].value)
  			var fec = new Date(getCurrentDate())

			var y = fec.getFullYear()
			/*var m = fec.getMonth()
			var d = fec.getDate()
			*/
			var m = mesSelect.current[i].value-1
			var d = diaSelect.current[i].value

			console.log("Dia:"+ d +" Mes: " + m + " Año: " +y)

/*  			var y = fec.substr(0,4)
  			fec = fec.substr(5,fec.length-4)
  			var m = fec.substr(0,fec.indexOf('-'))
  			fec = fec.substr(fec.indexOf('-'),fec.length-fec.indexOf('-'))
  			var d = fec.substr(1,fec.length)*/
 
 			if(d < 15 )
  				d = 1
  			else if(d == 15 )
				d = 2
  			else 
  				d = 3 
	        if(NumeroEcoRef.current[i].value &&  ConsumoRef.current[i].value && mesSelect.current[i].value && diaSelect.current[i].value)
	        {        
		//		console.log(NumeroEcoRef.current[i].value + " " + ConsumoRef.current[i].value + " " + FechaRef.current[i].value)
				const formData = {
					NumeroEconomico: NumeroEcoRef.current[i].value,
					Kilometraje: ConsumoRef.current[i].value,
					Periodo: d,
					Mes: meses[m],
					Año: y
				}
				console.log("HOLAS: " + meses[m])
				console.log(formData)
				await sendData(formData).then(response => {
					console.log("Enviando...")
					console.log("Fin...")  
				})
	        }
      	}
  	}

    return (
        <div>

        <Typography component="h1" variant="h5" align="left">
      Kilometraje.
    </Typography>
         <Typography component="h1" variant="h5" align="left">
      {fecha}
    </Typography>
    <br></br>
        <TableContainer component={Paper}>
        {/* <Grid item xs={12}>
            <Box mr={2}>
            */}<Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" component="th" scope="row">No.</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Número Económico</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Kilometraje</StyledTableCell>
                        <StyledTableCell align="center" component="th" scope="row">Fecha</StyledTableCell>
                        <StyledTableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item, index) => (
                        <TableRow id="tablaid" key={index+1}>
                            <StyledTableCell align="center" component="th" scope="row">{index+1}</StyledTableCell>
                            <TableCell align="center" component="th" scope="row">
                            {/*    <TextField
                                    type="text"
                                    id={index}
                                    name={"NumeroEconomico"+index}
                                    inputRef={(el) => (NumeroEcoRef.current[index] = el)}
                                    error={NumeroEcoError.current[index]}
                                    helperText={errorEcoRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />*/}
				 <Autocomplete
            inputRef={(el) => (NumeroEcoRef.current[index] = el)}
            onChange={(event, newValue) => {
            setValue(newValue);
            }}
              inputValue={inputValue}
              id="controllable-states-demo"
              options={Codes}
              renderInput={(params) => <TextField inputRef={(el) => (NumeroEcoRef.current[index] = el)} {...params} name = { "NumeroEco" + index} />}
      />
                            </TableCell>
                            <TableCell align="center" component="th" scope="row">
                                <TextField
                                    type="text"
                                    id={index}
                                    name={"Kilometraje"+index}
                                    inputRef={(el) => (ConsumoRef.current[index] = el)}
                                    error={KilometrajeError.current[index]}
                                    helperText={errorKilometrajeRef.current[index]}
                                    onBlur={Validaciones} 
                                    required
                                />
                            </TableCell>
                             <TableCell align="center" component="th" scope="row">
                            <InputLabel id="demo-simple-select-label">Mes</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={"SelectMes"+index}
          inputRef={(el) => (mesSelect.current[index] = el)}
          error={errorMes.current[index]}
        >
          <MenuItem value={1}>Enero</MenuItem>
          <MenuItem value={2}>Febrero</MenuItem>
          <MenuItem value={3}>Marzo</MenuItem>
          <MenuItem value={4}>Abril</MenuItem>
          <MenuItem value={5}>Mayo</MenuItem>
          <MenuItem value={6}>Junio</MenuItem>
          <MenuItem value={7}>Julio</MenuItem>
          <MenuItem value={8}>Agosto</MenuItem>
          <MenuItem value={9}>Septiembre</MenuItem>
          <MenuItem value={10}>Octubre</MenuItem>
          <MenuItem value={11}>Noviembre</MenuItem>
          <MenuItem value={12}>Diciembre</MenuItem>
        </Select>
                            </TableCell>
                            <TableCell>
                            <InputLabel id="demo-simple-select-label">Día</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          inputRef={(el) => (diaSelect.current[index] = el)}
          error={errorDia.current[index]}
        >
          <MenuItem value={1}>1ro</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>Fin de Mes</MenuItem>
        </Select>
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
                 onClick={handletablaidow}>Agregar Fila</Button>
                 &nbsp;
       {/*     <Button className={classes.submit} 
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
            onClick={Envio}
            >
          Siguiente
    </Button>
        </div>
    );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<Kilometraje />, rootElement);

export default withRouter(Kilometraje);

