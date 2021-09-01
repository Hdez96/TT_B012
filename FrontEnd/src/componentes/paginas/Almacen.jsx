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
  },
}));

function createData( elemento, cantidad) {
  return { elemento, cantidad};
}

const herramienta = [
  createData('Martillo', 15),
];

const material = [
  createData('Cemento', 305),
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#9e9e9e',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function Almacen() {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" align="left">
            ALMACÉN
          </Typography>
          <form className={classes.form} noValidate>
			<Grid container spacing={2}>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<StyledTableCell>Herramienta</StyledTableCell>
					<StyledTableCell align="right">Cantidad</StyledTableCell>
					<StyledTableCell align="right">Eliminar</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {herramienta.map((row) => (
					<TableRow key={row.elemento}>
					  <TableCell component="th" scope="row">
						{row.elemento}
					  </TableCell>
					  <TableCell align="right">{row.cantidad}</TableCell>
					  <TableCell align="right">
							<IconButton aria-label="delete">
								<DeleteIcon />
							</IconButton>
					  </TableCell>
					</TableRow>
				  ))}
				</TableBody>
			  </Table>
			</TableContainer>
			  <Button
				  type="submit"
				  fullWidth
				  variant="contained"
				  color="secondary"
				  className={classes.submit}
				>
				  Agregar Herramienta
				</Button>
			 <TableContainer component={Paper}>
			  <Table className={classes.table} aria-label="simple table">
				<TableHead>
				  <TableRow>
					<StyledTableCell>Material</StyledTableCell>
					<StyledTableCell align="right">Cantidad</StyledTableCell>
					<StyledTableCell align="right">Eliminar</StyledTableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
				  {material.map((row) => (
					<TableRow key={row.name}>
					  <TableCell component="th" scope="row">
						{row.elemento}
					  </TableCell>
					  <TableCell align="right">{row.cantidad}</TableCell>
					  <TableCell align="right">
							<IconButton aria-label="delete">
								<DeleteIcon />
							</IconButton>
					  </TableCell>
					</TableRow>
				  ))}
				</TableBody>
			  </Table>
			</TableContainer>
				<Button
				  type="submit"
				  fullWidth
				  variant="contained"
				  color="secondary"
				  className={classes.submit}
				>
				  Agregar Material
				</Button>
           </Grid>
				<Button
				  type="submit"
				  width= "25%"
				  align= "right"
				  variant="contained"
				  color="secondary"
				  className={classes.submit}
				>
				  Siguiente
				</Button>
          </form>
				
            
        </div>
	</Container>	
  );
}