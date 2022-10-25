const { Client } = require('discord.js-selfbot-v13');
const { ActivityType } = require('discord.js');
const client = new Client({checkUpdate: false}); // All partials are loaded automatically
var ready = false;





function setStatus() {
    //get local time as a string
  var dateObj = new Date();
  //convert to 12 hour time
  function twelveHourTime(dateObj) {
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
    if (ready) {
      client.user.setActivity(`the time. It's ${twelveHourTime(dateObj)} for me.`, { type: ActivityType.Watching });
      console.log("Status Set.");
      
    }
}

client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);
    ready = true
    setStatus();
    client.user.setStatus('online');
})




setInterval(function(){setStatus()}, 30000);
setInterval(function(){client.user.setStatus('online');}, 100000);

client.login(process.env.DISCORD_TOKEN);