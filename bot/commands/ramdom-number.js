module.exports = {
  name: "random-number",
  description: "Generator a random number between 1 and 10",
  cooldown: 1,
  execute(message, args){
    message.channel.send(`Your random number is ${Math.floor(Math.random() * 10) + 1}`);
  },
};