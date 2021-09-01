import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendCedularti =  newForm => {
    return axios
        .post('Cedularti/autobus',{
            NombreEmpresaOperadora: newForm.NombreEmpresaOperadora,
            Año: newForm.Año,
            NumeroMotorElectrico: newForm.NumeroMotorElectrico,
            NumeroCarroceria: newForm.NumeroCarroceria,
            LecturaOdometro: newForm.LecturaOdometro,
            Modelo: newForm.Modelo,
            NumeroMotor: newForm.NumeroMotor,
            NumeroChasis: newForm.NumeroChasis,
            NumeroTransmision: newForm.NumeroTransmision,
            TipoAutobus: newForm.TipoAutobus,
            NumeroEconomico: newForm.NumeroEconomico,
            Ruta: newForm.Ruta
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}


export const getAutobus = newForm => {
    return axios
    .post("Cedularti/get_autobus",{
        NumeroEconomico: newForm.NumeroEconomico
    })
    .then(resp => {
        console.log("R: "+ resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de >: "+newForm.NumeroEconomico+" error "+err);
        return {success:false}
    })
}