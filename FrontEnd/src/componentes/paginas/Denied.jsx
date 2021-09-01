import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const Denied = () => {
    const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(green[500]),
          backgroundColor: green[500],
          '&:hover': {
            backgroundColor: green[700],
          },
        },
      }))(Button);
      const useStyles = makeStyles(theme => ({
        table: {
            minWidth: 50
        }
        
      }));
const classes = useStyles();
    return (
        <div>
            <Alert severity="error">Permiso no autorizado</Alert>
            <ColorButton variant="contained" color="primary" className={classes.margin}>
                        <a href="/log">
                            Regresar
                        </a>
              </ColorButton>
        </div>
    )
}

export default Denied;
