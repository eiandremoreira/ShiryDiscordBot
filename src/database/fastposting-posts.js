const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	user: String,
	post: String,
	curtidas: Number
});

module.exports = mongoose.model('fastpost', logSchema);