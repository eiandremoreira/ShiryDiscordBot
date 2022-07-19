module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'ping',
				categoria: 'ℹ️ » Informações',
				desc: 'Veja os 10 usuários com mais experiencia no bot'
			},
			aliases: ['latency'],
			run: this.run
		};
	}

	async run (client, interaction) {

		interaction.reply(`:ping_pong: Pong!\n**API Ping:** \`${client.ws.ping}ms\`\n**WebSocket Ping:** \`${Date.now() - interaction.createdTimestamp}ms\``);
	}
};