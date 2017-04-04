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
				row[result.metaData[j].name] = result.rows[i][j];
			}
			formatres = formatres.concat(row);
		}
		return formatres;
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