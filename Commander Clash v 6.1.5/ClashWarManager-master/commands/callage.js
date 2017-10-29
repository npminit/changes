const moment = require('moment');

exports.run = (client, message, args, clanTag) => {

  if (!clanTag) return message.reply('there is no clan linked to this chat please us claim');
  if (!args[0]) return message.reply('please specify a spot to check age');

  var number = args[0]

  Storage.getItem(clanData[clanTag].warId, (err, warData) => {
    if (err) throw err;

    // Check if there is any war data saved
    if (!warData) return message.reply('there is no war data');
    // Check if there is actually a war going on
    if (warData.stats.state == 'warEnded' || warData.stats.state == 'notInWar') return message.reply('There is no war to be checking calls');

    if (number < 1 || number > warData.stats.opponent.memberCount) return message.reply(`calls are between 1 and ${warData.stats.opponent.memberCount}`);

    Storage.getItem(`${clanData[clanTag].warId}warCalls`, (err, warCalls) => {
      if (err) throw err;

      var call = warCalls[number].split('//');

      if (call[0] == 'hide') return message.reply('this spot is 3 starred');
      
      var callMessage = `That call was made ${moment(call[2]).fromNow()}`

      message.reply(callMessage)

    })
  })

}

exports.description = 'call bases for war "callage 22"'