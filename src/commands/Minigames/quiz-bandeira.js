const { ActionRowBuilder, SelectMenuBuilder, AttachmentBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'quiz-bandeira',
				categoria: 'Minigames',
				desc: 'De qual país é essa bandeira?'
			},
			en: {
				nome: 'quiz-flag',
				categoria: 'Minigames',
				desc: 'What country is this flag from?'
			},
			ephemeral: false,
			aliases: ['quiz-flag'],
			run: this.run
		};
	}

	async run (client, interaction, args, idioma) {
		let { response } = require('../../Structures/complements/flagquiz-random');
		 response.r = await response(idioma.has);
		const attachment = new AttachmentBuilder(response.r.pais.img, 'pais.png');
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId(`select-${interaction.id}`)
					.setPlaceholder(idioma.quiz.flag.select)
					.addOptions(response.r.alternative),
			);


		await interaction.reply({ content:  idioma.quiz.flag.pergunta.replace(/{continente}/g, ` \`${response.r.pais.continente}\`\nDDI: \`+${response.r.pais.ddi}\``), files: [attachment], components: [row] }).catch((e) => client.logger.error(e, { label: 'Shiry, Catch Error' }));

		const ch = interaction.channel;
		console.log(ch);
		const filter = i => i.user.id == interaction.user.id;
		const collector = ch.createMessageComponentCollector({ filter, time: 300000 });

		collector.on('collect', async i => {
			if(i.customId !== `select-${interaction.id}`) return;
			if (i.user.id === interaction.user.id) {
				if(i.values[0] == `${response.r.pais.name},${response.r.pais.name}`) {
					let { response } = require('../../Structures/complements/flagquiz-random');
					response.r = await response(idioma.has);
					const attachment = new AttachmentBuilder(response.r.pais.img, 'pais.png');
					const row = new ActionRowBuilder()
						.addComponents(
							new SelectMenuBuilder()
								.setCustomId(`select-${i.id}`)
								.setPlaceholder(idioma.quiz.flag.select)
								.addOptions(response.r.alternative),
						);
					await i.deferReply({ ephemeral: true }).catch((e) => client.logger.error(e, { label: 'Shiry, Catch Error' }));
					await wait(400);
					await i.editReply({ content: idioma.quiz.flag.pergunta.replace(/{continente}/g, ` \`${response.r.pais.continente}\`\nDDI: \`+${response.r.pais.ddi}\``), files: [attachment], components: [row], ephemeral: true });
					interaction.id = i.id;
				}
				else {

					let alternativas = i.values[0].split(',');
					i.reply({ content:`${idioma.quiz.flag.perdeu} \`${alternativas[1]}\``, ephemeral: true }).catch((e) => client.logger.error(e, { label: 'Shiry, Catch Error' }));
					collector.stop();
				}
			}
		});
	}
};