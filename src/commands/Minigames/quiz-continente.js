const { ActionRowBuilder, SelectMenuBuilder, AttachmentBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const continent = require('../../database/continent-points');
module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'quiz-continente',
				categoria: 'Minigames',
				desc: 'De qual continente é esse país ?'
			},
			en: {
				nome: 'quiz-continent',
				categoria: 'Minigames',
				desc: 'What continent is this country from?'
			},
			ephemeral: false,
			aliases: ['quiz-continent'],
			run: this.run
		};
	}

	async run (client, interaction, args, idioma) {
		let pontuação = 0;
		let cont = 0;
		let { response } = require('../../Structures/complements/continent');
		response.r = await response(idioma.has);
		const attachment = new AttachmentBuilder(response.r.pais.img);
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId(`selectc-${interaction.id}`)
					.setPlaceholder(idioma.quiz.continent.select)
					.addOptions(response.r.alternative),
			);


		await interaction.reply({ content: idioma.quiz.continent.pergunta.replace(/{pais}/g, `\`${response.r.pais.name}\`\nDDI: \`+${response.r.pais.ddi}\``), files: [attachment], components: [row] }).catch((e) => client.logger.error(e, { label: 'Shiry, Catch Error' }));

		const ch = await client.channels.fetch(interaction.channel.id);
		const filter = i => i.user.id == interaction.user.id;
		const collector = ch.createMessageComponentCollector({ filter, time: 300000 });

		collector.on('collect', async i => {
			if(i.customId !== `selectc-${interaction.id}`) return;
			if (i.user.id === interaction.user.id) {
				if(i.values[0] == `${response.r.pais.continente},${response.r.pais.continente}`) {
					let { response } = require('../../Structures/complements/continent');
					response.r = await response(idioma.has);
					const attachment = new AttachmentBuilder(response.r.pais.img);
					const row = new ActionRowBuilder()
						.addComponents(
							new SelectMenuBuilder()
								.setCustomId(`selectc-${i.id}`)
								.setPlaceholder(idioma.quiz.continent.select)
								.addOptions(response.r.alternative),
						);
					await i.deferReply({ ephemeral: true }).catch((e) => client.logger.error(e, { label: 'Shiry, Catch Error' }));
					await wait(400);
					await i.editReply({ content: idioma.quiz.continent.pergunta.replace(/{pais}/g, `\`${response.r.pais.name}\`\nDDI: \`+${response.r.pais.ddi}\``), files: [attachment], components: [row], ephemeral: true });
					interaction.id = i.id;
					pontuação = pontuação + 1000 + response.r.pais.ddi;
					cont = cont + 1;
				}
				else {
					continent.findOne({ user: interaction.user.id }, async (err, data) => {
						let alternativas = i.values[0].split(',');
						cont = cont + 1;
						i.reply({ content:`${idioma.quiz.continent.perdeu} \`${alternativas[1]}\`\n${idioma.quiz.continent.ponto} \`${pontuação}\``, ephemeral: true }).catch((e) => client.logger.error(e, { label: 'Shiry, Catch Error' }));

						if(!data) {
							new continent({
								user: interaction.user.id,
								pontos: pontuação,
								conti: cont,
								partidas: 1
							}).save();
						}
						else {
							console.log(data);
							data.pontos = data.pontos + pontuação;
							data.conti = data.conti ? data.conti : 0 + cont;
							data.partidas = data.partidas ? data.partidas : 0 + 1;
							data.save();
						}
						collector.stop();
					});
				}
			}
		});
	}
};