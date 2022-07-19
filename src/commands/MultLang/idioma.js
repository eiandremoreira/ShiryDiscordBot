// const lang = require('../../database/lang');
module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'idioma',
				categoria: 'Multi Idioma',
				desc: 'Configure o idioma em que o bot deve falar'
			},
			en: {
				nome: 'lang',
				categoria: 'Multilingual',
				desc: 'Set the language in which the bot should speak'
			},
			ephemeral: false,
			aliases: ['lang'],
			run: this.run
		};
	}

	async run (client, interaction, args, idioma) {
		interaction.reply(`<a:erro:860558138171588618> **|** ${interaction.user} ${idioma.idioma.error}`);
		/*
		lang.findOne({ user: interaction.user.id }, async (err, data) => {

			if(!data) return;
			if(args[0] == 'en') {
				data.lang = 'en';
				data.save();
				return interaction.reply('Configuration saved successfully');
			}
			else {
				data.lang = 'pt';
				data.save();

				return interaction.reply('Configuração salva com sucesso.');
			}
		});
*/
	}
};