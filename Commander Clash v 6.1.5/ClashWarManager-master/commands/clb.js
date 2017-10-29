xports.run = (client, message, args) => {
  ClanStorage.getItem('callsLeaderBoard', (err, CLB) => {
    if (err) throw err;

    if (!CLB) return message.reply('theres no data yet')
    CLB = JSON.parse(CLB)

    var leaderBoard = Object.keys(CLB).map((clan) => {
      return CLB[clan];
    })

    leaderBoard.sort((clan1, clan2) =>  clan2.calls-clan1.calls);

    var leaderBoardMessage = 'Call Leader Board\n'
    leaderBoard.forEach((clan, index) => {
      leaderBoardMessage += `${index + 1}. ${clan.name}: ${clan.calls}\n`
    })

    message.reply(leaderBoardMessage)

  })
}