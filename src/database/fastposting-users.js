const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	user: String,
	curtidas: Number,
	seguidores: Array,
	seguindo: Array,
	posted: Boolean
});

module.exports = mongoose.model('fastprofile', logSchema);