import React from 'react';
import { useHistory } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText,Typography, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ListAltIcon from '@material-ui/icons/ListAlt';
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import Cookies from 'js-cookie';

//  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    icon: {
    color: '#FFFFFF',
    marginRight: 5,
    }
    }));
    function logout()
    {
        Cookies.remove("Cargo")
        Cookies.remove("Nombre")
        Cookies.remove("Apellido")
        Cookies.remove("Email")
        Cookies.remove("Departamento")
        Cookies.remove("Token")
	Cookies.remove("Foto")
  //      history.replace('/log') 
    }

const Footer = () => {
    const classes=useStyles();
    return ( 
        <div>
            <Router>
                <footer>

                    
                <List component="nav">
                    <ListItem button onClick={logout}>
                        <ListItemIcon>
                            <ListAltIcon className={classes.icon}/>
                            <a href="/log">
                            <ListItemText
                                        disableTypography
                                        primary={<Typography variant="h5" style={{ color: '#FFFFFF' }}>Cerrar Sesión</Typography>}
                                    />
                            </a>
                        </ListItemIcon>
                    </ListItem>
                </List>
                </footer>
            
            </Router>

            
        </div>
     );
}
 
export default Footer;
