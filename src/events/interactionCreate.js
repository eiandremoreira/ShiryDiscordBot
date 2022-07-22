/* eslint-disable no-constant-condition */
/* eslint-disable no-cond-assign */
/* eslint-disable no-unreachable */
// const { EmbedBuilder, ActionRowBuilder, MessageButton } = require('discord.js');
// const lang = require('../database/lang');
module.exports = (client) => {

	client.on('interactionCreate', async interaction => {
		if (!interaction.type === 2) return;
		const args = interaction.options._hoistedOptions
			? interaction.options._hoistedOptions.map((i) => {
				switch (i.type) {
					case 8:
						return i.value;
						break;
					case 6:
						return i.value;
						break;
					case 7:
						return i.value;
						break;
					default:
						return i.value;
						break;
				}
			})
			: [];

		// Conteúdo "falso" da mensagem, vai juntar os valores das opções em uma única string.
		interaction.content = (interaction.commandName + ' ' + args.join(' ')).trim();

		if(interaction.options._group) {
			interaction.commandName = interaction.commandName + '-' + interaction.options._group + '-' + interaction.options._subcommand;
		}
		else if(interaction.options._subcommand) {
			interaction.commandName = interaction.commandName + '-' + interaction.options._subcommand;
		}

		const command = client.commands.get(interaction.commandName) || client.commands.find(cmd => cmd.aliases.includes(interaction.commandName));
		//	const color = '#f283cc';
		if(!command) return;
		/*
		lang.findOne({ user: interaction.user.id }, async (err, data) => {

			const row = new ActionRowBuilder();
			row.addComponents(
				new MessageButton()
					.setCustomId('Lang-pt')
					.setLabel('Português')
					.setEmoji('🇧🇷')
					.setStyle('SUCCESS'),
			);
			row.addComponents(
				new MessageButton()
					.setCustomId('Lang-en')
					.setLabel('English')
					.setEmoji('🇺🇸')
					.setStyle('SUCCESS'),
			);

			const config = new EmbedBuilder()
				.setTitle('Selecione seu idioma (Language)')
				.setDescription('> 🗺️ Clique no botão de acordo com seu idioma')
				.setColor('#6c92e4')
				.setThumbnail(interaction.user.displayAvatarURL())
				.setFooter({ text: `Configuração de: ${interaction.user.tag} (${interaction.user.id}) ` });

			if(!data) {
				return interaction.reply({ embeds: [config], components: [row], ephemeral: true });
			}
			*/
		let idioma;

		if(interaction.locale == 'pt-BR') {
			 idioma = require('../Structures/lang/pt.json');
			 }
		else {
			idioma = require('../Structures/lang/en.json');
			 }
		if(!command.ephemeral) {
			await interaction.deferReply();
			interaction.reply =	await interaction.editReply;
		}
		await command.run(client, interaction, args, idioma);
	});
//	});
};