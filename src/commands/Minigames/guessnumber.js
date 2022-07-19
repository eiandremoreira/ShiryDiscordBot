module.exports = class Command {
	constructor () {
		return {
			permissoes: {
				membro: [],
				bot: [],
				dono: false
			},
			pt: {
				nome: 'guessnumber',
				categoria: 'Minigames',
				desc: 'Você consegue adivinhar qual é o número?'
			},
			en: {
				nome: 'guessnumber',
				categoria: 'Minigames',
				desc: 'Can you guess the number?'
			},
			ephemeral: false,
			aliases: [],
			run: this.run
		};
	}

	async run (client, interaction, args, idioma) {

		function divertido (number, escolhido) {


			let array = [
				`<:shiry_naocurto:974342743172202566> **|** ${interaction.user} Nah, Eu não curto muito o número \`${escolhido}\`, eu prefiro o **\`${number}\`**`,
				`<:shiry_brilho:974342489794297937> **|** ${interaction.user} Você pode até gostar do número \`${escolhido}\`, mas o **\`${number}\`** tem um brilho único pra mim, sabe como como é?`,
				`<:shiry_numeros:974342193701605426> **|** ${interaction.user} Mas bah sô! Nem pra ocê acertar o número **\`${number}\`**`,
				`<:shiry_masorte:974331085368471562> **|** ${interaction.user} Ixi, Olha a Zica! O número era o **\`${number}\`** e não o \`${escolhido}\``,
				`<:shiry_choro:974330430784421968> **|** ${interaction.user} Vou te contar hein! O número era o **\`${number}\`** parça`,
				`<:shiry_nerd:974329995197571092> **|** ${interaction.user} Hoje eu estou me sentindo inteligente, vou te dar a resposta com a seguinte conta: \`${number - 7} + 7 =\`**\`${number}\`** e não \`${escolhido}\``,
				`<:shiry_raiva:974329590988283944> **|** ${interaction.user} AAAAAAAAAAA! Era o número **\`${number}\`** cara`
			];

			const random = Math.floor(Math.random() * 7);

			return array[random];
		}

		if(isNaN(args[0])) return;
		if(args[0] >= 0 && args[0] <= 10) {

			const number = Math.floor(Math.random() * 11);

			if(number == args[0]) {
				interaction.reply(`<:shiry_numeros:974342193701605426> **|** ${interaction.user} ${idioma.guessnumber.conseguiu} **\`${number}\`**`);
			}
			else if(idioma.has == 'pt') {
				interaction.reply(divertido(number, args[0]), { allowedMentions: {
					parse: ['users'],
					users: [interaction.user.id],
					repliedUser: true
				} });
			}
			else {
				interaction.reply(`<:shiry_naocurto:974342743172202566> **|** ${interaction.user} You lose! The number I was thinking of was: **\`${number}\`**`);
			}
		}
	}
};