import React, { useRef, useState, useEffect } from 'react';
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
import { green, purple } from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import MenuItem from '@material-ui/core/MenuItem';
import { Input, TextField, Container, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import {updateHeader} from '../Functions/Codigos_REFFA'

const Header = () => {

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

      const ImagenRef = useRef()

      const [data, setData] = useState([]);
      const [data1, setData1] = useState();
      const imagenes = useRef()

	  const convertBase64 = (file) => {
	    return new Promise((resolve, reject) => {
	      const fileReader = new FileReader();
	      fileReader.readAsDataURL(file)
	      fileReader.onload = () => {
	        resolve(fileReader.result);
	      }
	      fileReader.onerror = (error) => {
	        reject(error);
	      }
	    })
	  }

      const handleChange = async(e) =>{
        const base64 = await convertBase64(e.target.files[0])
        console.log("base64")
      	console.log(base64)
      	imagenes.current = base64
      	setData1(base64)
      }

      const Envio = () =>{
      	swal({
          		title: "¿Está seguro que desea finalizar?",
          		text: 'Al dar click en el botón "siguiente" no podrá volver a subir fotos para este formato.',
          		icon: "warning",
          		buttons: ["Cancelar","Siguiente"],
          	})
      	.then((value) => {
          console.log("imagenes.current")
          console.log(imagenes.current)
              const formData = {
                  NumeroEconomico: '0000',
                  Foto: imagenes.current,
                  Codigo: '1000000000',
                  Fecha: fecha
                }
                console.log(formData)
                if(imagenes.current)
                {
                  updateHeader(formData).then(response => {
                    console.log("Enviando...")
                    console.log("Fin...")  
                  })
                }
              swal("¡Felicidades!","Tus datos se enviaron correctamente. ", "success")
              .then((val) => {
                history.go()
              })
                history.go()
            
          });
      }
	const [AutobusEconomico, setautobus] = useState();     

      useEffect(() => {
			getAuto();
		
      }, [])

      const getAuto = async () => {
      	//swal("¡Error!",'Usa el boton "anterior" para seleccionar un formato.', "warning")
      }

    return (
    <Container component="main">
      <Typography component="h1" variant="h5" align="center">
        Cambio de cabecera de logo de metrobús
      </Typography>
      <div align= "center">
        <img src={imagenes.current} style={{
          height: 300,
          width: 600
        }}/>
      </div>
      <div align= "center">
        <TextField
          id="originalFileName"
          type="file"
          inputProps={{ accept: 'image/*' }}
          required
          label="Document"
          inputRef={ImagenRef}
          onChange={handleChange}
          size="small"
          variant="standard"
        />
      </div>
        &nbsp;&nbsp;
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
            Actualizar
      </Button>
    </Container>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Header />, rootElement);
 
export default withRouter(Header);
