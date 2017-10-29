var config = require('../config');

exports.run = (client, message, args, clanTag, groupConfig, userInfo) => {

  if (!args[0] || args[0] != 'true' && args[0] != 'false') return message.reply('specify true or false');

  var setting = args[0] == 'true' ? true : false

  groupConfig.enemyUpdates = setting

  client.settings.set(message.group.id, groupConfig);
  

  message.reply(`updates for enemies will be ${(setting) ? 'shown' : 'hidden'}
  
  who changed it?
  username:
  ${message.author.username}
  
  id:
  ${message.author.id}

  profile pic:
  ${message.author.pictureUrl}`, clanTag);

}