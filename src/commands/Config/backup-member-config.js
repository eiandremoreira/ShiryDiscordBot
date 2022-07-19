const backup = require('../../database/backup-guild');
module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'backup-member-config',
				categoria: 'Sistemas',
				desc: 'Restaure os cargos e o apelido do usuário que ele tinha antes de sair do servidor'
			},
			en: {
				nome: 'backup-member-config',
				categoria: 'Systems',
				desc: 'Restore the user roles and nickname he had before he left the server'
			},
			ephemeral: false,
			aliases: [],
			run: this.run
		};
	}

	async run (client, interaction, args, idioma) {
		backup.findOne({ user: interaction.user.id }, async (err, data) => {
			const member = await interaction.guild.members.fetch(interaction.user.id);
			if(!member.permissions.has('Administrator')) return interaction.reply(`<a:erro:860558138171588618> **|** ${interaction.user} ${idioma.backup.perm}`);

			if(args[0] == 'on') {

				if(!data) {
					new backup({
						guild: interaction.guild.id,
						moderator: interaction.user.id
					}).save();
					interaction.reply(`<a:confere:862089585646632990> **|** ${interaction.user} ${idioma.backup.taativado} `);

				}
				else {interaction.reply(`<a:erro:860558138171588618> **|** ${interaction.user} ${idioma.backup.jataativado}`);}

			}
			else if(data) {
				data.delete();
				interaction.reply(`<a:confere:862089585646632990> **|** ${interaction.user} ${idioma.backup.tadesativado} `);
			}
			else {
				interaction.reply(`<a:erro:860558138171588618> **|** ${interaction.user} ${idioma.backup.jatadesativado}`);
			}
		});
	}
};