const lang = require('../database/lang');
module.exports = (client) => {

	client.on('interactionCreate', async interaction => {
		if (interaction.type === 2) return;

		if(interaction.customId == 'Lang-en') {
			lang.findOne({ user: interaction.user.id }, async (err, data) => {
				if(data) return;

				new lang ({
					user: interaction.user.id,
					lang: 'en'
				}).save();

				interaction.reply({ content: 'Done!', ephemeral: true });
			});
		}
		if(interaction.customId == 'Lang-pt') {
			lang.findOne({ user: interaction.user.id }, async (err, data) => {

				if(data) return;
				new lang ({
					user: interaction.user.id,
					lang: 'pt'
				}).save();

				interaction.reply({ content: 'Pronto!', ephemeral: true });
			});
		}
	});
};