var express = require('express');
var bodyParser = require('body-parser');
var utils = require('./utils.js');
var queries = require('./queries/index.js');


var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/select', queries.select);
app.get('/raw', queries.raw);
app.post('/insert', queries.insert);
app.put('/update', queries.update);
app.delete('/delete', queries.delete);


app.get('*', function(req, res) {
	res.status(404).json(utils.error('Method not found'));
});
app.post('*', function(req, res) {
	res.status(404).json(utils.error('Method not found'));
});
app.put('*', function(req, res) {
	res.status(404).json(utils.error('Method not found'));
});
app.delete('*', function(req, res) {
	res.status(404).json(utils.error('Method not found'));
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});