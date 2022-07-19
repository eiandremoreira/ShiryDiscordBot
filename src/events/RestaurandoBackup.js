const backup = require('../database/backup');
const guild = require('../database/backup-guild');
module.exports = (client) => {
	client.on('guildMemberAdd', (member) => {
		guild.findOne({ guild: member.guild.id }, async (err, data5) => {
			if(!data5) return;
			console.log(`Member Joined ${member.guild.name}: ${member.user.id}`);
			backup.findOne({ user: member.user.id, guild: member.guild.id }, async (err, data) => {

				if(data) {

					member.roles.add(data.roles, 'Foi encontrado um backup do usuário no servidor').catch((e) => client.logger.error(e, { label: 'Shiry, Catch Error' }));
					console.log(`Add ${data.roles.join(', ')} for ${member.user.username} in ${member.guild.name}`);

					member.setNickname(data.nickname, 'Foi encontrado um backup do usuário no servidor').catch((e) => client.logger.error(e, { label: 'Shiry, Catch Error' }));
				}
			});
		});
	});
};