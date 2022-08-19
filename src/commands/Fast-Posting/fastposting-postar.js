const fast = require('../../database/fastposting-posts');
const profile = require('../../database/fastposting-users');
module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'fastposting-postar',
				categoria: 'Informações',
				desc: 'Veja informações sobre o bot'
			},
			en: {
				nome: 'fastposting-postar',
				categoria: 'Informations',
				desc: 'See bot informations'
			},
			aliases: [],
			run: this.run
		};
	}

	async run (client, interaction, args) {

		profile.findOne({ user: interaction.user.id }, async (err, data) => {


			if(!data) {
				new fast({
					user: interaction.user.id,
					curtidas: 0,
					seguidores: [],
					seguindo: []
				}).save();
			}
		});


		new fast({
			user: interaction.user.id,
			post: args.join(''),
			curtidas: 0,
			data: new Date()
		}).save();


		interaction.reply('Sua publicação foi postada com sucesso.');
	}
};