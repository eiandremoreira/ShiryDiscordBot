module.exports = (client) => {


	client.on('ready', () => {
		client.logger.info(`${client.user.tag} iniciada com sucesso!`, { label: 'Shiry, Ready Event' });
	});
};