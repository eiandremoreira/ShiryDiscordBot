const backup = require('../database/backup');
const guild = require('../database/backup-guild');
module.exports = (client) => {

	client.on('guildMemberRemove', (member) => {
		console.log('teste');
		guild.findOne({ guild: member.guild.id }, async (err, data5) => {
			if(!data5) return;
			console.log(`Member Left ${member.guild.name}: ${member.user.username}`);
			backup.findOne({ user: member.user.id, guild: member.guild.id }, async (err, data) => {
				if(data) {
					data.roles = member._roles;
					data.nickname = member.nickname ? member.nickname : member.user.username;
					data.save();
				}
				else {
					new backup({
						user: member.user.id,
						guild: member.guild.id,
						roles: member._roles,
						nickname: member.nickname ? member.nickname : member.user.username
					}).save();
				}
			});
		});

	});
};