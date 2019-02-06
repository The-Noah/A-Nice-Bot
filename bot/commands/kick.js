const {name} = require("../config.json");

module.exports = {
  name: "kick",
  description: "Kick the tagged `user` for `reason`",
  args: true,
  usage: "@user reason",
  guildOnly: true,
  execute(message, args){
    if(!args.length || args.length < 2){
      return message.reply("You must @tag a user and give a reason");
    }

    if(!message.member.hasPermission("KICK_MEMBERS")){
      return message.reply("It doesn't look like you have permission to execute that command");
    }

    const targetUser = message.mentions.users.first();

    if(!targetUser){
      return message.reply("You must @tag a user");
    }

    if(`<@${targetUser.id}>` !== args[0]){
      return message.reply("The first argument must be a tagged user");
    }

    if(targetUser.username === name){
      return message.reply("You can't make me kick myself!");
    }

    const reason = args.slice(1).join(" ");

    message.guild.member(targetUser).kick(reason).then(() => {
      message.channel.send(`${targetUser.username} has been kicked by ${message.author} for \`${reason}\``);
      targetUser.send(`You have been kicked from ${message.guild.name} by ${message.author.tag} for \`${reason}\``)
    }).catch(err => {
      console.error(err);
      message.reply(`There was an error while kicking ${targetUser}`);
    });
  },
};