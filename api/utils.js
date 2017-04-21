var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

module.exports = {
	error : function(message) {
		return {error: true, message: message};
	},

	format : function(result) {
		formatres = [];
		row = {};
		for(var i in result.rows) {
			row = {}
			for(var j in result.metaData) {
				if(result.metaData[j].name === 'DOB') {
					result.rows[i][j].setDate(result.rows[i][j].getDate() + 1);
					row[result.metaData[j].name] = result.rows[i][j].toJSON().split('T')[0];
				} else {
					row[result.metaData[j].name] = result.rows[i][j];
				}
			}
			formatres = formatres.concat(row);
		}
		res = {
			rows: formatres,
			names: result.metaData
		}
		return res;
	},

	execute : function(callback) {
		oracledb.getConnection(
		  {
		    user          : dbConfig.user,
		    password      : dbConfig.password,
		    connectString : dbConfig.connectString
		  }, callback);
	},

	// Note: connections should always be released when not needed
	doRelease : function(connection) {
	  connection.commit(function(err) {
	  	if(err) {
	  		console.error(err.message);
	  	}
	  	connection.close(function(err) {
	      if (err) {
	        console.error(err.message);
	      }
	    });
	  });
	  
	}
};