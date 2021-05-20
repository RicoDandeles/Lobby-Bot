var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
const fs  = require('fs');
const { writeFileSync } = require('fs');
const { rename }  = require('fs');
const { join } = require('path');
const cheerio = require('cheerio');
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
 
const Discord = require("discord.js");
const client = new Discord.Client();

// CHANGE THESE
const discordusername = 'Sign-Up Bot#3340'
const discordtoken = 'ODQ0NzA5NzA0MDkyMzUyNTQy.YKWXNw.3aWJ_MmCHLNvFFTjf6cldfhjzlQ'
const rules_channel = '844707488515620884';
const application_channel = '844707536514449428';
const consent_channel = '844707623537999893';
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const message = (844717846800891924);

client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name === "✅") {
        console.log(reaction.users);
    }
});
/*
message.awaitReactions(filter, { max: 1 })
    .then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === ':white_check_mark:') {
            user.roles.add("rules_verification");
            console.log("Role added to " + user);
        }
        else {
            console.log("No role added to " + user);
        }
    })
*/

client.login(discordtoken); 
