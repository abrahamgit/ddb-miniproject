var utils = require('../utils.js');

module.exports = function (req, res) {

	var query = "DELETE FROM " + req.body.table + " WHERE " + req.body.where;
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
	        console.log(result);
	        utils.doRelease(connection);
	        res.status(200).json({rowsAffected: result.rowsAffected});
	    });
	});
};