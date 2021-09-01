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
import {getData, Liberar} from '../../Functions/EstatusPatio'
import {getReffa} from '../../Functions/Codigos_REFFA'

const REFFAI = () => {

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

      const FechaRef = useRef([])

      const [data, setData] = useState([]);
      useEffect(() => {
        getAuto();
      }, [])

      const getAuto = async () => {
        const url = 'reffa/getReffa'
        const _data = await getReffa(url)
        if (_data.success){
          setData(_data.data)
          //setPreload(false)
        }
	
      }

    return (
    <Container component="main">

    <Typography component="h1" variant="h5" align="left">
      Formatos REFFA con fotos por subir.
    </Typography>
    <Typography component="h1" variant="h5" align="left">
      {fecha}
    </Typography>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Número Económico</StyledTableCell>
                  <StyledTableCell align="center">Fecha de Elaboración</StyledTableCell>
                  <StyledTableCell align="center">Encargado de Elaboración</StyledTableCell>
                  <StyledTableCell align="center">Agregar Fotos</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data.map((row,index) => (
                  <StyledTableRow key={row.NumeroEconomico}>
                    <StyledTableCell align="center" component="th" scope="row">
                    {row.NumeroEconomico}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.Fecha}</StyledTableCell>
                    <StyledTableCell align="center">{row.PersonaElaboro}</StyledTableCell>
                      <StyledTableCell align="center">
                    <ColorButton variant="contained" name = {row.NumeroEconomico} color="primary" className={classes.submit} onClick={() => {                                    
                        console.log(row)
                        localStorage.setItem("Autobus",	row.NumeroEconomico)
                        history.replace("/reffafoto")
                      }}>
                    Agregar
                    </ColorButton></StyledTableCell>                 
                  
                  </StyledTableRow>
                ))}
              </TableBody>
              </Table>
      &nbsp;&nbsp;
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
    
    </Container>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<REFFAI />, rootElement);
 
export default withRouter(REFFAI);
