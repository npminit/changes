const config = require('../config')

exports.run = (client, group) => {
  client.settings.set(group.id, config.defaultClanSettings);
  group.sendMessage(config.joinMessage);
}