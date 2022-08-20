module.exports = (client) => {

	client.on('presenceUpdate', (old) => {
		console.log(old);
	});

};