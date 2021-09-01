import React, {useRef,useState,useEffect} from 'react';
import Cookies from 'js-cookie';
import ReactDOM from "react-dom";
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
import {register} from "../Functions/UserFunctions";

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

  const [Mensajes, setMensajes] = useState([]);

  const Nombre = useRef('') 
  const Apellido = useRef('') 
  const email = useRef('') 
  const password = useRef('') 
  const Departamento = useRef('') 
  const Tipo = useRef('')

  const erroNombre = useRef('')
  const erroApellido = useRef('')
  const erroCorreo = useRef('')
  const erroClave = useRef('')

	useEffect(() => {
      if(Cookies.get("Token"))
        history.replace("/Revisiones/Formatos")
    }, [])



  const submit = (event) => {
    event.preventDefault();
    const newUser = {
      Nombre: Nombre.current.value,
      Apellido: Apellido.current.value,
      email: email.current.value,
      password: password.current.value,
      Departamento: Departamento.current.value,
      Tipo: Tipo.current.value
    }
    register(newUser).then(res => {
	   console.log(res)
    	if(res)
    	{
    	    swal("¡Registrado!",":)", "success")
    	    history.replace("/log")
    	}
    	else
    	{
    	      swal("¡El usuario ya existe!",":(", "error")
    	      history.replace("/sign")
    	    	
    	}
    })
  }

  const Validaciones = (event) => {
    const nombre = event.currentTarget.id;
    const valor = event.currentTarget.value;
    console.log(nombre);
    if(nombre=='Nombre'){
      if(!/^[A-Za-záéíóúÁÉÍÓÚ'\s]+$/i.test(valor)){
        erroNombre.current = "El nombre no admite caracteres especiales ni números.";
        Nombre.current.error=true;
        setMensajes("");
      }else{
        erroNombre.current = "";
        Nombre.current.error=false;
        setMensajes("a");
      }
    }else if(nombre=='Apellido'){
      if(!/^[A-Za-záéíóúÁÉÍÓÚ'\s]+$/i.test(valor)){
        erroApellido.current = "El apellido no admite caracteres especiales ni números.";
        Apellido.current.error=true;
        setMensajes("ab");
      }else{
        erroApellido.current = "";
        Apellido.current.error=false;
        setMensajes("abc");
      }
    }else if(nombre=='email'){
      if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(valor)){
        erroCorreo.current = "El correo debe seguir la siguiente estructura: ejemplo@ejemplo.com";
        email.current.error=true;
        setMensajes("abcd");
      }else{
        erroCorreo.current = "";
        email.current.error=false;
        setMensajes("abcde");
      }
    }else{
      if(/^([A-Za-z0-9áéíóúÁÉÍÓÚ#$%&/()']){8,}$/i.test(valor)){
        console.log("Lleque aqui");
        if((!/[A-Z]+/.test(valor))||(!/[0-9]+/.test(valor))||(!/[#$%&/()']+/.test(valor))){
          console.log("Lleque aquiiii");
          erroClave.current = "La contraseña debe tener al menos una mayúscula, un número y alguno de los siguientes caracteres: #$%&/()'";
          password.current.error=true;
          setMensajes("abcdef");
        }else{
          erroClave.current = "";
          password.current.error=false;
          setMensajes("abcdefg");
        }
      }else{
        console.log("Lleque aquiiii");
        erroClave.current = "Minimo debe de tener 8 caracteres";
        password.current.error=true;
        setMensajes("abcdefgh");
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TrainIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="Nombre"
                key="Nombre"
                label="Nombre"
                inputRef={Nombre}
                error={Nombre.current.error}
                helperText={erroNombre.current}
                onBlur={Validaciones}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Apellido"
                key="Apellido"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                inputRef={Apellido}
                error={Apellido.current.error}
                helperText={erroApellido.current}
                onBlur={Validaciones}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId="Departamento"
                id="Departamento" name="Departamento"
                defaultValue={"Transporte"}
                inputRef={Departamento}
              >
                <MenuItem value={"Transporte"}>Unidades de Transporte</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                labelId="Tipo de Empleado"
                id="Tipo" name="Tipo"
                defaultValue={"Supervisor"}
                inputRef={Tipo}
              >
                <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
                <MenuItem value={"Auditor"}>Auditor</MenuItem>
                <MenuItem value={"JUD"}>JUD</MenuItem>
                <MenuItem value={"Gerente"}>Gerente</MenuItem>
              </Select>
            </Grid>
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
                error={email.current.error}
                helperText={erroCorreo.current}
                onBlur={Validaciones}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                key="password"
                inputRef={password}
                error={password.current.error}
                helperText={erroClave.current}
                onBlur={Validaciones}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            activeClassName="active"
          >
            Registrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/log" >
                ¿Ya estás registrado? Ingresar.
              </Link>
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
const rootElement = document.getElementById("root");
