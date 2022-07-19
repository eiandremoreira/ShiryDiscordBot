module.exports = (client) => {

	process.on('unhandledRejection', (err) => console.log(err));

	process.on('uncaughtException', (err) => console.log(err));

	client.on('error', (err) => console.log(err));
};