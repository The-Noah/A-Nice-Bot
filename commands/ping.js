module.exports = {
  name: "ping",
  description: "Ping me to see if I am awake",
  cooldown: 5,
  execute(message, args){
    message.channel.send("Pong!");
  },
};