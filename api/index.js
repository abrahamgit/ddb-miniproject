var express = require('express')
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

var app = express()

app.get('/select', function (req, res) {
	var query = "SELECT " + req.query.columns + " FROM " + req.query.table;
	console.log(query);
	execute(function(err, connection) {
		if (err) {
	      console.error(err.message);
	      return;
	    }
	    connection.execute(
	      query,
		  [],
		  function(err, result) {
	        if (err) {
	          console.error(err.message);
	          doRelease(connection);
	          return;
	        }
	        formattedResult = format(result);
	        res.send(formattedResult);
	        doRelease(connection);
	    });
	});
//  res.send('Hello World!')
});

function format(result) {
	formatres = [];
	row = {};
	for(var i in result.rows) {
		row = {}
		for(var j in result.metaData) {
			row[result.metaData[j].name] = result.rows[i][j];
		}
		formatres = formatres.concat(row);
	}
	return formatres;
}

function execute(callback) {
	oracledb.getConnection(
	  {
	    user          : dbConfig.user,
	    password      : dbConfig.password,
	    connectString : dbConfig.connectString
	  }, callback);
}

// Note: connections should always be released when not needed
function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});