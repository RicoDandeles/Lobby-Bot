const express = require('express');
const app = express();
const createError = require('http-errors');
const PORT = process.env.PORT || 3000;
const { writeFileSync, unlinkSync } = require('fs');
const cheerio = require('cheerio');
const domain = process.env.NODE_ENV == 'production' ? 'https://botswana-brainly.herokuapp.com' : `http://localhost:${PORT}`;
const { join } = require('path');
const ms = require('ms');

app.use(express.json());
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

app.use('/assets', express.static(join( __dirname, 'assets')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

const fetch = require("node-fetch");

// CHANGE THESE
const discordusername = 'Brainly Bot#5119'
const discordtoken = 'NjY4NjEyNjAzNjY0MTM4MjYw.XiT0Ag.D2GYIQrYJYKPEV012kPwY_bR72A'
const serviceFree_channel = '840515343054667807';
const servicePaid_channel = '720117652432879717';
const serviceDomain = 'brainly';
//

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
  var messaged_channel = msg.channel.id;
  if (![serviceFree_channel, servicePaid_channel].includes(messaged_channel)) return;
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
            writeFileSync(`./assets/${final_link}`, $.html().toString().replace('/logo.png', 'https://i.imgur.com/9tL2f2C.jpg').replace('https://clusters.top/discord', 'https://discord.gg/XM35RczsuQ'));
            console.log('Process Finished');
            const embed = new MessageEmbed()
              .setColor(344703)
              .setTitle("Here is your requested page.")
              .setDescription(`Click [here](${domain}/assets/${final_link}) to view unlocked document!`);
            msg.author.send(embed);

            // delete the file after 30min
            setTimeout(() => {
              unlinkSync(`./assets/${final_link}`);
            }, ms('30m'));
        })
  };
  console.log('End');
});

function generateSerial() {
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
};

client.login(discordtoken);