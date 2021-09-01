import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { green, purple, red} from '@material-ui/core/colors';
import {Grid,Box}  from '@material-ui/core/';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';

const Formatos = () => {

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
      
      function createData(name, dir) {
        return { name, dir};
      }
      
      const rows = [
        createData('Cédula de revisión técnica inicial del autobús','/cedularti'),
        createData('Cédula técnica de registro del autobús','/cedulatra'),
        createData('Consumo de combustible', '/consumo'),
        createData('Consumo y mantenimiento','/consumomantenimiento'),
        createData('Ingreso estatus de patio','/estatuspatio'),
        createData('Liberación estatus de patio','/estatuspatioS'),
        createData('Kilometraje','/km'),
        createData('Pruebas de desempeño','/pruebades'),
        createData('REFFA','/reffa'),
        createData('REFFA Fotos','/reffaindice'),
        createData('Rendimientos','/rendimiento')
      ];      

      const useStyles = makeStyles(theme => ({
        table: {
            minWidth: 50
        }
        
      }));
      const history = useHistory();
    const handleclick = (name) => {
    	history.push(name)    	
    }

      const classes = useStyles();
/*(function()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }
})();
  <StyledTableRow key="cedularti">
    <StyledTableCell align="center" component="th" scope="row">
      Cédula de revisión técnica inicial del autobús
    </StyledTableCell>
    <StyledTableCell align="center"><ColorButton variant="contained" color="primary" name="/reporteincidencia" onClick={() => {                                    
              swal("¡Lo sentimos!","Esta función se encuentra en desarrollo...", "error");  
            }} className={classes.margin}>
                  <ListItemText primary="Crear"/>
    </ColorButton></StyledTableCell>

  </StyledTableRow>
*/
    return (  
    <TableContainer component={Paper}>
        {/* <Grid item xs={12}>
            <Box mr={2}>*/}
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre del formato</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center"><ColorButton variant="contained" color="primary" id={row.dir} onClick={() => {                                    
                        handleclick(row.dir)
                      }} className={classes.margin}>
                            <ListItemText primary="Crear"/>
              </ColorButton></StyledTableCell>

            </StyledTableRow>
          ))}


{/*          <StyledTableRow key="rendimientos">
              <StyledTableCell align="center" component="th" scope="row">
               	Reporte de incidencias
              </StyledTableCell>
              <StyledTableCell align="center"><ColorButton disabled = "true" variant="contained" color="primary" name="/reporteincidencia" onClick={() => {                                    
                        handleclick("/reporteincidencia")
                      }} className={classes.margin}>
                            <ListItemText primary="Crear"/>
              </ColorButton></StyledTableCell>

            </StyledTableRow>*/}
        </TableBody>
      </Table>
      {/* </Box>
      </Grid>*/}
    </TableContainer>
    
    );
}
 
export default withRouter(Formatos);
