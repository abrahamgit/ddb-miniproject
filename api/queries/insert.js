var utils = require('../utils.js');

module.exports = function (req, res) {
	var query = "INSERT INTO " + req.body.table;
	if(req.body.columns !== undefined) {
		query += "(" + req.body.columns + ")";
	}
	query += " VALUES(" + req.body.values + ")"; 
	utils.execute(function(err, connection) {
		if (err) {
	      //console.error(err.message);
	      res.status(500).json(utils.error(err.message));
	      return;
	    }
	    connection.execute(
	      query,
		  [],
		  function(err, result) {

	        if (err) {
	          //console.error(err.message);
	          utils.doRelease(connection);
	          res.status(400).json(utils.error(err.message));
	          return;
	        }
	        utils.doRelease(connection);
	        res.status(201).json({rowsAffected: result.rowsAffected});
	    });
	});
};