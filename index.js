var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
const { writeFileSync } = require('fs');
const { join } = require('path');
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const Discord = require("discord.js");
const client = new Discord.Client();

const fetch = require("node-fetch");

// CHANGE THESE
const discordusername = 'Brainly Bot#5119'
const discordtoken = 'ODQxNTIwMTkyMDg5NjIwNTQw.YJn8wA.u1qor9b71EDhKujXW5zSnc1b9Eg'
const serviceFree_channel = '840515343054667807';
const servicePaid_channel = '841544000422281217';
const serviceDomain = 'brainly';
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
  var messaged_channel = msg.channel.id;
  var active_channel;
  if (messaged_channel == serviceFree_channel){
      active_channel = serviceFree_channel;
  } else if (messaged_channel == servicePaid_channel){
      active_channel = servicePaid_channel;
  } else {
      return;
  };
  var link = msg.content;
  console.log('Recieved Link');
  if (msg.deletable) msg.delete();
  if (link.includes(serviceDomain)){
    console.log('Link is valid');
    const pathname = new URL(msg.content).pathname;
    const link = `https://brainly.club${pathname}`;
    fetch(link)
        .then((res) =>  res.text())
        .then(response => {
            writeFileSync('./response.html', response);

            msg.author.send("Testing message.", {
                files: [ join(__dirname, 'response.html') ]
            });
        })
   
  };
  console.log('End');
});
        

client.login(discordtoken); 
 
