var config = require('../config');

exports.run = (client, message, args, clanTag, groupConfig, userInfo) => {

  if (!args[0]) return message.reply('specify a prefix please');
  if (args[0].length > 3) return message.reply('max length of a prefix is 3');

  groupConfig.prefix = args[0]

  client.settings.set(message.group.id, groupConfig);
  

  message.reply(`this chats prefix has been set to ${args[0]}
  
  who changed it?
  username:
  ${message.author.username}
  
  id:
  ${message.author.id}

  profile pic:
  ${message.author.pictureUrl}`, clanTag);

}