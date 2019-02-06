module.exports = {
  name: "user-info",
  description: "Disply all tagged user's information, or your own if no one is tagged",
  usage: "[@user ...]",
  execute(message, args){
    if(!message.mentions.users.size){
      return message.reply(`Your ID is ${user.id} and tag is ${user.tag}`);
    }

    message.mentions.users.map(user => {
      message.channel.send(`${user.username}'s ID is ${user.id} and tag is ${user.tag}`);
    });
  },
};