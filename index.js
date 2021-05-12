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

const fetch = require("node-fetch");
const { Octokit } = require('@octokit/rest');
const { Base64 } = require('js-base64');
const octokit = new Octokit({
  auth: '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',
});

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
  if (messaged_channel == serviceFree_channel) active_channel = serviceFree_channel;
  else if (messaged_channel == servicePaid_channel) active_channel = servicePaid_channel;
  else return;
  var link = msg.content;
  console.log('Recieved Link');
  if (msg.deletable) msg.delete();
  if (link.includes(serviceDomain)){
    console.log('Link is valid');
    const pathname = new URL(msg.content).pathname;
    const link = `https://brainly.club${pathname}`;
    var serial = generateSerial();
    console.log('Serial: ' + serial);
    var final_link = serial + '.html';
    fetch(link)
        .then((res) =>  res.text())
        .then(response => {
            const $ = cheerio.load(response);
            $('title').text('Homework Senpai');
            $('alert-link').attr('href', 'https://discord.gg/XM35RczsuQ');
            writeFileSync('./response.html', $.html().toString().replace('/logo.png', 'https://i.imgur.com/9tL2f2C.jpg'));
            fs.renameSync('response.html', final_link);
            githubUpload(final_link);
            console.log('Process Finished');
            msg.author.send({embed: {
                color: 3447003,
                title: "Here is your requested page.",
                fields: [
                    { name: "Link:", value: "https://ricodandeles.github.io/homework-senpai/homework-senpai/files/" + final_link, inline: true},
                ]
            }});
        })
  };
  console.log('End');
});

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

async function githubUpload(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    const fileOutput = Base64.encode(content);

    const { data } = await octokit.repos.createOrUpdateFileContents({
        owner: 'RicoDandeles',
        repo: 'homework-senpai',
        path: 'homework-senpai/files/' + filename,
        message: 'Added ' + filename,
        content: fileOutput,
        committer: {
            name: `RicoDandeles`,
            email: 'rtiklegaming@gmail.com',
        },
        author: {
            name: 'RicoDandeles',
            email: 'rtiklegaming@gmail.com',
        },
    });
};
client.login(discordtoken); 
