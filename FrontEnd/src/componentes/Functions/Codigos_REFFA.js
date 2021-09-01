import axios from 'axios'
import { saveAs } from 'file-saver'

export const getData = url => {
  return axios
  .post("/reffa/get_Codigo")
    .then(resp => {
        //console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}

export const getFallos = newForm => {
    return axios
    .post(newForm.URL,{
        NumeroEconomico: newForm.NumeroEconomico
    })
    .then(resp => {
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de >: "+newForm.URL+" error "+err);
        return {success:false}
    })
}

export const getReffa = url => {
  return axios
  .post(url)
    .then(resp => {
        //console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}


export const getHeader = url => {
  return axios
  .post(url)
    .then(resp => {
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("Error al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}

export const updateHeader =  newForm => {
    console.log(newForm)    
    return axios
        .post('fotos/updateheader',{
            NumeroEconomico: newForm.NumeroEconomico,
            Foto: newForm.Foto,
            Codigo: newForm.Codigo,
            Fecha: newForm.Fecha         
        })
        .then(response => {
            console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export const sendFoto =  newForm => {
    console.log(newForm)    
    return axios
        .post('fotos/fotos',{
            NumeroEconomico: newForm.NumeroEconomico,
            Foto: newForm.Foto,
            Codigo: newForm.Codigo,
            Fecha: newForm.Fecha         
        })
        .then(response => {
            console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export const sendCodes =  newForm => {
    console.log(newForm)    
    return axios
        .post('fallos/anexoT',{
            NumeroEconomico: newForm.NumeroEconomico,
            Codigo: newForm.Codigos,
            Elemento: newForm.Elemento,
            Estatus: newForm.Estatus,
            Detalle: newForm.Detalle,
            Ubicaciones: newForm.Localizacion,
            Observaciones: newForm.Observaciones,
            Fecha: newForm.Fecha            
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export const sendData =  newForm => {
    return axios
        .post('reffa/reffaT',{
            NumeroEconomico: newForm.NumeroEconomico,
            EmpresaOperadora: newForm.EmpresaOperadora,
            Año: newForm.AñoR,
            NoMotor: newForm.NoMotorR,
            NoChasis: newForm.NoChasisR,
            NoTransmision: newForm.NoTransmision,
            Marca: newForm.MarcaR,
            Modelo: newForm.ModeloR,
            Placas: newForm.PlacasR,
            FechaUltimoMantenimiento: newForm.FechaUltimoMantenimiento,
            Verificacion: newForm.Verificacion,
            ConsumoPromedio: newForm.ConsumoPromedio,
            FechaFumigacion: newForm.FechaFumigacion,
            NotaExtra: newForm.NotaExtra,
            Cargo: newForm.Cargo,
            Fecha: newForm.Fecha,
            Nombre: newForm.Nombre,
            Hora: newForm.Hora
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export const sendElaboration =  newForm => {
    console.log(newForm)
    return axios
        .post('personarecepcion/personaR',{
            Nombre: newForm.Nombre,
            Fecha: newForm.Fecha,
            Hora: newForm.Hora,
            NumeroEconomico: newForm.NumeroEconomico
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

export function downloadPDF(name, route){    
      let dir = name
      return axios
    .get(route, { params: {PDF: dir},responseType: 'blob' })
              .then((res) => {
                  const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
    
                  saveAs(pdfBlob, name+'.pdf')
              })
    }
    
