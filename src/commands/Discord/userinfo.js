module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'userinfo',
				categoria: 'Discord',
				desc: 'Veja informações sobre um usuário '
			},
			en: {
				nome: 'userinfo',
				categoria: 'Discord',
				desc: 'View information about a user'
			},
			ephemeral: false,
			aliases: [],
			run: this.run
		};
	}

	async run (client, interaction, args) {
	}
};