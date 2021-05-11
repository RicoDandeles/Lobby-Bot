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
const discordusername = 'Brainly Bot#5119'
const discordtoken = 'ODQxNTIwMTkyMDg5NjIwNTQw.YJn8wA.u1qor9b71EDhKujXW5zSnc1b9Eg'
const serviceFree_channel = '840515343054667807';
const servicePaid_channel = '841544000422281217';
const serviceDomain = 'http://www.brainly.com';
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
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
  msg.delete();
  if (link.includes(serviceDomain)){
    console.log('Link is valid');
    link = link.replace("com", "club");
    puppeteer.launch({ headless: true }).then(async browser => {
        const page = await browser.newPage()
        await page.goto(link)
        console.log('At webpage');
        document.getElementById('download').click();
        fs.writeFile("/tmp/download.html", link, function(err) {
            console.log('Saving File');
            if(err) {
                console.log(err);
                return;
            }
        console.log("The file was saved!");
        }); 
    });
    console.log('Returning File');
    client.channels.cache.get(active_channel).send("Testing message.", {
      files: [ "./tmp/download.html" ]
    });
  };
  console.log('End');
});
        
        
        

client.login(discordtoken); 
 
