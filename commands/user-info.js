module.exports = {
  name: "user-info",
  description: "Disply all tagged user's information, or your own",
  usage: "[@user ...]",
  execute(message, args){
    if(!message.mentions.users.size){
      return message.reply(`Your ID is ${message.author.id}`);
    }

    message.mentions.users.map(user => {
      message.channel.send(`${user.username}'s ID is ${user.id}`);
    });
  },
};