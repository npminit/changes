const moment = require('moment');

exports.run = (client, message, args, clanTag) => {

  ClanStorage.getItem('stats', (err, stats) => {
    if (err) throw err;
    if (!stats) stats = { callsLogged: 0, warsLogged: 0 }
    var infoMessage = `${(clanTag) ? clanData[clanTag].name : ''}
    
    calls logged: ${stats.callsLogged}
    wars logged: ${stats.warsLogged}
  
   
    Been announcing coc wars since ${moment("2017-08-25T23:13:33-05:00").format("MMM Do YYYY")}
    `
  
    message.author.sendMessage(infoMessage);
  })

}