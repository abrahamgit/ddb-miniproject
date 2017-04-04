var utils = require('../utils.js');

module.exports = function (req, res) {

	var query = "SELECT " + req.query.columns + " FROM " + req.query.table;
	if(req.query.where !== undefined) {
		query += " WHERE " + req.query.where;
	}
	if(req.query.groupby !== undefined) {
		query += " GROUP BY " + req.query.groupby;
	}
	if(req.query.orderby !== undefined) {
		query += " ORDER BY " + req.query.orderby;
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
	          res.status(404).json(utils.error(err.message));
	          return;
	        }
	        utils.doRelease(connection);
	        res.status(200).json(utils.format(result));
	    });
	});
};