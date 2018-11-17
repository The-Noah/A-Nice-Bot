const http = require("http");
const fs = require("fs");

const port = 8080;

const avatarData = fs.readFileSync("../avatar.png");

http.createServer((req, res) => {
  let responseCode = 404;
  let contentType = "text/html";
  let content = "404 Error";

  console.log(`"${req.url}" requested`);

  if(req.url === "/"){
    responseCode = 200;
    content = fs.readFileSync("./index.html");
  }else if(req.url === "/avatar.png"){
    responseCode = 200;
    contentType = "image/png";
    content = avatarData;
  }

  res.writeHead(responseCode, {"content-type": `${contentType};charset=utf-8`});
  res.write(content);
  res.end();
}).listen(port);