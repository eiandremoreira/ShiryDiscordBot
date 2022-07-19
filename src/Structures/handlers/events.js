const fs = require('fs');


async function events (client) {

	fs.readdir('./src/events', (erro, eventos) => {
		eventos.forEach(evento=>{
			evento = evento.replace('.js', '');
			require(`../../events/${evento}`)(client);
		});
	});

}

module.exports = {
	events

};