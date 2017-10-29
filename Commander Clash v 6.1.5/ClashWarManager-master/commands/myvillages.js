
exports.run = (client, message, args, groupConfig, userInfo) => {

  if (!userInfo) return message.reply('you dont have any villages')

  var villageMessage = `
  main:
  ${(userInfo.accounts.main.name) ? userInfo.accounts.main.name : 'N/A'}
  
  mini:
  `
  userInfo.accounts.mini.forEach((acc) => {
    villageMessage += `${acc.name}\n`
  })

  message.reply(villageMessage);

}