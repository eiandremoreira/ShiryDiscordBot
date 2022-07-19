const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	user: String,
	lang: String
});

module.exports = mongoose.model('lang', logSchema);