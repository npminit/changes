
exports.run = (client, message, args) => {

  if (!args[0]) return message.reply('dont leave the report blank')

  var reportMessage = `User:
  ${message.author.username}

  Id:
  ${message.author.id}

  report:
  ${args.join(' ')}
  `
  admins.forEach((admin) => {
    client.sendMessage(admins, reportMessage)
  })

  message.reply('you\'re report has been sent to our admins.\nbe looking for a reply!')
}

exports.description = 'report bugs';