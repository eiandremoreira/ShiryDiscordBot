const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
	guild: String,
	moderator: String
});

module.exports = mongoose.model('backup-guild', logSchema);