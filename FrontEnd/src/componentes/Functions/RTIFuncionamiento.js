import axios from 'axios'
import { saveAs } from 'file-saver'

export const formRegisterF =  newForm => {
    return axios
        .post('rtifuncionamiento/rtiautobusF',{
            RevTecInID: newForm.RevTecInID,
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
            Suspensión: newForm.Suspensión,
            TuboEscape: newForm.TuboEscape,
            SistemaRecaudo: newForm.SistemaRecaudo,
            SistemaTelematica: newForm.SistemaTelematica,
            TanqueCombustible: newForm.TanqueCombustible,
            NeumaticoSisControl: newForm.NeumaticoSisControl
        })
        .then(response => {
		 console.log('Datos enviados.')
        })
        .catch(err => {
            console.log("Datos NO enviados.\n"+err)
        })
}
