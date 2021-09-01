import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendDataE = newForm => {
	return axios
		.post('Estatus/estatus',{
			NumeroEconomico: newForm.NumeroEconomico,
			Mes: newForm.Mes,
			Año: newForm.Año,
			Lugar: newForm.Lugar,
			TiempoReal: newForm.TiempoReal,
			PresiondeAceitedeMotor: newForm.PresiondeAceitedeMotor,
			PresiondeAire: newForm.PresiondeAire,
			TemperaturaParcial: newForm.TemperaturaParcial,
			Voltaje: newForm.Voltaje,
			Velocidad1a2: newForm.Velocidad1a2,
			Velocidad2a3: newForm.Velocidad2a3,
			Velocidad3a4: newForm.Velocidad3a4,
			Velocidad4a5: newForm.Velocidad4a5,
			Velocidad5a6: newForm.Velocidad5a6,
			FrenadoBrusco: newForm.FrenadoBrusco,
			NumerodeActivacionalPedaldeFreno: newForm.NumerodeActivacionalPedaldeFreno,
			PorcentajePasajeros: newForm.PorcentajePasajeros,

		})
		.then(response => {
			console.log('Datos enviados.')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}