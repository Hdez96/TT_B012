import axios from 'axios'
import { saveAs } from 'file-saver'

export const formRegister =  newForm => {
    return axios
        .post('CedulaTRA/cedulatra',{
            NumeroFactura: newForm.NumeroFactura,
            FechaAlta: newForm.FechaAlta,
            Propietario: newForm.Propietario,
            Domicilio: newForm.Domicilio,
            Telefonos: newForm.Telefonos,
            Responsable: newForm.Responsable,
            Marca: newForm.Marca,
            Modelo: newForm.Modelo,
            Año: newForm.Año,
            NumeroMotor: newForm.NumeroMotor,
            NumeroChasis: newForm.NumeroChasis,
            NumeroCarroceria: newForm.NumeroCarroceria,
            NumeroTransmision: newForm.NumeroTransmision,
            NumeroEconomico: newForm.NumeroEconomico,
            PlacaVehicular: newForm.PlacaVehicular,
            Observaciones: newForm.Observaciones,
            Nombre: newForm.Nombre,
            FechaRegistro: newForm.FechaRegistro,
//            Firma: newForm.Firma
        })
        .then(response => {
            if(response.status)
	    {
		return {success:true}
                console.log('Datos enviados.')
	    }
            else
                console.log('Datos NO enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export function downloadPDF(name){
    console.log("Cedulatra functions");
    let dir = name
    return axios
	.get('cedulatra/fetch-pdf', { params: {PDF: dir},responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

                saveAs(pdfBlob, 'Factura'+name+'.pdf')
            })
}

export const getData = NumeroEconomico => {
    return axios
	.post('/CedulaTRA/BusquedaPDF/fetch-cedulatra-pdf',{
        NumeroEconomico: NumeroEconomico
    })
    .then(resp => {
//	console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {        
	    console.log("Error al cargar los datos:" +err);
        return {success:false}
    })
}

export const getAutobus = newForm => {
    return axios
    .post("CedulaTRA/get_autobus",{
        NumeroEconomico: newForm.NumeroEconomico
    })
    .then(resp => {
        //console.log("R: "+ resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de >: "+newForm.NumeroEconomico+" error "+err);
        return {success:false}
    })
}

export const getEcos = newForm => {
    return axios
    .post("CedulaTRA/get_autobuses")
    .then(resp => {
        //console.log("R: "+ resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de Numeros economicos "+err);
        return {success:false}
    })
}

/*
export const PDF = newForm => {
	return axios
	.get('cedulatra/fetch-pdf', { responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

                saveAs(pdfBlob, 'Factura'+newForm.NumeroFactura+'.pdf')
            })
}
*/
