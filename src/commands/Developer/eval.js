const { EmbedBuilder } = require('discord.js');

module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'eval',
				categoria: 'Minigames',
				desc: 'Execute códigos'
			},
			en: {
				nome: 'eval',
				categoria: 'Minigames',
				desc: 'Run a codes'
			},
			ephemeral: false,
			aliases: [],
			run: this.run
		};
	}

	async run (client, interaction, args) {
		const dev = ['742798447253651506'];

		if (!dev.includes(interaction.user.id)) return interaction.reply({ content: '**<a:erro:860558138171588618> |  Esse comando só pode ser executado por Desenvolvedores.**' });
		let code;
		try {
			code = await eval(args.join(' '));
		}
		catch (e) {
			code = e.toString();
		}
		const tipo = typeof code;
		try {
			if (typeof code !== 'string') code = await require('util').inspect(code, { depth: 0 });
		}
		catch (e) {
			code = e.toString();
		}
		const embed = new EmbedBuilder()
			.setDescription(` \`\`\`js\n${code.slice(0, 1010)}\`\`\``)
			.setColor('#baecf9')
			.setFooter({ text: `Tipo: ${tipo}` })
			.setAuthor({ name: `Executado por ${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp();

		interaction.reply({ embeds: [embed], ephemeral: true });

	}
};