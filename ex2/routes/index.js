var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET home page. */
router.get('/', function (req, res, next) {
	var d = new Date().toISOString().substring(0, 16);
	res.render('index', { titulo: 'Gestão de Contratos', data: d });
});

router.get('/contratos', function (req, res) {
	var d = new Date().toISOString().substring(0, 16);
	axios.get('http://localhost:16000/contratos')
		.then(resposta => {
			//print all the data
			console.log(resposta.data);



			res.render('contratos', { titulo: 'Lista de Contratos', lista: resposta.data, data: d });
			console.log("Conseguir obter os contratos");
		})
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar os contratos.', data: d })
		})
});

router.get('/contratos/:id', function (req, res, next) {
  axios.get('http://localhost:16000/contratos/' + req.params.id)
	.then(dados => {
	  res.render('contrato', { titulo: 'Contrato', contrato: dados.data });
	})
	.catch(erro => {
	  res.render('error', { error: erro })
	}); 
});

router.get('/contratos/registo', function (req, res, next) {
  var d = new Date().toISOString().substring(0, 16);
  res.render('compositor_registo', { titulo: 'Registo de Compositor', data:d});
}
);

router.post('/contratos/registo', function (req, res) {
	var d = new Date().toISOString().substring(0, 16);
	var p_id = '';

	axios.get('http://localhost:16000/periodos')
		.then(resposta => {
				for (var i = 0; i < resposta.data.length; i++)
				if (resposta.data[i].nome === req.body.periodo) {
					p_id = resposta.data[i]._id;
				}

			if (p_id == '') {
				p_id = 'P' + (resposta.data.length + 1);
				novo_periodo_temp = {
					_id: p_id,
					nome: req.body.periodo,
					contratos: [
						{
							_id: req.body._id,
							nome: req.body.nome
						}
					]
				}
				axios.post('http://localhost:16000/periodos/', novo_periodo_temp)
			} else {
				axios.get('http://localhost:16000/periodos/' + p_id)
					.then(resposta => {
						resposta.data.contratos.push({ _id: req.body._id, nome: req.body.nome });
						axios.put('http://localhost:16000/periodos/' + p_id, resposta.data)
					})
					.catch(erro => {
						res.render('error', { message: 'Erro ao recuperar o periodo.', data: d })
					})
			}

			req.body.periodo = { _id: p_id, nome: req.body.periodo };

			axios.post('http://localhost:16000/contratos', req.body)
			.then(resposta => {
				res.redirect('/contratos');
			})
			.catch(erro => {
				res.render('error', { message: 'Erro ao registar o compositor.', data: d })
			})
		})
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar os periodos.', data: d })
		})
});

// POST /contratos/edit/:id
router.post('/contratos/edit/:id', function(req, res) {
	var d = new Date().toISOString().substring(0, 16);

	axios.get('http://localhost:16000/contratos/' + req.params.id)
		.then(resposta => {
			var p_id = '';
			axios.put('http://localhost:16000/contratos/' + req.params.id, req.body)
				.then(resposta => {
					res.redirect('/contratos/');
				})
				.catch(erro => {
					res.render('error', { message: 'Erro ao editar o compositor.', data: d })
				})
		}
		)
});

router.get('/contratos/edit/:idCompositor', function (req, res) {
	var d = new Date().toISOString().substring(0, 16);
	axios.get('http://localhost:16000/contratos/' + req.params.idCompositor)
		.then(resposta => {
			console.log(resposta.data);
			res.render('compositor_editar', { titulo: 'Editar Compositor', compositor: resposta.data, data: d });
		})
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar os periodos.', data: d })
		})
}
);

router.post('/contratos/edit/:idCompositor', function (req, res) {
	var d = new Date().toISOString().substring(0, 16);
	var p_id = '';

	axios.get('http://localhost:16000/periodos')
		.then(resposta => {
			axios.put('http://localhost:16000/contratos/' + req.body._id, req.body)
				.then(resposta => {
					res.redirect('/contratos');
				})
				.catch(erro => {
					res.render('error', { message: 'Erro ao editar o compositor.', data: d })
				})
		})
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar os periodos.', data: d })
		})
});

router.get('/contratos/delete/:id', function (req, res, next) {
	var d = new Date().toISOString().substring(0, 16);
	axios.get('http://localhost:16000/contratos/' + req.params.id)
		.then(resposta => {	
			axios.delete('http://localhost:16000/contratos/' + req.params.id)
				.then(resposta => {
					res.redirect('/contratos');
				})
				.catch(erro => {
					res.render('error', { message: 'Erro ao remover o compositor.', data: d })
				})
		}
		)
		.catch(erro => {
			res.render('error', { message: 'Erro ao recuperar o compositor.', data: d })
		}
		)
});

router.get('/contratos/entidades/:nipc', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16);
    console.log("Ola!");
    axios.get('http://localhost:16000/contratos?NIPC_entidade_comunicante=' + req.params.nipc)
        .then(dados => {
            if (dados.data && dados.data.length > 0) {
                var sum = 0;
                dados.data.forEach(contrato => {
                    sum += contrato.precoContratual;
                });

                res.render('entidade', { titulo: 'Página de Entidade', nipc: req.params.nipc,  contratos: dados.data, somatorio: sum });
            } else {
                // Handle case when no data is returned
                res.render('error', { error: "No data found for the specified NIPC." });
            }
        })
        .catch(erro => {
            // Handle errors from Axios request
            res.render('error', { error: erro });
        });
});


module.exports = router;