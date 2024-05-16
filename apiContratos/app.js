var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/contratos'
mongoose.connect(mongoDB)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na ligação ao MongoDB'));
db.once('open', () => {
	console.log('Ligação ao MongoDB efetuada com sucesso');
});

var indexRouter = require('./routes/index');
var contratosRouter = require('./routes/contratos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contratos', contratosRouter);

module.exports = app;
