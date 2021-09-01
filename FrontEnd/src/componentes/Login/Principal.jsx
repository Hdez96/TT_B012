import React,{useEffect,useState} from 'react';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
   
export default function Bienvenida() {
  	const history = useHistory();

  	const [nombre, setNombre] = useState([]);
	const [cargo, setCargo] = useState([]);
	const [departamento, setDepartamento] = useState([]);

	useEffect(() => {
		getLocal();
	}, []);

	const getLocal = async () => {
		let data = Cookies.get("Nombre")
		setNombre(data)
		let data1 = Cookies.get("Cargo")
		setCargo(data1)
		let data2 = Cookies.get("Departamento")
		setDepartamento(data2)
	};
	const onSumit = (event) =>
	{
		history.replace("/Revisiones/Formatos")
	}
	return (
		<Container component="main">
			<h5>¡Bienvenido {nombre}! </h5>
			<Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onSumit}
            >
              Continuar
            </Button>
			<br/>
		</Container>	

	);
}