const fs = require('fs');
const { Collection } = require('discord.js');

async function commands (client) {

	client.commands = new Collection();
	client.commands.clear();

	fs.readdir('./src/commands/', (err, cat) => {
		cat.forEach(categoria => {


			fs.readdir(`./src/commands/${categoria}`, (err, cmds) => {
				cmds.forEach(cmd=>{
					const cmdFormatted = cmd.replace('.js', '');
					const cmdObj = require(`../../commands/${categoria}/${cmdFormatted}`);
					const comando = new cmdObj();
					client.commands.set(cmdFormatted, comando);

				});
			});
		});
	});

}

module.exports = {
	commands
};