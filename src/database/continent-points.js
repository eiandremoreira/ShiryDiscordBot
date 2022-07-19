const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	user: String,
	pontos: Number,
	conti: Number,
	partidas: Number
});

module.exports = mongoose.model('continent-point', logSchema);