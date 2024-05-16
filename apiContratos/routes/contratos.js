var express = require('express');
var contrato = require('../controllers/contrato');

var router = express.Router();

router.get('/entidades', function(req, res, next) {
	contrato.listEntidades()
		.then(data => res.status(200).jsonp(data))
		.catch(erro => res.status(500).jsonp(erro));
});

router.get('/tipos', function(req, res, next) {
	contrato.listTipos()
		.then(data => res.status(200).jsonp(data))
		.catch(erro => res.status(500).jsonp(erro));
});

router.get('/', function(req, res, next) {
	if (req.query.entidade) {
		contrato.listContratoByEntidade(req.query.entidade)
			.then(data => res.status(200).jsonp(data))
			.catch(erro => res.status(500).jsonp(erro));
	} else if (req.query.tipo) {
		contrato.listContratoByTipo(req.query.tipo)
			.then(data => res.status(200).jsonp(data))
			.catch(erro => res.status(500).jsonp(erro));
	} else {
		contrato.list()
			.then(data => res.status(200).jsonp(data))
			.catch(erro => res.status(500).jsonp(erro));
	}
});

router.get('/:id', function(req, res, next) {
	contrato.findById(req.params.id)
		.then(dados => res.jsonp(dados))
		.catch(erro => res.jsonp(erro));
});

router.post('/', function(req, res, next) {
	contrato.insert(req.body)
		.then(dados => res.status(201).jsonp(dados))
		.catch(erro => res.status(523).jsonp(erro));
});

router.put('/:id', function(req, res, next) {
	contrato.update(req.body)
		.then(dados => res.status(202).jsonp(dados))
		.catch(erro => res.status(524).jsonp(erro));
});

router.delete('/:id', function(req, res, next) {
	contrato.remove(req.params.id)
		.then(dados => res.status(203).jsonp(dados))
		.catch(erro => res.status(525).jsonp(erro));
});

module.exports = router;
