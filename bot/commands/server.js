module.exports = {
  name: "server",
  description: "Display some information about the server",
  guildOnly: true,
  execute(message, args){
    //message.channel.send(`This server's name is \`${message.guild.name}\`, has \`${message.guild.memberCount}\` members and is owned by \`${message.guild.owner.user.username}\`\nThe default notification level is \`${message.guild.defaultMessageNotifications}\`\nThe explicit content filter level is ${message.guild.explicitContentFilter}`);
    message.channel.send(`\`\`\`CSS\nThis server's name is '${message.guild.name}', has ${message.guild.memberCount} members and is owned by '${message.guild.owner.user.username}'. The default notification level is ${message.guild.defaultMessageNotifications} and the explicit content filter level is ${message.guild.explicitContentFilter}\`\`\``);
  },
};