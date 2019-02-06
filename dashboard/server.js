const http = require("http");

const app = require("./app");

const port = process.env.PORT || 80;

// create the server
const server = http.createServer(app);

// start the server
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});