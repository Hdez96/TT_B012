
import axios from 'axios'
import { saveAs } from 'file-saver'

export const sendData =  newForm => {
    let dir = newForm.mes
    return axios
        .post('consumoE/ConsumoEPDF',{
           Mes : newForm.mes
        })
        .then((res1) =>{
          console.log("enviado") 
          console.log(dir) 
          let direc = "Consumo"+dir+".pdf"
          axios.get('consumoE/fetch-pdf', { params: {PDF: dir},responseType: 'blob' })
          .then((res) => {
            const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
            saveAs(pdfBlob, direc)
          })
          .catch(err =>{
            console.log("Error descargando:" + err)
          })
        })
        .catch(err =>{
          console.log("Error creando:" + err)
        })
}

export function downloadPDF(name, route){
//  console.log("Solicitando"  + name + " a: "+route);
  let dir = name
  return axios
.get(route, { params: {PDF: dir},responseType: 'blob' })
          .then((res) => {
              const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
              saveAs(pdfBlob, name+'.pdf')
          })
}

export function viewPDF(name, route){
  //  console.log("Solicitando"  + name + " a: "+route);
    let dir = name
    return axios
  .get(route, { params: {PDF: dir},responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
                const fileURL = URL.createObjectURL(pdfBlob);
                window.open(fileURL);
            })
  }

export function downloadExcel(name, route){
//  console.log("Solicitando"  + name + " a: "+route);
  let dir = name
  return axios
.get(route, { params: {PDF: dir},responseType: 'blob' })
          .then((res) => {
              const pdfBlob = new Blob([res.data], {type: 'application/vnd.ms-excel'})

              saveAs(pdfBlob, name+'.xlsx')
          })
}


export function generarPDF(name,route)
{	
  //console.log("Solicitando"  + name + " a: "+route);
 console.log("ALOS")  
 return axios.post('pruebasdesempeno/PruebasPDF',{
        NumeroEconomico: name
  })
  .then(res => {
        console.log("Creando...")
  })
  .catch(err => {
        console.log(err)
  })

}


export const downloadPDFP = newForm =>{
//	console.log("HOLASES")
	let name = newForm.NombrePDF
  return axios
        .post('pruebasdesempeno/PruebasPDF',{
           NumeroEconomico : newForm.NombrePDF,
	   Fecha: newForm.Fecha
        })
        .then((res1) =>{
          console.log("enviado") 
          console.log(name) 
          let direc = name+".pdf"
          axios.get('pruebasdesempeno/fetch-pdf', { params: {PDF: name},responseType: 'blob' })
          .then((res) => {
            const pdfBlob = new Blob([res.data], {type: 'application/pdf'})
            saveAs(pdfBlob, direc)
          })
          .catch(err =>{
            console.log("Error descargando:" + err)
          })
        })
        .catch(err =>{
          console.log("Error creando:" + err)
        })

}
