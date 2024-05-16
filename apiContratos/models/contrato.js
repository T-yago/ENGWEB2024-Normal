const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
    _id: String,
    nAnuncio: Number,
    tipoprocedimento: String,
    objectoContrato: String,
    dataPublicacao: String,
    dataCelebracaoContrato: String,
    precoContratual: Number,
    prazoExecucao: Number,
    NIPC_entidade_comunicante: String,
    entidade_comunicante: String,
    fundamentacao: String
}, { versionKey: false });

module.exports = mongoose.model('contrato', contratoSchema, 'contratos');
