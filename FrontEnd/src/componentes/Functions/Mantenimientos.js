import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendDataM = newForm => {
	console.log(newForm)
	return axios
		.post('mantenimiento/mantenimientos',{
			EmpresaOperadora: newForm.EmpresaOperadora,
			NumeroEconomico: newForm.NumeroEconomico,
			Dia: newForm.Dia,
			Mes: newForm.Mes,
			Año: newForm.Año,
			TipoMantenimiento: newForm.TipoMantenimiento,
			LecturaOdometroAnterior: newForm.LecturaOdometroAnterior,
			LecturaOdometro: newForm.LecturaOdometro,
			Observaciones: newForm.Observaciones,

		})
		.then(response => {
			console.log('Datos enviados.')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}
