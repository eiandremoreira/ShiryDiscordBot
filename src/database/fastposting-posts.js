const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	user: String,
	post: String,
	curtidas: Number,
	data: Object
});

module.exports = mongoose.model('fastpost', logSchema);