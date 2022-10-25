const { Client } = require('discord.js-selfbot-v13');
const { ActivityType } = require('discord.js');
var moment = require('moment-timezone');
const client = new Client({checkUpdate: false}); // All partials are loaded automatically
var ready = false;





function setStatus() {
    //EDIT THIS TO YOUR OWN TIMEZONE
    time = moment().tz("America/Los_Angeles").format('LT')
  
    if (ready) {
      client.user.setActivity(`the time. It's ${time} for me.`, { type: ActivityType.Watching });
      console.log("Status Set.");
      
    }
}

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
    ready = true
    setStatus();
    client.user.setStatus('online');
})




setInterval(function() {
  var date = new Date();
  if ( date.getSeconds() === 0 || date.getSeconds() === 15 || date.getSeconds() === 30 || date.getSeconds() === 45) {
    setStatus();
  }
}, 1000);
setInterval(function(){client.user.setStatus('online');}, 100000);

client.login(process.env.DISCORD_TOKEN);