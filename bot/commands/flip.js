module.exports = {
  name: "flip",
  description: "Flip a coin, and it will land on either 'heads' or 'tails'",
  cooldown: 1,
  execute(message, args){
    message.channel.send(`It's ${Math.floor(Math.random() * 2) === 0 ? "heads" : "tails"}`);
  },
};