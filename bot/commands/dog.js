const fetch = require("node-fetch");

module.exports = {
  name: "dog",
  description: "Show a random dog photo. If you tag user(s), then it will send it to them",
  usage: "[@user ...]",
  cooldown: 5,
  execute(message, args){
    message.reply("Please wait...").then(msg => {
      fetch("https://dog.ceo/api/breeds/image/random").then(response => response.json()).then(body => {
        if(!message.mentions.users.size){
          msg.delete();
          return message.channel.send({file: body.message});
        }
        
        message.mentions.users.map(user => {
          msg.edit(`${message.author} you have sent a dog photo to ${user}`)
          user.send(`${message.author.username} has sent you a dog photo from ${message.guild.name}`, {file: body.message});
        });
      });
    })
  },
};