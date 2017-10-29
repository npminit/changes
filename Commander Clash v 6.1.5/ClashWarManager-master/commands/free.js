
exports.run = (client, message, args, clanTag) => {
  
  if (!clanTag) return message.reply('claim a clan first')

  Storage.getItem(`${clanData[clanTag].warId}warCalls`, (err, warCalls) => {
    if (err) throw err;
    Storage.getItem(`${clanData[clanTag].warId}warAttacks`, (err, warAtt) => {
      if (err) throw err;

      let listInfo = ""
      
      warCalls.forEach((call, index) => {
        var callInfo = call.split('//')
        if (index == 0) {
    
        } else if (callInfo[0] === "empty") {
          if (warAtt[index] !== "empty") {
    
            var args = warAtt[index].split(" ");
            var stars = args[0];
            var percent = args[1];
    
            var starMsg = '';
    
            if (stars == 1) {
              starMsg += '??';
            } else if (stars == 2) {
              starMsg += '????'
            } else {
              starMsg += ''
            }
    
            listInfo += `${index}. ${starMsg} ${percent}%\n`
          } else {
            listInfo += `${index}.\n`
          }
        }
      })
    
      message.reply(listInfo)

    });
  });

}

exports.description = 'check which bases arent called "free"'