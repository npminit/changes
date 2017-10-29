
exports.run = (client, message, args, clanTag, groupConfig, userInfo) => {
  if (!clanTag) return message.reply('this chat is not linked to a chat');

  var settingsMessage = `current settings for ${clanData[clanTag].name}
  prefix: ${groupConfig.prefix}
  enemy updates: ${groupConfig.enemyUpdates}
  hide list: ${groupConfig.hideList}
  hide bases: ${groupConfig.hideBases}
  `

  message.reply(settingsMessage)
}