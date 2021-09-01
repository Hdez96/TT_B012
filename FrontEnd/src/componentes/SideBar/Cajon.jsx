import React from 'react'
import { Drawer, makeStyles,Divider } from '@material-ui/core'
import Lista from './Lista';
import Perfil from './Perfil';
import Footer from './Footer';
const estilos = makeStyles(theme => ({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
        background:'#4caf50',
        
        
    },
    toolbar: theme.mixins.toolbar
}))
const Cajon = (props) => {

    const classes = estilos();
    return (  
        
            <Drawer className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
            variant={props.variant}
            open={props.open}
            onClose={props.onClose ? props.onClose: null}>

                <div className={classes.toolbar}></div>
                <Perfil/>
                <div className={classes.toolbar}></div>
                <Divider/>
                <Lista/>
		<Divider/>
		<Footer/>
            </Drawer>
        
    );
}
 
export default Cajon;
