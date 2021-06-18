const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const noblox = require('noblox');

module.exports = class RblxSearchCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roblox',
      aliases: ['rx'],
      memberName: 'roblox',
      group: 'other',
      description: 'Search for roblox user information.',
      args: [
        {
          key: 'userQuery',
          prompt: 'who are you looking for?',
          type: 'string'
        }
      ]
    });
  }

  async run(message, { userQuery }) {
    //const resl = text;
    noblox
    .getIdFromUsername(userQuery)
			.then(id => {
				noblox
					.getPlayerInfo(id)
					.then(info => {
						//console.log(info);
						const embed = new MessageEmbed();
						embed.setThumbnail(
							`http://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&username=${
								userQuery
							}`
						);
						embed.setColor('00ff00');
						embed.setTitle(`${userQuery}'s Userinfo`);
						embed.addField('Username', userQuery);
						embed.addField(
							'Created',
							JSON.stringify(info.joinDate)
								.split('"')[1]
								.split('T')[0]
						);
						embed.addField('Banned', JSON.stringify(info.isBanned));
						embed.addField('friends', info.friendCount);
						embed.addField('following', info.followingCount);
						embed.addField('follower', info.followerCount);
						//embed.setFooter('Made By | DODO |#1188');
						message.channel.send(embed);
					})
					.catch(err => {
						message.reply(':x: error!');
						console.log(err);
					});
			})
			.catch(err => {
				message.reply(':x: User not found');
			});
	}
};
