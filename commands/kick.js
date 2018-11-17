const {name} = require("../config.json");

module.exports = {
  name: "kick",
  description: "Kick the tagged user",
  args: true,
  usage: "<@user>",
  guildOnly: true,
  execute(message, args){
    if(!message.member.hasPermission("KICK_MEMBERS")){
      return message.reply("It doesn't look like you have permission to execute that command");
    }

    const taggedUser = message.mentions.users.first();

    if(taggedUser.username === name){
      return message.reply("You can't make me kick myself!");
    }

    message.mentions.members.first().kick().catch(err => {
      console.error(err);
      return message.reply(`There was an error while kicking ${taggedUser.username}. Error: \`${err.message}\``);
    });
    
    message.reply(`You have kicked ${taggedUser.username}`);
  },
};