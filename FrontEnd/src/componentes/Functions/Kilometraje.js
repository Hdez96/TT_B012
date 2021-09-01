import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendData =  newForm => {
    return axios
        .post('km/Kilometraje',{
            NumeroEconomico: newForm.NumeroEconomico,
            Kilometraje: newForm.Kilometraje,
            Periodo: newForm.Periodo,
            Mes: newForm.Mes,
            Año: newForm.Año
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export const getDataKilometraje = url => {
    return axios
    .post('km/getData')
    .then(resp => {
        console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Eror al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}

export const KPDF = newForm => {
        console.log("Creando PDF")
        return axios
        .post('km/KilometrajePDF',  {
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
