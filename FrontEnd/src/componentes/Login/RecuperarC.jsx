import React, {useRef,useEffect} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom' 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import swal from "sweetalert";
import Box from '@material-ui/core/Box';
import TrainIcon from '@material-ui/icons/TrainOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles,Select, MenuItem,  } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import {register,recuperar_contraseña} from "../Functions/UserFunctions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Proyecto Metrobús
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  
  const classes = useStyles();
  const history = useHistory();

  const Nombre = useRef('') 
  const Apellido = useRef('') 
  const email = useRef('') 
  const password = useRef('') 
  const Departamento = useRef('') 
  const Tipo = useRef('') 
useEffect(() => {
      if(Cookies.get("Token"))
        history.replace("/Revisiones/Formatos")
    }, [])


  const submit = (event) => {
    event.preventDefault();
    const newUser = {
      email: email.current.value
    }
    console.log(newUser)
	
    recuperar_contraseña(newUser).then(res =>{
      console.log("Probado")
      console.log(res)
      if(res.data.success == true)
      {
        swal("¡Enviado!","Se envio la información a tu correo.", "success")
        history.replace("/log")
      }
      else
        swal("¡Error!","El correo ingresado no esta registrado.", "error")
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TrainIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar contraseña
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                key="email"
                label="Correo Electrónico"
                name="email"
                inputRef={email}
                autoComplete="email"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                activeClassName="active"
              >
                Recuperar
              </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/log" >
                ¿Ya estás registrado? Ingresar.
              </Link>
            </Grid>
            </Grid>
          </Grid>
        </Grid>

        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
