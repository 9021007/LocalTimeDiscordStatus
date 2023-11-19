const { Client, ClientUser } = require('discord.js-selfbot-v13');
const { ActivityType } = require('discord.js');
var moment = require('moment-timezone');
const { trimEnd } = require('lodash');
const fetch = require('node-fetch');
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
})

//on edit
client.on('messageUpdate', async (oldMessage, newMessage) => {
  try{
    if(oldMessage.channel.type === 'DM') {
        time = moment().tz("America/Los_Angeles").format('LT')
        //send in a channel in a different server
        client.channels.cache.get('1049207307663323177').send(`**${oldMessage.author.username}** edited a message in **${oldMessage.channel.recipient.username}**'s DMs at **${time}**\n`)
        client.channels.cache.get('1049207307663323177').send(oldMessage.content)
        client.channels.cache.get('1049207307663323177').send(newMessage.content)
    }
  } catch (err) {
    console.log(oldMessage.content)
    console.log(newMessage.content)
    console.log(err)
  }
})


//on message delete
client.on('messageDelete', async (message) => {
  try{
    if(message.channel.type === 'DM') {
        time = moment().tz("America/Los_Angeles").format('LT')
        //send in a channel in a different server
        client.channels.cache.get('1049207307663323177').send(`**${message.author.username}** deleted a message in **${message.channel.recipient.username}**'s DMs at **${time}**\n`)
        client.channels.cache.get('1049207307663323177').send(message.content)
        }
  } catch (err) {
    console.log(message.content)
  }
})

//on message in dms from specific user, respond with message
client.on('messageCreate', async (message) => {
  //if message is not from bot
  if( message.author.bot) return;
    if (message.author.id === '347866765608484864' || message.author.id === '1039281251716182036' || message.author.id === '533872282393903105') {
      //if message is sent in dms
      if (message.channel.type === 'DM') {
        if(message.content.toLowerCase().includes("sorry") || message.content.toLowerCase().includes("apologies")) { {
          //get contents of json file
          var fs = require('fs');
          var obj = JSON.parse(fs.readFileSync('./shitpost.json', 'utf8'));
          array = obj["shitposts"]
          // console.log(array)
          message.channel.send(array[Math.floor(Math.random() * array.length)])
        }
      }
    }
  }
})



setInterval(function() {
  var date = new Date();
  // if ready
  if (ready) {
  if ( date.getSeconds() === 0 || date.getSeconds() === 15 || date.getSeconds() === 30 || date.getSeconds() === 45) {
    client.user.setStatus('online');
    setStatus();
    currentbio = client.user.bio
    if (currentbio.toLowerCase().includes("duolingo")) {
      // get streak from https://www.duolingo.com/2017-06-30/users?username=9021007xyz&fields=users{streakData{currentStreak{length}}}
      // {"users":[{"streakData":{"currentStreak":{"length":35}}}]}
      fetch('https://www.duolingo.com/2017-06-30/users?username=9021007xyz&fields=users{streakData{currentStreak{length}}}')
      .then(response => response.json())
      .then(data => {
        console.log(data.users[0].streakData.currentStreak.length)
        // split bio into lines
        var lines = currentbio.split('\n');
        // find line containing duolingo
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes("duolingo")) {
            // replace line with new streak
            lines[i] = "Duolingo Streak: " + data.users[0].streakData.currentStreak.length
          }
        }
        // join lines back together
        var newbio = lines.join('\n');
        // set bio
        if (newbio != currentbio) {
          client.user.edit({bio: newbio})
        }
      })
    }
  }
}
}, 1000);

client.login("TOKEN");