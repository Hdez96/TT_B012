import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendDataI = newForm => {
	return axios
		.post('datosiniciales/datosiniciales',{
			NumeroEconomico: newForm.NumeroEconomico,
			Mes: newForm.Mes,
			Año: newForm.Año,
			Hora: newForm.Hora,
			NiveldeDiesel: newForm.NiveldeDiesel,
			Kilometraje: newForm.Kilometraje,
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
