import React, {useState,useEffect} from 'react'
import axios from 'axios'
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
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { useHistory } from "react-router-dom";
import { downloadPDF,getData } from '../../Functions/CedulaTRAFunctions'
  


const BusquedaPDF = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    submit: {
          margin: theme.spacing(3, 0, 2),
          backgroundColor: theme.palette.error.dark,
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
    setAge(event.target.value);  
  };

  const [preload, setPreload] = useState(true);
  //Precarga
  const [data, setData] = useState([]);
  useEffect(() => {
    getPDFs();
  }, []);

  const getPDFs = async () => {
    const url = '/fetch-cedulatra-pdf'
    //peticion de axios genérica por url
    const _data = await getData(url)
    if(_data.data)
    {
      console.log(_data.data)
   // if (data.success){
      setData(_data.data)
      setPreload(false)
    //}    
    }
    
	
	console.log(data)
  };
  
    return (       
     
      <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>        
      <br/>
    <TableContainer component={Paper}>
        <Grid item xs={12}>
            <Box mr={2}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre del PDF</StyledTableCell>
            <StyledTableCell align="center">Descargar</StyledTableCell>            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.NumeroFactura}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.NumeroFactura}
              </StyledTableCell>              
              <StyledTableCell align="center">
              <Button
                    type="submit"
                    width= "25%"
                    align= "right"
                    variant="contained"
                    className={classes.submit}
                    onClick={() => {                                    
                        downloadPDF(row.NumeroFactura)
                      }}>
                    Descargar
                </Button></StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </Box>
      </Grid>
    </TableContainer>
    </div>
	</Container>
    );
}
 
export default withRouter(BusquedaPDF);
