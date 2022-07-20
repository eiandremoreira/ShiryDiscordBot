const { EmbedBuilder } = require('discord.js');
const pid = require('pidusage');
const p = require('../../database/lang');
const os = require('os');
module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'botinfo',
				categoria: 'Informações',
				desc: 'Veja informações sobre o bot'
			},
			en: {
				nome: 'botinfo',
				categoria: 'Information',
				desc: 'a'
			},
			aliases: [],
			run: this.run
		};
	}

	async run (client, interaction, args, idioma) {
		let cpu = await pid(process.pid).then(s =>{return s.cpu.toFixed(2) + ' %';});

		const andre = await client.users.fetch('742798447253651506');

		p.find().count(function(err, count) {

			const embed = new EmbedBuilder()
				.setTitle(idioma.botinfo.title)
				.setColor('#6c92e4')
				.setDescription(`> ${idioma.botinfo.description.replace(/{user}/g, interaction.user).replace(/{eu}/g, client.user.username).replace(/{total_servers}/g, client.guilds.cache.size).replace(/{cmds}/g, client.commands.size)}`)
				.addFields({
					name: `<:server:925053236862406696> ${idioma.botinfo.maquina}`,
					value: `> RAM: **${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB / ${Math.round((os.totalmem() / 1024 / 1024).toFixed(2) / 1024)} GB**\n> CPU: **${cpu}**\n> ${idioma.botinfo.processador}: **${os.cpus()[0].model}**`,
					inline: false
				},
				{
					name: `<:add:925040703229268030> ${idioma.botinfo.meadd}`,
					value: `${idioma.botinfo.cliqueaqui}(https://discord.com/api/oauth2/authorize?client_id=850403894374694913&permissions=429966879974&scope=bot%20applications.commands) ${idioma.botinfo.toadd}`,
					inline: true
				},
				{
					name: `<:upvote:925040657356161136> ${idioma.botinfo.vote}`,
					value: `${idioma.botinfo.cliqueaqui}(https://top.gg/bot/850403894374694913/vote) ${idioma.botinfo.tovote}`,
					inline: true
				},
				{
					name: `<:way_correto:900128012517924914> ${idioma.botinfo.servidor}`,
					value: `${idioma.botinfo.cliqueaqui}(https://discord.com/invite) ${idioma.botinfo.log}`,
					inline: true
				},
				{
					name: `🏆 ${idioma.botinfo.agradeco}`,
					value: `- ${idioma.botinfo.agradecimento.replace(/{user}/g, interaction.user).replace(/{andre}/g, andre.tag).replace(/{pessoas}/g, count).replace(/{total_servers}/g, client.guilds.cache.size)}`,
					inline: false
				});


			interaction.reply({ embeds: [embed] });
		});
	}
};