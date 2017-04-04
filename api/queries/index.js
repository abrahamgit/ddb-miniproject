var select = require('./select.js');
var insert = require('./insert.js');
var update = require('./update.js');
var del = require('./delete.js');

module.exports = {
	select: select,
	insert: insert,
	update: update,
	delete: del
};