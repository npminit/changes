const config = require('../config')

exports.run = (client, group) => {
  client.settings.delete(group.id);
}