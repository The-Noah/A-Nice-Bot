const {prefix, name, db, token} = require("./config.json");

const fs = require("fs");

const fetch = require("node-fetch");

const Discord = require("discord.js");
const client = new Discord.Client();

const cooldowns = new Discord.Collection();

process.title = name;

// display information
console.log(`Process Title: ${process.title}`);
console.log(`Platform: ${process.platform}`);
console.log(`PID: ${process.pid}`);

// load all commands
client.commands = new Discord.Collection();
for(const file of fs.readdirSync("./commands").filter(file => file.endsWith(".js"))){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// ready
client.on("ready", () => {
  // set stuff
  client.user.setUsername(name);
  //client.user.setAvatar(avatar).catch(err => console.error(err));
  client.user.setStatus("online");
  client.user.setActivity(`!help`, {type: "LISTENING"});

  console.log("Ready");
});

// when a user joins a server
/*client.on("guildMemberAdd", member => {
  member.guild.channels.get(welcomeChannel).send(`@everyone Welcome ${member.user}!`);
});

// when a user leaves a server
client.on("guildMemberRemove", member => {
  member.guild.channels.get(welcomeChannel).send(`Goodbye, ${member.user} :sob:`);
}); */

// on message received
client.on("message", async (message) => {
  const prefixRegex = new RegExp(`^<@!?${client.user.id}>`);
  if(prefixRegex.test(message.content)){
    console.log(message.content);
    return message.reply(`My prefix is \`${prefix}\`. For help, send \`${prefix}help\``);
  }

  if(!message.content.startsWith(prefix) || message.author.bot){
    return;
  }
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLocaleLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if(!command){
    return message.reply(`I don't know what the command \`${commandName}\` is supposed to do :(`);
  }

  fetch(`${db}/guild/${message.guild.id}`).then(response => response.json()).then(body => {
    console.log(`Got command "${commandName}" with args "${args.join(", ")}" from: '${message.author.tag}' on '${message.guild.name}' (${message.guild.id})`);

    if(body.commandRestrictions && body.commandRestrictions.length > 0){
      const restriction = body.commandRestrictions.find(restriction => restriction.command === commandName);

      if(restriction && restriction.type){
        if(restriction.type === "disabled"){
          console.log(`Command ${commandName} is disabled`);
          return message.channel.send(`The \`${commandName}\` command is disabled`);
        }else if(restriction.type === "role"){
          /*for(const validRole in restriction.roles){
            if(!message.member.roles.find(role => role.name === validRole)){
              console.log(`Sender does not have role required to execute ${commandName}`);
              return message.reply(`You don't have to required role to execute that command`);
            }
          }*/
          if(!restriction.roles.some(validRole => message.member.roles.find(role => role.name === validRole))){
            console.log(`Sender does not have role required to execute ${commandName}`);
            return message.reply(`You don't have to required role to execute that command`);
          }
        }
      }
    }

    if(command.guildOnly && message.channel.type !== "text"){
      return message.reply("I can't execute that command inside DMs!");
    }

    if(command.args && !args.length){
      let reply = "You didn't provide any arguments!";

      if(command.usage){
        reply += `\nThe proper usage is \`${prefix}${command.name} ${command.usage}\``;
      }

      return message.reply(reply);
    }

    if(!cooldowns.has(command.name)){
      cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if(timestamps.has(message.author.id)){
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if(now < expirationTime){
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command`);
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try{
      command.execute(message, args);
    }catch(err){
      console.error(err);
      message.reply("There was an error trying to execute that command!");
      message.channel.send(`Error: \`${err.message}\``, message.author);
    }
  });
});

function exitHandler(options, exitCode){
  console.log(`Exit code: ${exitCode}`);
  client.user.setStatus("invisible");
  client.user.setActivity("Offline");

  client.destroy();

  process.exit();
}

["beforeExit", "disconnect", "exit", "message", "uncaughtException", "unhandledRejection", "SIGINT", "SIGTERM", "SIGUSR1", "SIGUSR2", "SIGHUP", "SIGBREAK"].forEach((eventType) => {
  process.on(eventType, exitHandler.bind(null, {exit: true}));
});

client.login(token);