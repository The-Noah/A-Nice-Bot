const {name} = require("../config.json");
const {version, author, website, homepage} = require("../package.json");

const Discord = require("discord.js");

module.exports = {
  name: "info",
  description: "See some info about me",
  aliases: ["status"],
  cooldown: 10,
  execute(message, args){
    console.log(`${website}avatar.png`);
    const embed = new Discord.RichEmbed()
      .setColor("#0099FF")
      .setTitle("Info")
      .setURL(website)
      .setAuthor(author, "", homepage)
      .setDescription("**ONLINE**")
      .attachFile("./avatar.png")
      .setThumbnail("attachment://avatar.png")
      .addField("Bot", `${name} v${version}`)
      .addField("Platform", process.platform)
      .setTimestamp()
      .setFooter("Origonal bot created by Bongo", "");
    
    message.channel.send(embed);
  },
};
