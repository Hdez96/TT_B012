import axios from 'axios'
import { saveAs } from 'file-saver'

export const formRegisterE = newForm => {
    console.log(newForm.EconomicoValue);
    return axios
        .post('rtiestado/rtiautobusE',{
            RevTecInID: newForm.RevTecInID,
            NumeroMotor : newForm.Motor,
            SeñalInteriorExterior: newForm.SeñalInteriorExteriorValue,
            Economico: newForm.EconomicoValue,
            LaminacionPinturaExterior: newForm.LaminaciónPinturaExteriorValue,
            Defensas: newForm.DefensasValue,
            ChasisGancho: newForm.ChasisValue,
            Puertas: newForm.PuertasValue,
            CristalesParabrisas: newForm.CristalesParabrisasValue,
            Limpiaparabrisas: newForm.LimpiaparabrisasValue,
            CristalesVentanillas: newForm.CristalesVentanillasValue,
            CristalMedallon: newForm.CristalMedallonValue,
            Espejos: newForm.EspejosValue,
            Visera: newForm.ViseraValue,
            AsientoConductor: newForm.AsientoConductorValue,
            AsientosPasajeros: newForm.AsientosPasajerosValue,
            ElementosSujección: newForm.ElementosSujecciónValue,
            Escotillas: newForm.EscotillasValue,
            Extintores: newForm.ExtintoresValue,
            Botiquin: newForm.BotiquinValue,
            AccesoriosSeguridad: newForm.AccesoriosSeguridadValue,
            Pisos: newForm.PisosValue,
            Articulacion: newForm.ArticulaciónValue,
            Motor2: newForm.Motor2Value,
            AireComprimido: newForm.AirecomprimidoValue,
            Hibrido: newForm.HibridoValue,
            Transmision2: newForm.Transmision2Value,
            Enfriamiento: newForm.EnfriamientoValue,
            Ignicion: newForm.IgnicionValue,
            Tablero: newForm.TableroValue,
            Electrico: newForm.ElectricoValue,
            LetreroRuta: newForm.LetreroRutaValue,
            Claxon: newForm.ClaxonValue,
            SistemaDesempañante: newForm.SistemaDesempañanteValue,
            SistemaAire: newForm.SistemaAireValue,
            Extractores: newForm.ExtractoresValue,
            AlumbradoEI: newForm.AlumbradoEIValue,
            Frenos: newForm.FrenosValue,
            CajaDireccion: newForm.CajaDireccionValue,
            Suspensión: newForm.SuspensiónValue,
            TuboEscape: newForm.TuboEscapeValue,
            SistemaRecaudo: newForm.SistemaRecaudoValue,
            SistemaTelematica: newForm.SistemaTelematicaValue,
            TanqueCombustible: newForm.TanqueCombustibleValue,
            NeumaticoSisControl: newForm.NeumaticoSisControlValue
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}

