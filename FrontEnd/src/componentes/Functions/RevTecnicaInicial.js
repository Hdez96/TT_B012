import axios from 'axios'
import { saveAs } from 'file-saver'
import Cookies from 'js-cookie'
export const formRegisterA =  newForm => {
    let empleado = Cookies.get("Nombre")
    return axios
        .post('revtecinicial/revteci',{
            RevTecInID : newForm.RevTecInID,
	    Fecha: newForm.Fecha,
            Economico: newForm.Economico,
            EmpresaOperadora : newForm.EmpresaOperadora,
            Año : newForm.Año,
            MotorElectrico : newForm.MotorElectrico,
            Carroceria : newForm.Carroceria,
            LecturaOdometro : newForm.LecturaOdometro,
            Modelo : newForm.Modelo,
            Motor : newForm.Motor,
            Chasis : newForm.Chasis,
            Transmision : newForm.Transmision,
            Tipo : newForm.Tipo,
            Empleado: empleado,
            Observaciones: newForm.Observaciones
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}


export const formRegisterCompleto =  newForm => {
    console.log("Enviando datos completos...");
    let empleado = Cookies.get("Nombre")
    return axios
        .post('revtecinicial/revtecPDF',{
            RevTecInID : newForm.RevTecInID,
            Fecha: newForm.Fecha,
	    NumeroEconomico: newForm.NumeroEconomico,
            EmpresaOperadora : newForm.EmpresaOperadora,
            Año : newForm.Año,
            MotorElectrico : newForm.MotorElectrico,
            Carroceria : newForm.Carroceria,
            LecturaOdometro : newForm.LecturaOdometro,
            Modelo : newForm.Modelo,
            Motor : newForm.Motor,
            Chasis : newForm.Chasis,
            Transmision : newForm.Transmision,
            Tipo : newForm.Tipo,
            Observaciones: newForm.Observaciones,
            NumeroMotor : newForm.NumeroMotor,
            SeñalInteriorExterior: newForm.SeñalInteriorExterior,
            Economico: newForm.Economico,
            LaminacionPinturaExterior: newForm.LaminacionPinturaExterior,
            Defensas: newForm.Defensas,
            ChasisGancho: newForm.ChasisGancho,
            Puertas: newForm.Puertas,
            CristalesParabrisas: newForm.CristalesParabrisas,
            Limpiaparabrisas: newForm.Limpiaparabrisas,
            CristalesVentanillas: newForm.CristalesVentanillas,
            CristalMedallon: newForm.CristalMedallon,
            Espejos: newForm.Espejos,
            Visera: newForm.Visera,
            AsientoConductor: newForm.AsientoConductor,
            AsientosPasajeros: newForm.AsientosPasajeros,
            ElementosSujección: newForm.ElementosSujección,
            Escotillas: newForm.Escotillas,
            Extintores: newForm.Extintores,
            Botiquin: newForm.Botiquin,
            AccesoriosSeguridad: newForm.AccesoriosSeguridad,
            Pisos: newForm.Pisos,
            Articulacion: newForm.Articulacion,
            Motor2: newForm.Motor2,
            AireComprimido: newForm.AireComprimido,
            Hibrido: newForm.Hibrido,
            Transmision2: newForm.Transmision2,
            Enfriamiento: newForm.Enfriamiento,
            Ignicion: newForm.Ignicion,
            Tablero: newForm.Tablero,
            Electrico: newForm.Electrico,
            LetreroRuta: newForm.LetreroRuta,
            Claxon: newForm.Claxon,
            SistemaDesempañante: newForm.SistemaDesempañante,
            SistemaAire: newForm.SistemaAire,
            Extractores: newForm.Extractores,
            AlumbradoEI: newForm.AlumbradoEI,
            Frenos: newForm.Frenos,
            CajaDireccion: newForm.CajaDireccion,
            Suspension: newForm.Suspension,
            TuboEscape: newForm.TuboEscape,
            SistemaRecaudo: newForm.SistemaRecaudo,
            SistemaTelematica: newForm.SistemaTelematica,
            TanqueCombustible: newForm.TanqueCombustible,
            NeumaticoSisControl: newForm.NeumaticoSisControl,
            NumeroMotorValue : newForm.NumeroMotor,
            SeñalInteriorExteriorValue: newForm.SeñalInteriorExteriorValue,
            EconomicoValue: newForm.EconomicoValue,
            LaminacionPinturaExteriorValue: newForm.LaminaciónPinturaExteriorValue,
            DefensasValue: newForm.DefensasValue,
            ChasisGanchoValue: newForm.ChasisValue,
            PuertasValue: newForm.PuertasValue,
            CristalesParabrisasValue: newForm.CristalesParabrisasValue,
            LimpiaparabrisasValue: newForm.LimpiaparabrisasValue,
            CristalesVentanillasValue: newForm.CristalesVentanillasValue,
            CristalMedallonValue: newForm.CristalMedallonValue,
            EspejosValue: newForm.EspejosValue,
            ViseraValue: newForm.ViseraValue,
            AsientoConductorValue: newForm.AsientoConductorValue,
            AsientosPasajerosValue: newForm.AsientosPasajerosValue,
            ElementosSujecciónValue: newForm.ElementosSujecciónValue,
            EscotillasValue: newForm.EscotillasValue,
            ExtintoresValue: newForm.ExtintoresValue,
            BotiquinValue: newForm.BotiquinValue,
            AccesoriosSeguridadValue: newForm.AccesoriosSeguridadValue,
            PisosValue: newForm.PisosValue,
            ArticulacionValue: newForm.ArticulaciónValue,
            Motor2Value: newForm.Motor2Value,
            AireComprimidoValue: newForm.AirecomprimidoValue,
            HibridoValue: newForm.HibridoValue,
            Transmision2Value: newForm.Transmision2Value,
            EnfriamientoValue: newForm.EnfriamientoValue,
            IgnicionValue: newForm.IgnicionValue,
            TableroValue: newForm.TableroValue,
            ElectricoValue: newForm.ElectricoValue,
            LetreroRutaValue: newForm.LetreroRutaValue,
            ClaxonValue: newForm.ClaxonValue,
            SistemaDesempañanteValue: newForm.SistemaDesempañanteValue,
            SistemaAireValue: newForm.SistemaAireValue,
            ExtractoresValue: newForm.ExtractoresValue,
            AlumbradoEIValue: newForm.AlumbradoEIValue,
            FrenosValue: newForm.FrenosValue,
            CajaDireccionValue: newForm.CajaDireccionValue,
            SuspensionValue: newForm.SuspensiónValue,
            TuboEscapeValue: newForm.TuboEscapeValue,
            SistemaRecaudoValue: newForm.SistemaRecaudoValue,
            SistemaTelematicaValue: newForm.SistemaTelematicaValue,
            TanqueCombustibleValue: newForm.TanqueCombustibleValue,
            NeumaticoSisControlValue: newForm.NeumaticoSisControlValue,
            Empleado: empleado
        })
        .then(response => {
		 console.log('Datos completos enviados.')
        })
        .catch(err => {
            console.log("Datos completos NO enviados.\n"+err)
        })
}


export const getDataCedularti = url => {
    return axios
	.post('revtecinicial/getData')
    .then(resp => {
//	console.log(resp.data.data)
        return {success:true, data: resp.data.data}
    })
    .catch(err => {
        console.log("ay")
	console.log("Eror al cargar los datos de >: "+url+" error "+err);
        return {success:false}
    })
}

export const downloadPDFR = formData => {
    console.log(formData.Ruta);
    let name = formData.NombrePDF
    return axios
    .get('revtecinicial/fetch-pdf', { params: {PDF: name},responseType: 'blob' })
            .then((res) => {
                const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

                saveAs(pdfBlob, name+'.pdf')
            })
}
