const fetch = require("node-fetch");

module.exports = {
  name: "cat",
  description: "Show a random cat photo",
  aliases: ["cat-photo", "cat-image", "meow", "kitten"],
  usage: "[@user ...]",
  cooldown: 5,
  execute(message, args){
    message.reply("Please wait...").then(msg => {
      fetch('https://aws.random.cat/meow').then(response => response.json()).then(body => {
        msg.delete();

        if(!message.mentions.users.size){
          return message.channel.send(body);
        }
    
        message.mentions.users.map(user => {
          user.send(`${message.author.username} has sent you a cat photo.`);
          user.send(body);
        });
      });
    })
  },
};