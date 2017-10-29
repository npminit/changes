const funcs = require('../util/functions');

exports.run = (client, message, args, clanTag, groupConfig, userInfo) => {
  if (!clanTag) return message.reply('this chat isnt linked to a clan')
  if (!args[0]) return message.reply('please specify whether this is your main or mini');
  if (!args[1]) return message.reply('please specify a user tag');

  var type = args[0].toLowerCase();
  var tag = args[1].toUpperCase().replace(/O/g, '0');

  if (type !== 'main' && type !== 'mini') return message.reply('those are not valid account types');
  if (!tag.match(/^#[0289PYLQGRJCUV]+$/)) return message.reply('that is not a valid tag');

  if (!user) user = { accounts: { main: "", mini: [] } }

  funcs.getPlayer(tag, (userInfo) => {

    if (userInfo.clan && userInfo.clan.tag != clanTag) return message.reply('this chat isnt linked to the clan of the account you\'re trying to claim for')

    if (type == 'main') {
      user.accounts.main = { name: userInfo.name, tag: tag };
      if (userInfo.clan) {
        user.role = userInfo.role
        user.clan = userInfo.clan.tag
      }
    } else {
      user.accounts.mini.push({ name: userInfo.name, tag: tag });
    }

    Client.userData.set(message.author.id, user)
    message.reply(`you have added ${userInfo.name} as ${type == 'main' ? 'your main' : 'a mini'} account
    Clan:
    ${userInfo.clan.name}

    Role:
    ${userInfo.role}

    TownHallLvL:
    ${userInfo.townHallLevel}
    
    `);

  })

}