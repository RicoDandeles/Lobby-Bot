const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const Discord = require("discord.js");
const client = new Discord.Client();

const discordusername = '@emoboy'
const discordtoken = 'NDg3MzczOTgyMjc4ODc3MTk5.YIrx9g.0SZrtmOAV9Ewe5QQ1wmpqHynFY4'

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on("message", msg => {
  var d8_channel = '840849015461380099';
  var wdf_channel = '840515343054667807';
  var wdp_channel = '840515498327277578';
  var html_channel = '840777849496403978';
  var botspam_channel = '840777690838859798';
  var messaged_channel = msg.channel.id;
  if (((messaged_channel == wdf_channel) || (messaged_channel == wdp_channel)) || (messaged_channel == botspam_channel)){ // Copy message to d8 channel and delete original
    var message = msg.content;
    console.log('Recieved Link').listen(process.env.PORT);
    msg.delete();
    client.channels.cache.get(d8_channel).send(msg.content);
    console.log('Sent Link');
    setTimeout(() => { console.log("Wait for Developer-8 Bot"); }, 500);
    client.on("message", msg => {
      messaged_channel = msg.channel.id;
      if (messaged_channel == d8_channel){                                       // Copy message from d8 channel and send to html channel
        message = msg.content;
        var titleEmbed = '';
        var fieldsEmbed = '[object]';
        msg.embeds.forEach((embed) => {
          console.log("Scanning Embeds");
          titleEmbed = embed.title;
          if (titleEmbed == 'Success emoboy#0502'){
            console.log(titleEmbed);
            fieldsEmbed = embed.fields[1];
            if (typeof fieldsEmbed !== 'undefined'){
              console.log(fieldsEmbed[Object.keys(fieldsEmbed)[0]]);
              client.channels.cache.get(html_channel).send(fieldsEmbed[Object.keys(fieldsEmbed)[0]]);
              console.log('Returned Description of Embed');
            }
          }
        });
      }
    });
  }
  message = '';
});


client.login(discordtoken); 
 
