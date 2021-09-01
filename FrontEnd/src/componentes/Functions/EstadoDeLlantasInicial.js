import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendDataLI = newForm => {
	return axios
		.post('estadollantasi/estadodellantasi',{
			NumeroEconomico: newForm.NumeroEconomico,
			Mes: newForm.Mes,
			Año: newForm.Año,
			NumerodeLlanta: newForm.NumerodeLlanta,
			Eje: newForm.Eje,
			Profundidad: newForm.Profundidad,
			Presion: newForm.Presion
		})
		.then(response => {
			console.log('Datos enviados.')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}