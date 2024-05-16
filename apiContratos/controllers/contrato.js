var Contrato = require('../models/contrato');


module.exports.list = () => {
    return Contrato
        .find()
        .exec();
}

module.exports.findById = id => {
    return Contrato
        .findOne({_id: id})
        .exec();
}

module.exports.listContratoByEntidade = (entidade) => {
    return Contrato
        .find({"entidade_comunicante": entidade})
        .exec()
}

module.exports.listContratoByTipo = (tipo) => {
    return Contrato
        .find({"tipoprocedimento": tipo})
        .exec()
}

module.exports.listEntidades = () => {
    return Contrato
        .distinct("entidade_comunicante")
        .sort()
        .exec()
}

module.exports.listTipos = () => {
    return Contrato
        .distinct("tipoprocedimento")
        .sort()
        .exec()
}


module.exports.insert = contrato => {
    return Contrato.create(contrato);
}

module.exports.update = contrato => {
    return Contrato.updateOne({_id: contrato._id}, contrato);
}

module.exports.remove = id => {
    return Contrato.deleteOne({_id: id});
}



