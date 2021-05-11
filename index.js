var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const Discord = require("discord.js");
const client = new Discord.Client();

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// CHANGE THESE
const discordusername = 'BOTNAME#0000'
const discordtoken = 'bot/user token'
const serviceFree_channel = '000000000000000000';
const servicePaid_channel = '000000000000000000';
const serviceDomain = 'http://www.WEBSITE.com';
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  var messaged_channel = msg.channel.id;
  if ((messaged_channel == serviceFree_channel) || (messaged_channel == servicePaid_channel)){ 
    var link = msg.content;
    console.log('Recieved Link');
    msg.delete();
    if (link.includes(serviceDomain)){
        link = link.replace("com", "club");
        puppeteer.launch({ headless: true }).then(async browser => {
            const page = await browser.newPage()
            await page.goto(link)
        });
    };
    else{
        return;
    };
  };
});
        
        
        

client.login(discordtoken); 
 
