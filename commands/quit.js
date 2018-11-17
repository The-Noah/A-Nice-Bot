module.exports = {
  name: "quit",
  description: "Make me quit my job :(",
  aliases: ["shutdown", "exit"],
  execute(message, args){
    message.channel.send("Goodbye cruel world! :sob:").then(sentMessage => {
      sentMessage.react("😭");
      //message.client.user.setActivity("Offline");
    });

    setTimeout(() => process.exit(), 2000);
  },
};