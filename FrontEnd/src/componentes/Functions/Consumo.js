import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendData =  newForm => {
    return axios
        .post('Consumo/consumo',{
            NumeroEconomico: newForm.NumeroEconomico,
            Mes: newForm.Mes,
            Año: newForm.Año,
            Consumo: newForm.Consumo,
            Modulo: newForm.Modulo
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export function downloadPDF(name){
    console.log(name);
    return axios
	.get('cedulatra/fetch-pdf', { params: {PDF: name},responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

                saveAs(pdfBlob, 'Factura'+name+'.pdf')
            })
}

export const getDataCon = url => {
    return axios
    .post('Consumo/getData')
    .then(resp => {
//  console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Eror al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}

export const PDF = newForm => {
	console.log("Creando PDF")
	return axios
	.post('Consumo/ConsumoPDF',  {
		Año: newForm.Año,
            	Mes: newForm.Mes
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

