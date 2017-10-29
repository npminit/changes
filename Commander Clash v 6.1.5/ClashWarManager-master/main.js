const Line = require('line.js');
const fs = require('fs');
const config = require('./config');

global.Client = new Line.Client({
  channelAccessToken: config.line.channelAccessToken, 
  channelSecret: config.line.channelSecret, 
  port: config.line.port 
});

const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');

Client.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) });
Client.userData = new Enmap({ provider: new EnmapLevel({ name: 'userData' }) });

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    Client.on(eventName, (...args) => eventFunction.run(Client, ...args));
  });
});

Client.on("message", (message) => {

  if (!message.group) return message.reply("Not a valid group");

  // load the grops settings
  const groupConfig = Client.settings.get(message.group.id);

  if (message.content.indexOf(groupConfig.prefix) !== 0) return;

  const clan = checkClan(message.group.id);
  const userInfo = Client.userData.get(message.author.id)

  // This is the best way to define args. Trust me.
  const args = message.content.slice(groupConfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(Client, message, args, (clan) ? clan : null, groupConfig, userInfo);
  } catch (err) {
    console.log(err);
  }
});

var ready = require('./events/ready');

const http = require('http');
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

ready.run(Client);