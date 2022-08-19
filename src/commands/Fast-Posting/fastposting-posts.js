const fast = require('../../database/fastposting-posts');
const profile = require('../../database/fastposting-users');
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
			run: this.run
		};
	}

	async run (client, interaction, args) {

		if(args[0] == 'seguidores') {
			profile.findOne({ user: interaction.user.id }, async (err, data) => {

				const numero = Math.floor(Math.random() * data.seguindo.length);
				let seguidor = data.seguindo[numero];

				fast.find({ user: seguidor }).then(async posts => {
					console.log(posts);
					const aleatorio = Math.floor(Math.random() * posts.length);
					let post = posts[aleatorio];

					console.log(post);

					const postador = await client.users.fetch(post.user);
					const embed = new EmbedBuilder()
						.setAuthor({ name: `${postador.tag} - Fastpostnig Post`, url: `https://discord.com/users/${postador.id}` })
						.setThumbnail(postador.displayAvatarURL())
						.setDescription(post.post);

					if(post.data && post.data.typeof == 'object') {
						embed.setTimestamp(post.data);
					}

					interaction.reply({ embeds:[embed] });

				});
			});
		}
		else {

			fast.find().then(async posts => {
				console.log(posts);
				const aleatorio = Math.floor(Math.random() * posts.length);
				let post = posts[aleatorio];

				console.log(post);

				const postador = await client.users.fetch(post.user);
				const embed = new EmbedBuilder()
					.setAuthor({ name: `${postador.tag} - Fastposting Post`, url: `https://discord.com/users/${postador.id}` })
					.setThumbnail(postador.displayAvatarURL())
					.setDescription(post.post);

				if(post.data) {
					embed.setTimestamp(post.data);
				}

				interaction.reply({ embeds:[embed] });


			});
		}
	}
};