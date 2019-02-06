module.exports = {
  name: "ping",
  description: "Get my ping (latency)",
  cooldown: 5,
  execute(message, args){
    const now = Date.now();

    message.channel.send("Pong!").then(msg => {
      msg.edit(`Ping: ${Date.now() - now}ms`);
    });
  },
};