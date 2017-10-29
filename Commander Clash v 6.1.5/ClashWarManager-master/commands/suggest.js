
exports.run = (client, message, args) => {

  if (!args[0]) return message.reply('dont leave the suggestion blank')

  var suggestMessage = `User:
  ${message.author.username}

  Id:
  ${message.author.id}

  suggestion:
  ${args.join(' ')}
  `
  
  admins.forEach((admin) => {
    client.sendMessage(admins, suggestMessage)
  })

  message.reply('you\'re suggestion has been sent to our admins.\nbe looking for a reply!')
}

exports.description = 'suggest new features';