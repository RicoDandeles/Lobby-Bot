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
const { Client, Permissions } = require('discord.js');
const client = new Discord.Client();

// CHANGE THESE
const discordusername = 'Lobby Bot#3340'
const discordtoken = 'ODQ0NzA5NzA0MDkyMzUyNTQy.YKWXNw.3aWJ_MmCHLNvFFTjf6cldfhjzlQ'
const lobby_hub = '844708676182999080'
const serverId = '844644376826085426'
const command = '+lobby'
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
  var messaged_channel = msg.channel.id;
  var active_channel;
  if (messaged_channel == lobby_hub) active_channel = lobby_hub;
  else return;
  var input = msg.content;
  if (input.includes(command)){
    createPrivateChannel(serverId, 'lobby1 - '+ generateSerial(), msg)
  };
});


/** @param {string|number} serverId - a "snowflake" ID you can see in address bar */

async function createPrivateChannel(serverId, channelName, message) {
  const guild = await client.guilds.fetch(serverId);
  const everyoneRole = guild.roles.everyone;
  const channel = await guild.channels.create(channelName, 'lobby');
  await channel.overwritePermissions([
    {type: 'member', id: message.author.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
    {type: 'member', id: client.user.id, allow: [Permissions.FLAGS.VIEW_CHANNEL]},
    {type: 'member', id: client.user.id, allow: [Permissions.FLAGS.MANAGE_ROLES]},
    {type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL]},
  ]);
}

function generateSerial() {
    'use strict';
    var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        serialLength = 10,
        randomSerial = "",
        i,
        randomNumber;
    for (i = 0; i < serialLength; i = i + 1) {
        randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomSerial;
}
client.login(discordtoken); 
