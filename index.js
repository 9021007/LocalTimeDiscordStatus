const { Client } = require('discord.js-selfbot-v13');
const { ActivityType } = require('discord.js');
var moment = require('moment-timezone');
const { trimEnd } = require('lodash');
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
    if (oldMessage.author.id === '347866765608484864' || oldMessage.author.id === '1039281251716182036' || oldMessage.author.id === '533872282393903105') {
        if(oldMessage.channel.type === 'DM') {
            time = moment().tz("America/Los_Angeles").format('LT')
            //send in a channel in a different server
            client.channels.cache.get('1049207307663323177').send(`**${oldMessage.author.username}** edited a message in **${oldMessage.channel.recipient.username}**'s DMs at **${time}**\n`)
            client.channels.cache.get('1049207307663323177').send(oldMessage.content)
            client.channels.cache.get('1049207307663323177').send(newMessage.content)
        }
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
    if (message.author.id === '347866765608484864' || message.author.id === '1039281251716182036' || message.author.id === '533872282393903105') {
        if(message.channel.type === 'DM') {
            time = moment().tz("America/Los_Angeles").format('LT')
            //send in a channel in a different server
            client.channels.cache.get('1049207307663323177').send(`**${message.author.username}** deleted a message in **${message.channel.recipient.username}**'s DMs at **${time}**\n`)
            client.channels.cache.get('1049207307663323177').send(message.content)
        }
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
  }
}
}, 1000);

client.login("TOKEN");