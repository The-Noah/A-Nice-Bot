module.exports = {
  name: "quit",
  description: "Make me quit my job :(",
  aliases: ["shutdown", "exit"],
  execute(message, args){
    if(!message.member.hasPermission("MANAGE_GUILD")){
      return message.reply("It doesn't look like you have permission to execute that command");
    }

    message.channel.send("Goodbye cruel world! :sob:").then(sentMessage => {
      sentMessage.react("😭");
    });

    setTimeout(() => process.exit(), 2000);
  },
};