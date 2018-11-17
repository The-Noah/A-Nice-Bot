const {version, author, website, homepage} = require("../package.json");

module.exports = {
  name: "info",
  description: "See some info about the bot",
  aliases: ["status"],
  cooldown: 10,
  execute(message, args){
    const data = [];
    data.push(message.author);
    data.push("**Status**: Online");
    data.push(`**Bot**: A Nice Bot v${version}`);
    data.push(`**Author**: ${author}`);
    data.push(`**Website**: ${website}`);
    data.push(`**GitHub**: ${homepage}`);
    data.push("---------------------------");
    data.push(`**Name**: ${process.title}`);
    data.push(`**Platform**: ${process.platform}`);

    message.channel.send(data.join("\n"), {split: true});
  },
};