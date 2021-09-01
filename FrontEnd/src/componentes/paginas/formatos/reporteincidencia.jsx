import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


/* function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Proyecto Metrobus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
} */
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

function createData( elemento, cantidad) {
  return { elemento, cantidad};
}

function getCurrentDate(separator='-'){

	let newDate = new Date()
	let date = newDate.getDate();
	let month = newDate.getMonth() + 1;
	let year = newDate.getFullYear();
	
		return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
	}

export default function Almacen() {
  const classes = useStyles();
  const fecha = getCurrentDate();
  const dia = fecha.substr(8,2);
  const mes = fecha.substr(5,2);
  const año = fecha.substr(0,4);
  const Envio = () => 
  {
  	console.log("nho")
  }
  return (
    <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            Reporte de Incidencias
          </Typography>
		  <Typography component="h1" variant="h5" align="left">
		 	 {fecha}
		  </Typography>
          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableBody>

				<TableRow>
					<StyledTableCell>Número Económico</StyledTableCell>
					  <TableCell align="right">
						<TextField id="st1" />
						</TableCell>
					</TableRow>	

					<TableRow>
					<StyledTableCell>I. Empresa Operadora</StyledTableCell>
					  <TableCell align="right">
						<TextField id="st1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
						</TableCell>
					  <StyledTableCell>VI. Modelo</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
					  </TableCell>
					</TableRow>			
				
				<TableRow>
					  <StyledTableCell>II. Año</StyledTableCell>
					  <TableCell align="right">
						<TextField id="st1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
						</TableCell>
					  <StyledTableCell>VII. Motor No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <StyledTableCell>III. Motor Eléctrico No.</StyledTableCell>
					  <TableCell align="right">
						<TextField id="st1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
						</TableCell>
					  <StyledTableCell>VIII. Chasis No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }} />
					  </TableCell>
					</TableRow>	
					
					<TableRow>
					  <StyledTableCell>IV. Carrocería No.</StyledTableCell>
					  <TableCell align="right">
						<TextField id="st1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
						</TableCell>
					  <StyledTableCell>IX. Transmision No.</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
					  </TableCell>
					</TableRow>	

					<TableRow>
					  <StyledTableCell>V. Lectura del Odometro.</StyledTableCell>
					  <TableCell align="right">
						<TextField id="st1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
						</TableCell>
					  <StyledTableCell>X. Tipo de autobús</StyledTableCell>
					  <TableCell component="th" scope="row">
					  	<TextField id="desc1" value="-" 
						InputProps={{
                                      readOnly: true,
                                   }}/>
					  </TableCell>
					</TableRow>
				</TableBody>	
			  </Table>
			</TableContainer>			 							
           </Grid>
          </form>

          <br></br>
          <br></br>

          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<StyledTableCell>No</StyledTableCell>
					<StyledTableCell align="left">Estatus</StyledTableCell>
					<StyledTableCell align="left">Descripcion del Defecto</StyledTableCell>
					<StyledTableCell align="left">Ubicación del Defecto</StyledTableCell>
					<StyledTableCell align="left">Observaciones</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  
					<TableRow>
					  <TableCell component="th" scope="row">
					  	1
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	2
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	3
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	4
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	5
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					  <TableCell component="th" scope="row">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	NOTAS
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	01.- Fecha de último mantenimiento preventivo
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	02.- Verificación Vehicular
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	03.- Consumo promedio display o calculado
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	04.- Profundidad del dibujo de llantas 
					  </TableCell>
					  <TableCell align="left">
					  1ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  2ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  3ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  4ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  5ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  6ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  7ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  8ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  9ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  10ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  11ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  12ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					</TableRow>

					  <TableRow>
					  <TableCell component="th" scope="row">
					 
					  </TableCell>
					  <TableCell align="left">
					  13ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  14ª<TextField id="desc1" style = {{width: 50}}/>
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					  <TableCell align="left">
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	05.- Ultima fecha de Modificación 
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	06.- Número de transmisión anterior 
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	07.- Número de motor anterior 
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>


				</TableBody>


			  </Table>
			</TableContainer>		
           </Grid>
            <br></br>
          <br></br>
           <Grid container spacing={2}>

          <br></br>
          <br></br>

           <Typography component="h1" variant="h5" align='center'>
            DATOS GENERALES
          </Typography>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">

				<TableBody>
					<TableRow>
					  <TableCell component="th" scope="row">
					  	Éconómico
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	Fecha
					  </TableCell>
					  <TableCell align="left">
					  Día:<TextField id="desc1" label={dia} style = {{width: 50}}/> Mes:<TextField id="desc1" label = {mes} style = {{width: 50}}/> Año:<TextField id="desc1" label={año} style = {{width: 50}}/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  Kilometraje
					  </TableCell>
					  <TableCell align="left">
					  <TextField id="desc1"/>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  Reviso
					  </TableCell>
					  <TableCell align="left">
					  <Select native>
			          <option aria-label="None" value="" />
			          <option value={1}>Téc. Gerardo Pérez L.</option>
			          <option value={2}>Ing. Ulises F. I. González M.</option>
			          <option value={3}>C. Hugo Sánchez Pérez.</option>
			          <option value={4}>Ing. José Javier Cuevas V.</option>
			          <option value={5}>Ing. José A. Moreno Osorio.</option>
			          <option value={6}>Lic. V. Nallely Castillo González</option>
			          <option value={7}>Alondra Hernández M.</option>
			        </Select>
					  </TableCell>
					</TableRow>

					<TableRow>
					  <TableCell component="th" scope="row">
					  	VB
					  </TableCell>
					  <TableCell align="left">
					  <Select native>
			          <option aria-label="None" value="" />
			          <option value={1}>Téc. Gerardo Pérez L.</option>
			          <option value={2}>Ing. Ulises F. I. González M.</option>
			          <option value={3}>C. Hugo Sánchez Pérez.</option>
			          <option value={4}>Ing. José Javier Cuevas V.</option>
			          <option value={5}>Ing. José A. Moreno Osorio.</option>
			          <option value={6}>Lic. V. Nallely Castillo González</option>
			          <option value={7}>Alondra Hernández M.</option>
			        </Select>
					  </TableCell>
					</TableRow>
				</TableBody>

			  </Table>
			</TableContainer>
           </Grid>
				<Button
				  width= "25%"
				  align= "right"
				  variant="contained"
				  onClick={Envio}
				  className={classes.submit}>
				  Siguiente
				</Button>
          </form>
				
            
        </div>
	</Container>	
  );
}