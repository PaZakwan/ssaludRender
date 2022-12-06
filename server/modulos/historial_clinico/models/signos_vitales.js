const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let schemaOptions = {
    toObject: {
        getters: true
    },
    toJSON: {
        getters: true
    },
};

let Schema = mongoose.Schema;

let actual_anterior = new Schema({
    _id: false,

    actual: {
        fecha: {
            type: Date,
        },
        valor: {
            type: String,
            lowercase: true,
            trim: true,
        },
        profesional: {
            type: Schema.Types.ObjectId,
            ref: 'Profesional',
        },
    },
    anterior: {
        fecha: {
            type: Date,
        },
        valor: {
            type: String,
            lowercase: true,
            trim: true,
        },
        profesional: {
            type: Schema.Types.ObjectId,
            ref: 'Profesional',
        },
    },

}, schemaOptions);

let SignosVitalesSchema = new Schema({
    usuario_modifico: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

    paciente: {
        type: Schema.Types.ObjectId,
        ref: 'Paciente',
        required: true,
        unique: true,
    },

    // actual/anterior: fecha, valor, profesional.
    temperatura: actual_anterior,
    frecuencia_respiratoria: actual_anterior,
    frecuencia_cardiaca: actual_anterior,
    saturacion_oxigeno: actual_anterior,
    // T.A Alta
    tension_arterial_sistolica: actual_anterior,
    // T.A Baja
    tension_arterial_diastolica: actual_anterior,

}, schemaOptions);


SignosVitalesSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });

module.exports = mongoose.model('SignosVitales', SignosVitalesSchema);