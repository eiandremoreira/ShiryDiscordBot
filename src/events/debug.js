module.exports = (client) => {
	client.on('debug', info => {
		if(info.includes('Heartbeat')) return;
		client.logger.debug(info, { label: 'Shiry, Debug Event' });
	});
};