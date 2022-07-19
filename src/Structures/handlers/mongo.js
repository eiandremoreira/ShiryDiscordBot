const logger = require('../complements/Logger');
const { connect } = require('mongoose');

async function mongo (url) {

	connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(() => logger.info('Database conectada com sucesso', { label: 'Shiry, Database' }));

}


module.exports = { mongo };