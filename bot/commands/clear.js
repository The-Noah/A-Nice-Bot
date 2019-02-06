module.exports = {
  name: "clear",
  description: "Clear past `message-count` messages",
  aliases: ["delete", "prune"],
  usage: "message-count",
  guildOnly: true,
  execute(message, args){
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
      return message.reply("It doesn't look like you have permission to execute that command");
    }

    const amount = parseInt(args[0]) + 1;

    if(isNaN(amount)){
      return message.reply("That doesn't seem to be a valid number");
    }else if(amount <= 1 || amount > 100){
      return message.reply("You need to input a number between 1 and 100");
    }

    message.channel.bulkDelete(amount, true).catch(err => {
      console.error(err);
      message.reply(`There was an error trying to clear messages in this channel! Error: \`${err.message}\``);
    });
  },
};