import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendData = newForm => {
	return axios
		.post('Rendimientos/rendimientos',{
			NumeroEconomico: newForm.NumeroEconomico,
			Kilometraje: newForm.Kilometraje,
			ConsumoDiesel: newForm.ConsumoDiesel,
			RendimientoDiesel: newForm.RendimientoDiesel,
			Periodo: newForm.Periodo,
			Año: newForm.Año
		})
		.then(response => {
			console.log('Datos enviados.')
		})
		.catch(err => {
			console.log('Datos NO enviados.'+err)
		})
}

export const getDataRendimientos = url => {
    return axios
    .post('Rendimientos/getData')
    .then(resp => {
//  console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Eror al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}

export const RPDF = newForm => {
        console.log("Creando PDF")
        return axios
        .post('Rendimientos/RendimientosPDF',  {
                Año: newForm.Año,
                Periodo: newForm.Mes
        })
            .then((res) => {
                        //const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
                        //saveAs(pdfBlob, 'Factura'+newForm.Año+'.pdf')
                        console.log("Creado!")
            })
        .catch(err => {
                console.log(err)
        })
}
