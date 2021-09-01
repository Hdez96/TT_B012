const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'RTIEstados',
    {
        RevTecInID: {
            type: Sequelize.STRING,
            primaryKey: true,
            autoincrement: true
        },
        SeñalInteriorExterior: {
            type: Sequelize.STRING
        },
        Economico: {
            type: Sequelize.STRING
        },
        LaminacionPinturaExterior: {
            type: Sequelize.STRING
        },
        Defensas: {
            type: Sequelize.STRING
        },
        ChasisGancho: {
            type: Sequelize.STRING
        },
        Puertas: {
            type: Sequelize.STRING
        },
        CristalesParabrisas: {
            type: Sequelize.STRING
        },
        Limpiaparabrisas: {
            type: Sequelize.STRING
        },
        CristalesVentanillas: {
            type: Sequelize.STRING
        },
        CristalMedallon: {
            type: Sequelize.STRING
        },
        Espejos: {
            type: Sequelize.STRING
        },
        Visera: {
            type: Sequelize.STRING
        },
        AsientoConductor: {
            type: Sequelize.STRING
        },
        AsientosPasajeros: {
            type: Sequelize.STRING
        },
        ElementosSujección: {
            type: Sequelize.STRING
        },
        Escotillas: {
            type: Sequelize.STRING
        },
        Extintores: {
            type: Sequelize.STRING
        },
        Botiquin: {
            type: Sequelize.STRING
        },
        AccesoriosSeguridad: {
            type: Sequelize.STRING
        },
        Pisos: {
            type: Sequelize.STRING
        },
        Articulacion: {
            type: Sequelize.STRING
        },
        Motor2: {
            type: Sequelize.STRING
        },
        AireComprimido: {
            type: Sequelize.STRING
        },
        Hibrido: {
            type: Sequelize.STRING
        },
        Transmision2: {
            type: Sequelize.STRING
        },
        Enfriamiento: {
            type: Sequelize.STRING
        },
        Ignicion: {
            type: Sequelize.STRING
        },
        Tablero: {
            type: Sequelize.STRING
        },
        Electrico: {
            type: Sequelize.STRING
        },
        LetreroRuta: {
            type: Sequelize.STRING
        },
        Claxon: {
            type: Sequelize.STRING
        },
        SistemaDesempañante: {
            type: Sequelize.STRING
        },
        SistemaAire: {
            type: Sequelize.STRING
        },
        Extractores: {
            type: Sequelize.STRING
        },
        AlumbradoEI: {
            type: Sequelize.STRING
        },
        Frenos: {
            type: Sequelize.STRING
        },
        CajaDireccion: {
            type: Sequelize.STRING
        },
        Suspension: {
            type: Sequelize.STRING
        },
        TuboEscape: {
            type: Sequelize.STRING
        },
        SistemaRecaudo: {
            type: Sequelize.STRING
        },
        SistemaTelematica: {
            type: Sequelize.STRING
        },
        TanqueCombustible: {
            type: Sequelize.STRING
        },
        NeumaticoSisControl: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)
