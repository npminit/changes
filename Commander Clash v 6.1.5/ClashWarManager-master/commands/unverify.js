const funcs = require('../util/functions');

exports.run = (client, message, args, clanTag) => {
  if (!clanTag) return message.reply('this chat isnt linked to a clan')
  if (!args[0]) return message.reply('please specify the name of the claim to remove');

  var name = args.join(' ');

  ClanStorage.getItem(message.author.id, (err, user) => {
    if (err) throw err;

    if (user) user = JSON.parse(user)
    if (!user) return message.reply('you have no claimed villages to remove')


    var removed = false;
    user.accounts.mini.forEach((acc, index) => {
      if (acc.name.toLowerCase() == name.toLowerCase()) {
        user.accounts.mini.splice(index, 1);
        removed = true
      }
    });

    if (removed == false) return message.reply('you dont have that account linked')

    ClanStorage.setItem(message.author.id, JSON.stringify(user))
    .then(() => {
      message.reply(`you have removed ${name} from your accounts`);
    })

  })
}