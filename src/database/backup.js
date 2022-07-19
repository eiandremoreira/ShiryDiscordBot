const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	user: String,
	guild: String,
	roles: Array,
	nickname: String
});

module.exports = mongoose.model('backup', logSchema);