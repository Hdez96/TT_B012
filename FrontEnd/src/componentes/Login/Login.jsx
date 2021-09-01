import React, { useRef,useEffect, Component } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import swal from "sweetalert";
import Grid from '@material-ui/core/Grid';
import TrainIcon from '@material-ui/icons/TrainOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import pic1 from '../image/mb1.jpg'
import pic2 from '../image/mb2.jpg'
import pic3 from '../image/mb3.jpg'
import pic4 from '../image/mb4.jpg'
import axios from 'axios'
import { login } from '../Functions/UserFunctions'
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

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

const pictureArray = [pic1, pic2, pic3, pic4];
const randomIndex = Math.floor(Math.random() * pictureArray.length);
const selectedPicture = pictureArray[randomIndex];
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  
    
  image: {
  backgroundImage: `url(${selectedPicture})`, //'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const history = useHistory();
  const classes = useStyles();

  const emailRef = useRef('') //creating a refernce for TextField Component
  const passRef = useRef('') //creating a refernce for TextField Component

  //POPUP

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rec = () => {
     swal("¡Lo sentimos!","Esta función se encuentra en desarrollo...", "error");  
  }

  let flag = 0

  const Recordando = () => {
	flag = 1
  }

useEffect(() => {
      if(Cookies.get("Cuenta"))
	 emailRef.current.value = Cookies.get("Cuenta")	
      
      if(Cookies.get("Token"))
	history.replace("/Revisiones/Formatos")
    }, [])


  const handleSelChange = (e) => {
    if(e.target.value =="Estaciones")
    window.location.replace("http://10.138.0.10:3001/login");
    else if(e.target.value =="Operaciones")
    window.location.replace("http://10.138.0.10:3002/login");
    else if(e.target.value =="Unidades")
    window.location.replace("http://10.138.0.10:3000/log");
    //console.log(user);
  };

  //POPUP


  const onSumit = (event) => {
    if(flag)
	Cookies.set("Cuenta", emailRef.current.value)
    const user = {
      email: emailRef.current.value,
      password: passRef.current.value
    }
    
    login(user).then(response => {
      console.log(response)
      if(response)
      {
        if (response.success == true) 
        {
          swal("¡Accediste!","Bienvenido ", "success");  
          history.push("/Revisiones/Formatos") 
	history.go(0)
        }
        else
        {
          if(response.estado == "INACTIVO")
            swal("¡No lograste acceder!","Tu cuenta NO está activa.", "error");
    /*else if(response.fail == true)
      swal("¡No lograste acceder!","Revisa tus credenciales.","error");*/ 
          else
            swal("¡No lograste acceder!","Revisa tu usuario y contraseña.", "error");
          //console.log("Usuario o contraseña no válidos.")
        }
      }
      else
        swal("No lograste conectar.","Revisa tu conexión.","error");
    })
  }
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <TrainIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
          </Typography>
          <form className={classes.form} noValidate >
                    <InputLabel htmlFor="age-native-simple"> Area </InputLabel>
                    <Select
                      native
                      defaultValue="Unidades"
                      onChange={handleSelChange}
                      inputProps={{
                        name: "area",
                        id: "age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      
                      <option value={"Estaciones"}>
                        
                          Estaciones Y Mantenimiento
                        </option>
                      <option value={"Operaciones"}>Operaciones</option>
                      <option value={"Unidades"}>Unidades de Transporte</option>
                    </Select>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}  
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password" 
              autoComplete="current-password" 
              inputRef={passRef} 
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
	      onClick={Recordando}
              label="Recuérdame"
            />

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={onSumit}
            >
              Ingresar
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"ERROR"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Contraseña y Usuarios no validos
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                  Aceptar
                </Button>
              </DialogActions>
            </Dialog>

            <Grid container>
              <Grid item xs>
               {/*onClick={rec}*/}
                <Link href="recup" variant="body2">
                  Recuperar Contraseña.
                </Link>
              </Grid>

              <Grid item>
                <Link href="/sign" variant="body2">
                  {"¿No tienes cuenta? Regístrate."}
                </Link>
              </Grid>

            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    
  );
  
}
