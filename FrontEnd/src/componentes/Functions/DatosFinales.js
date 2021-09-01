import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendDataF = newForm => {
	return axios
		.post('datosfinales/datosfinales',{
			NumeroEconomico: newForm.NumeroEconomico,
			Mes: newForm.Mes,
			Año: newForm.Año,
			Hora: newForm.Hora,
			Kilometraje: newForm.Kilometraje,
			NiveldeDiesel: newForm.NiveldeDiesel,
			Rendimiento: newForm.Rendimiento,
			Temperatura: newForm.Temperatura,
			CodigosActivos: newForm.CodigosActivos,

		})
		.then(response => {
			console.log('Datos enviados.')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}
