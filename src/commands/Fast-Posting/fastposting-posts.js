const fast = require('../../database/fastposting-posts');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');
module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'fastposting-postsr',
				categoria: 'Informações',
				desc: 'Veja informações sobre o bot'
			},
			en: {
				nome: 'fastposting-posts',
				categoria: 'Informations',
				desc: 'See bot informations'
			},
			aliases: [],
			ephemeral: true,
			run: this.run
		};
	}

	async run (client, interaction) {


		fast.find().then(async posts => {

			let aleatorio = Math.floor(Math.random() * posts.length);
			let post = posts[aleatorio];

			if(!post) {
				post = {
					_id: 123,
					user: '850403894374694913',
					post: `${Math.floor(Math.random() * 300)}`,
					curtidas: 0,
					__v: 0
				};
			};

			const postador = await client.users.fetch(post.user);
			const embed = new EmbedBuilder()
				.setAuthor({ name: `${postador.tag} - Fastposting Post`, url: `https://discord.com/users/${postador.id}` })
				.setThumbnail(postador.displayAvatarURL())
				.setDescription(post.post);

			if(post.data && post.data.typeof == 'object') {
				embed.setTimestamp(post.data);
			}


			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('Paginator')
						.setLabel('Próxima Postagem')
						.setStyle(ButtonStyle.Primary),
				);


			interaction.reply({ embeds:[embed], components: [row] }).then(msg => {
				const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button, customId: 'Paginator', time: 300000 });


				collector.on('collect', async i => {

					fast.find().then(async postagens => {

						let aleatorios = Math.floor(Math.random() * postagens.length);
						let postou = postagens[aleatorios];

						if(!postou) {
							postou = {
								_id: 123,
								user: '850403894374694913',
								post: `${Math.floor(Math.random() * 300)}`,
								curtidas: 0,
								__v: 0
							};
						};
						if(i.user.id !== interaction.user.id) return;
						console.log(postagens);
						// eslint-disable-next-line max-nested-callbacks
						postagens = postagens.filter(i => i !== postou);

						aleatorios = Math.floor(Math.random() * postagens.length);
						postagens = postagens[aleatorio];

						const postador = await client.users.fetch(postou.user);
						const embed = new EmbedBuilder()
							.setAuthor({ name: `${postador.tag} - Fastposting Post`, url: `https://discord.com/users/${postador.id}` })
							.setThumbnail(postador.displayAvatarURL())
							.setDescription(postou.post);

						if(postou.data && postou.data.typeof == 'object') {
							embed.setTimestamp(postou.data);
						}

						i.update({ embeds:[embed], components: [row] });
					});
				});
			});
		});
	}
};