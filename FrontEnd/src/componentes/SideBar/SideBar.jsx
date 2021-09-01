import React, {Image} from 'react'
import { AppBar, Toolbar, IconButton, Badge } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import {useEffect, useState,useRef} from 'react';
import {getHeader} from '../Functions/Codigos_REFFA'
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    menuButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        backgroundColor: theme.palette.error.dark,
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${240}px)`,
            marginLeft: 240,
            background:'white'
        },
        backgroundColor: theme.palette.background.paper,
        
    },
    badge: {
        color: theme.palette.success.main,
    },

    backMB:{
        background:'#4caf50'
    }
}))
//<img src="/images/avatars/CDMX.png" width="240" height="50"/>

const SideBar = (props) => {
    const [data, setData] = useState('');
    const [data1, setData1] = useState('');
    const imagenes = useRef()
    useEffect(() => {
        getFoto();
    }, [])

    const getFoto = async () => {
        const url = '/fotos/header'
        const _data = await getHeader(url)
        if (_data.success){
            var bufferBase64 = new Buffer( _data.data.data, 'binary' ).toString('ascii');
            imagenes.current = bufferBase64
            setData1('a')
        }
    }

    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                <IconButton color="inherit" aria-label="menu"
                    className={classes.menuButton}
                    onClick={() => props.handleDrawerToggle()}>
                    <MenuIcon />
                </IconButton>
                
                <img src={imagenes.current} width="240" height="50"/>

                
                </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </div>
    )
}

export default SideBar