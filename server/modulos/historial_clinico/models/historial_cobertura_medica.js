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

let HistorialCoberturaMedicaSchema = new Schema({
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

    coberturas_medicas: [{
        // JSON con Base de las Obras sociales existentes con su rnos,name y posibles planes.
        rnos: {
            type: String,
        },
        name: {
            type: String,
        },
        plan: {
            type: String,
        },
        nro_afiliado: {
            type: String,
            required: true,
        },
        // [inicia , finaliza cobertura]
        fecha_vigencia: {
            type: Array,
        },
    }],

}, schemaOptions);


HistorialCoberturaMedicaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único.' });

module.exports = mongoose.model('HistorialCoberturaMedica', HistorialCoberturaMedicaSchema);