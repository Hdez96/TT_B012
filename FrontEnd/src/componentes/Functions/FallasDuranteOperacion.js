import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendDataFa = newForm => {
	return axios
		.post('fallasoperacion/fallasduranteoperacion',{
			NumeroEconomico: newForm.NumeroEconomico,
			Mes: newForm.Mes,
			Año: newForm.Año,
			Falla: newForm.Falla,

		})
		.then(response => {
			console.log('Datos enviados.')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}