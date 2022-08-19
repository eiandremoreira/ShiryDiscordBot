const fast = require('../../database/fastposting-users');
module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'fastposting-seguir',
				categoria: 'Informações',
				desc: 'Veja informações sobre o bot'
			},
			en: {
				nome: 'fastposting-seguir',
				categoria: 'Informations',
				desc: 'See bot informations'
			},
			aliases: [],
			run: this.run
		};
	}

	async run (client, interaction, args) {

		console.log('Opa chegou here');
		let user;

		if(args[0]) {
			try {
				user = await client.users.fetch(args[0]);
			}
			catch {
				return interaction.reply('Usuário não encontrado');
			}

		}

		console.log(user);
		if(!args[0]) user = interaction.user;

		if(!user) return interaction.reply('Usuário não encontrado');

		if(user.id == interaction.user.id) return interaction.reply('Você não pode seguir você mesmo');
		fast.findOne({ user: interaction.user.id }, async (err, data) => {

			if(!data) {
				new fast({
					user: interaction.user.id,
					curtidas: 0,
					seguidores: [],
					seguindo: [user.id],
					posted: false
				}).save();
			}
			else {
				data.seguindo.push(user.id);
				data.save();
			}
		});

		fast.findOne({ user: user.id }, async (err, data) => {

			if(!data) {
				new fast({
					user: user.id,
					curtidas: 0,
					seguidores: [interaction.user.id],
					seguindo: [],
					posted: false
				}).save();
			}
			else {
				data.seguidores.push(interaction.user.id);
				data.save();
			}
		});

		interaction.reply('Sucesso, você começou a seguir esse usuário');
	}
};
