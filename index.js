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
    client.user.setStatus('idle');
})

//on message in dms from specific user, respond with message
client.on('messageCreate', async (message) => {
    if (message.author.id === '347866765608484864') {
      //if message is sent in dms
      if (message.channel.type === 'DM') {
        if(message.content.toLowerCase().includes("sorry")) { {
          //send random message from array
          array = ["https://cdn.discordapp.com/attachments/824483359035752458/1036443938065752144/boom.mp4",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036444015077371977/burning_jesse_at_the_stake.png",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036444093728952320/20220926_115731.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036444303100215387/Connection_terminated._Im_sorry_to_interrupt_you_Elizabeth_if_you_still_even_remember_that_name_But_Im_afraid_youve_been_misinformed._You_are_not_here_to_receive_a_gift_nor_have_you_been_called_here_by_the_individual_you.mp4",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036444511322255390/oh_no.mp4",
          "https://tenor.com/view/erenbabahz-gif-21819859",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036444864218406922/IMG_2692.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036444969336058027/sheesh_1.mp4",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036445103490871336/RDT_20220717_2146344630759117597760974.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036445110042361977/RDT_20220729_1941247786266997194666330.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036445163553300500/video0.mp4",
          "https://cdn.discordapp.com/attachments/824483359035752458/1036445199875969185/FIl8dd5VgAEdE0Y.png",
          "https://tenor.com/view/dog-cursed-gif-24217099",
          "https://cdn.discordapp.com/attachments/824483359035752458/1021645544461971536/unknown.png",
          "https://imgur.com/a/cyZRpRC",
          "https://media.discordapp.net/attachments/824483359035752458/1035970039603548200/RDT_20221029_0841491878426403762257348.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/1035311606730592267/image0.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/1035293674801737789/RDT_20221027_1029348876677618830871362.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/1035243782217678899/RDT_20221025_1032284346048310212196933.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/1034709499841368084/SmartSelect_20221019-075248_Instagram.jpg",
          "https://media.discordapp.net/attachments/403698615446536206/1007129995786850414/2EDE036E-1B35-4DDF-9C81-1BADDC1D8C23.gif",
          "https://tenor.com/view/dead-death-second-5seconds-gif-21467100",
          "https://cdn.discordapp.com/attachments/824483359035752458/1030355838222729256/RDT_20221012_1122141542740359821613983.jpg",
          "https://cdn.discordapp.com/attachments/824483359035752458/902763897273065532/video0.mp4"
        ]
          message.channel.send(array[Math.floor(Math.random() * array.length)])
        }
      }
    }
  }
})



setInterval(function() {
  var date = new Date();
  if ( date.getSeconds() === 0 || date.getSeconds() === 15 || date.getSeconds() === 30 || date.getSeconds() === 45) {
    setStatus();
  }
}, 1000);
setInterval(function(){client.user.setStatus('idle');}, 100000);

client.login("TOKEN");