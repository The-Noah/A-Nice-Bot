const {name, db} = require("../config");

const fetch = require("node-fetch");

module.exports = {
  name: "role",
  description: "`list` the available roles, `add` or `remove` yourself from `role`",
  usage: "add|remove|list [role]",
  guildOnly: true,
  execute(message, args){
    if(!args.length || args.length < 1){
      return message.channel.send("You must provide at least 1 argument");
    }

    fetch(`${db}/guild/${message.guild.id}`).then(response => response.json()).then(body => {
      let roles;

      if(body.roles){
        roles = body.roles;
      }else{
        return message.send("No roles setup");
      }

      if(args[0] === "list"){
        return message.channel.send(`Available roles: \`${roles.join(", ")}\``);
      }
  
      if((args[0] !== "add" && args[0] !== "remove") || args.length < 2){
        return message.channel.send("Invalid usage");
      }
  
      if(!roles.find(role => role === args[1])){
        return message.reply("Invalid role");
      }
  
      const role = message.guild.roles.find(role => role.name === args[1]);
  
      if(role == null){
        return message.channel.send("Role not found");
      }
  
      //const member = message.guild.members.find(member => member.user === message.author);
  
      //if(!message.client.guild.me.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")){
      if(!message.guild.members.find(member => member.user.username === name).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")){
        return message.channel.send("Looks like I don't have permission to manage roles");
      }
  
      if(args[0] === "add"){
        message.member.addRole(role).catch(err => {
          console.error(err);
          return message.channel.send("Whoops, nevermind. Looks like there was an error");
        });
  
        message.reply(`You have joined ${args[1]}!`)
      }else if(args[0] === "remove"){
        message.member.removeRole(role).catch(err => {
          console.error(err);
          return message.channel.send("Whoops, nevermind. Looks like there was an error");
        });
  
        message.reply(`You have left ${args[1]} :(`);
      }
    });
  }
};