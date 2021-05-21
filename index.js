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
const lobby_category = '845071627515592714'
const serverId = '844644376826085426'
const guild = client.channels.cache.get("844644376826085426");
//

/*
// To create a cipher
const encode_channel = cipher('iSmokeCrack')
const decode_channel = decipher('iSmokeCrack')
//Then cipher any text:
encode_channel('the secret string')
myDecipher("7c606d287b6d6b7a6d7c287b7c7a61666f")
*/

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Client ID: `+client.user.id)
});

client.on("message", async msg => {
  const encode_channel = cipher('iSmokeCrack')
  const decode_channel = decipher('iSmokeCrack')
  var messaged_channel = msg.channel.id;
  var active_channel;
  if (messaged_channel == lobby_hub) active_channel = lobby_hub;
  else return;
  var input = msg.content; // filter special characters
  input = input.split(" ").join("").split("`").join("").split("~").join("").split("/").join("").split("\\").join("").split("*").join("").split("^").join("").split("%").join("").split("$").join("").split("@").join("").split("#").join("").split("_").join("").split("+").join("").split("=").join("").split(";").join("").split(":").join("").split("'").join("").split("\"").join("").split("?").join("").split("!").join("").split(",").join("").split(".").join("").split("<").join("").split(">").join("").split("(").join("").split(")").join("").split("{").join("").split("}").join("").split("[").join("").split("]").join("");
  console.log(input);
  if (input.includes('lobby')){
    input = input.split("lobby").join("")
    input = truncate(input, 16);
    if (input === "") {
        input = msg.author.username;
    };
    var channel_name = ('lobby-'+input).split(" ").join("-");
    var encoded_room_name = encode_channel(channel_name);
    console.log('Encoded Room Code ' + encoded_room_name);
    if(msg.member.roles.cache.find(r => r.name === "Lobby Host")) {
        msg.author.send({embed: {
                color: 15158332,
                title: "An error has occured.",
                fields: [
                    { name: "Error:", value: "You can't host play two games at once! We plan to allow users to host more lobbies in the future. If you believe you are at this page in an error, please contact admins.", inline: true},
                ]
        }});
    }
    else {
        createPrivateChannel(serverId, channel_name, msg));
        msg.author.send({embed: {
                color: 3066993,
                title: "Success.",
                fields: [
                    { name: "How to close your channel:", value: "When you are done, you may close a channel with `-close "+ encoded_room_name +"`.", inline: true},
                ]
        }});
    }
    
  }
  else if (input.includes('-close')){
    input = input.split("-close").join("")
    var decoded_room_name = decode_channel(input);
    console.log('Decoded Room Code ' + decoded_room_name);
    const closed_channel = msg.guild.channels.cache.find(r => r.name === `${decoded_room_name}`);
    closed_channel.delete()
  }
  else return;
});


/** @param {string|number} serverId - a "snowflake" ID you can see in address bar */

async function createPrivateChannel(serverId, channelName, message) {
  const guild = await client.guilds.fetch(serverId);
  const everyoneRole = guild.roles.everyone;
  const staffRole = guild.roles.Owner;
  const channel = await guild.channels.create(channelName, 'lobby')
  await channel.setParent(lobby_category);
  await channel.overwritePermissions([
    {type: 'member', id: message.author.id, allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_ROLES]},
    {type: 'role', id: everyoneRole.id, deny: [Permissions.FLAGS.VIEW_CHANNEL]},
  ]);
  channel.send('+start');
  return;
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

function truncate(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}

const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}

client.login(discordtoken); 
