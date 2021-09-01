import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple, red, yellow } from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const Levantamiento = () => {

    /*const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(green[500]),
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[700],
          },
        },
      }))(Button);*/

      const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: yellow,
    error: red,
  },
});
      
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
      
      function createData(name, date, estatus,color) {
        if(estatus == "Aprobado")
          color = "primary"
        else if(estatus == "En espera")
            color = "secondary" 
        else if(estatus == "Rechazado")
            color = "error"
        return { name, date, estatus,color};

      }
      
      const rows = [
        createData('1300', '2020-02-15', 'Aprobado',""),
        createData('1301', '2020-02-16', 'Aprobado',""),
        createData('1302', '2020-02-17', 'En espera',""),
        createData('1303', '2020-02-18', 'En espera',""),
        createData('1304', '2020-02-19', 'Rechazado',""),
      ];
      
      

      const useStyles = makeStyles(theme => ({
        table: {
            minWidth: 50
        }
        
      }));

      const classes = useStyles();

    return (  
    <TableContainer component={Paper} theme={theme}> 
        <Grid item xs={12}>
            <Box mr={2}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Numero de levantamiento</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Estado</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.date}</StyledTableCell>
              <StyledTableCell align="center">
              
              <Button color={row.color} variant="raised">
        {row.estatus}
        </Button>
      </StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </Box>
      </Grid>
    </TableContainer>
    
    );
}
 
export default withRouter(Levantamiento);
