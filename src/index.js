/* eslint-disable no-inline-comments */
const { Client, Options } = require('discord.js');
const { commands } = require('./Structures/handlers/commands');
const { events } = require('./Structures/handlers/events');
const { mongo } = require('./Structures/handlers/mongo');
const config = require('./Structures/config/config.json');
const logger = require('./Structures/complements/Logger');

const client = new Client({
	intents: 515,
	makeCache: Options.cacheWithLimits({
		ApplicationCommandManager: 0, // guild.commands
		BaseGuildEmojiManager: 0, // guild.emojis
		ChannelManager: Infinity, // client.channels
		GuildChannelManager: Infinity, // guild.channels
		GuildBanManager: 0, // guild.bans
		GuildInviteManager: 0, // guild.invites
		GuildManager: Infinity, // client.guilds
		GuildMemberManager: 0, // guild.members
		GuildStickerManager: 0, // guild.stickers
		GuildScheduledEventManager: 0, // guild.scheduledEvents
		MessageManager: 0, // channel.messages
		PermissionOverwriteManager: Infinity, // channel.permissionOverwrites
		PresenceManager: 0, // guild.presences
		ReactionManager: 0, // message.reactions
		ReactionUserManager: 0, // reaction.users
		RoleManager: Infinity, // guild.roles
		StageInstanceManager: 0, // guild.stageInstances
		ThreadManager: 0, // channel.threads
		ThreadMemberManager: 0, // threadchannel.members
		UserManager: 0, // client.users
		VoiceStateManager: 0 // guild.voiceStates
	}),
	allowedMentions: {
		parse: ['users'],
		repliedUser: true
	},
	partials: ['USER', 'CHANNEL', 'MESSAGE'],
	shardCount: 1,
	messageCacheMaxSize: 0,
	rateLimitOffset: 0,
	retrylimit: Infinity,
});

commands(client);
events(client);
mongo(config.database.url);

client.logger = logger;

if(__dirname.includes('eiandremoreira')) {
	client.login(client.bot.token.canary);
}
else {
	client.login(config.bot.token.main);
}

module.exports = { client };