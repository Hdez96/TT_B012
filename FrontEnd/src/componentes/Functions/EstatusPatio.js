import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendData =  newForm => {
    return axios
        .post('estatusP/patio',{
            NumeroEconomico: newForm.NumeroEconomico,
            Estatus: newForm.Estatus,
            Sistema: newForm.Sistema,
            Descripciondefalla: newForm.Descripciondefalla,
            Kilometraje: newForm.Kilometraje,
            Fechadeingreso: newForm.Fechadeingreso
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export const getData = url => {
  return axios
  .post('estatusP/get_liberacion')
    .then(resp => {
        //console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Eror al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}

export const Liberar = newPatio =>{
  return axios
      .post('estatusP/UpdateLiberacion', {
        NumeroEconomico: newPatio.NumeroEconomico,
        Estatus: newPatio.Estatus,
        Sistema: newPatio.Sistema,
        Descripciondefalla: newPatio.Descripciondefalla,
        Kilometraje: newPatio.Kilometraje,
        Fechadeingreso: newPatio.Fechadeingreso,
        Fechadeliberacion: newPatio.Fechadeliberacion
      })
      .then(response => {
         console.log('Actualizado.')
         window.location.reload(false)
         return response.data
      })
}

export const sendFecha = newForm =>{

    if(newForm.FechaFin)
    {
	return axios
                .post('estatusP/patioPDF',{
                        Fechadeliberacion: newForm.Fechadeliberacion,
                	FechaFin: newForm.FechaFin
		})
                .then(response =>{
                    console.log('Datos envidatos.')
                })
                .catch(err => {
                    console.log('Fecha no enviada, error de conexión')
                })
    }
    else
    {
    	return axios
        	.post('estatusP/patioPDF',{
            		Fechadeliberacion: newForm.Fechadeliberacion
        	})
        	.then(response =>{
        	    console.log('Datos envidatos.')
        	})
        	.catch(err => {
        	    console.log('Fecha no enviada, error de conexión')
        	})
    }
}

export const sendFechaExcel = newForm =>{
    return axios
        .post('estatusP/patioExcel',{
            Fechadeliberacion: newForm.Fechadeliberacion,
	    FechaFin: newForm.FechaFin
        })
        .then(response =>{
            console.log('Datos envidatos.')
        })
        .catch(err => {
            console.log('Fecha no enviada, error de conexión')
        })
}
