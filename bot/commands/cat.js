const fetch = require("node-fetch");

module.exports = {
  name: "cat",
  description: "Show a random cat photo. If you tag user(s), then it will send it to them",
  aliases: ["cat-photo", "cat-image", "meow", "kitten"],
  usage: "[@user ...]",
  cooldown: 5,
  execute(message, args){
    message.reply("Please wait...").then(msg => {
      fetch("https://aws.random.cat/meow").then(response => response.json()).then(body => {
        if(!message.mentions.users.size){
          msg.delete();
          return message.channel.send(body);
        }
        
        message.mentions.users.map(user => {
          msg.edit(`${message.author} you have sent a cat photo to ${user}`)
          user.send(`${message.author.username} has sent you a cat photo from ${message.guild.name}`, {file: body.file});
        });
      });
    })
  },
};