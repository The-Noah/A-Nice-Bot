const {prefix} = require("../config.json");
const {website} = require("../package.json");

const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "A list of all available commands, or info about a specific command",
  aliases: ["commands"],
  usage: "[command]",
  execute(message, args){
    const {commands} = message.client;

    const embed = new Discord.RichEmbed()
      .setColor("#0099FF")
      .setTitle("Help")
      .setURL(website)
      .attachFile("./avatar.png")
      .setThumbnail("attachment://avatar.png")
      .setTimestamp();

    if(!args.length){
      embed.setDescription(`You can send \`${prefix}help [command]\` to get info on a specific command.`);

      commands.forEach(command => {
        embed.addField(command.name, `\`${prefix}${command.name} ${command.usage}\`\n${command.description}`);
      });

      return message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if(!command){
      return message.reply("That's not a valid command!");
    }

    embed.addField(`**${command.name}**`, command.description);

    if(command.aliases){
      embed.addField("Aliases", `\`${command.aliases.join(", ")}\``);
    }
    if(command.usage){
      embed.addField("Usage", `\`${prefix}${command.name} ${command.usage}\``);
    }

    embed.addField("Cooldown", `${command.cooldown || 3} seconds`);

    message.channel.send(embed);
  },
};