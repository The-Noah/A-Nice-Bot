module.exports = {
  name: "args-info",
  description: "Display all of the arguments given",
  args: true,
  usage: "<args>",
  execute(message, args){
    message.reply(`Arguments: \`${args.join(", ")}\``);
  },
};