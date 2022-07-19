const winston = require('winston');
require('colors');
const { printf, combine, timestamp, colorize } = winston.format;

const config = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		debug: 5,
		graphql: 6
	},
	colors: {
		error: 'red',
		warn: 'yellowBG',
		info: 'brightCyan',
		http: 'blue',
		debug: 'yellow',
		graphql: 'magenta'
	}
};

winston.addColors(config.colors);

const transports = [
	new winston.transports.Console({
		format: combine(
			colorize({ level: true }),
			winston.format.simple(),
			timestamp(),
			printf(({ level, message, label, timestamp = new Date().toISOString() }) => {
				return `${timestamp.green} ${level} ---${label ? ` [${label.cyan}]: ` : ''} ${message.green}`;
			})
		)
	}),
	new winston.transports.File({
		filename: 'logs/combined.log',
		format: combine(
			winston.format.simple(),
			timestamp(),
			printf(({ level, message, label, timestamp = new Date().toISOString() }) => {
				return `${timestamp} ${level} ---${label ? ` [${label}]: ` : ''} ${message}`;
			})
		)
	})
];

const logger = winston.createLogger({
	levels: config.levels,
	level: 'graphql',
	transports,
	exitOnError: false
});

module.exports = logger;

// Feito por https://github.com/zulybot/rework