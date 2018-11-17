module.exports = {
  name: "server",
  description: "Display some information about the server",
  guildOnly: true,
  execute(message, args){
    message.reply(`This server's name is **${message.guild.name}**`);
  },
};