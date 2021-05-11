var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const Discord = require("discord.js");
const client = new Discord.Client();

const discordusername = 'BOTNAME#0000'
const discordtoken = 'bot/user token'

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  var serviceFree_channel = '000000000000000000';
  var servicePaid_channel = '000000000000000000';
  var serviceDomain = 'http://www.WEBSITE.com';
  var messaged_channel = msg.channel.id;
  if ((messaged_channel == serviceFree_channel) || (messaged_channel == servicePaid_channel)){ 
    var message = msg.content;
    console.log('Recieved Link');
    msg.delete();
    if (message.includes(serviceDomain)){
        
    };
    else{
        return;
    };
  };
});
        
        
        

client.login(discordtoken); 
 
