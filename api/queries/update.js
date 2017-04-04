var utils = require('../utils.js');

module.exports = function (req, res) {
	var query = "UPDATE " + req.body.table + " SET " + req.body.set;
	if(req.body.where !== undefined) {
		query += " WHERE " + req.body.where;
	} else {
		res.status(400).json(utils.error('Missing \'where\' condition'));
		return;
	}
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
	        res.status(200).json({rowsAffected: result.rowsAffected});
	    });
	});
};