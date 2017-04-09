var select = require('./select.js');
var insert = require('./insert.js');
var update = require('./update.js');
var del = require('./delete.js');
var raw = require('./raw.js');

module.exports = {
	select: select,
	insert: insert,
	update: update,
	delete: del,
	raw: raw
};