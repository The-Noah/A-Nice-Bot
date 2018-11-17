const http = require("http");
const fs = require("fs");

const markdown = require("markdown").markdown; // markdown to HTML converter

const port = 8080;

// cache the avatar image so then we don't have to read it each time from the disk
const avatarData = fs.readFileSync("../avatar.png");

http.createServer((req, res) => {
  let responseCode = 404;
  let contentType = "text/html";
  let content = "404 Error";

  console.log(`"${req.url}" requested`);

  if(req.url === "/"){
    responseCode = 200;
    content = fs.readFileSync("./index.html").toString();
    content = content.replace(/{\$ readme \$}/gi, markdown.toHTML(fs.readFileSync("../README.md").toString()));
    content = content.replace(/{\$ style \$}/gi, fs.readFileSync("./style.min.css").toString());
  }else if(req.url === "/avatar.png"){
    responseCode = 200;
    contentType = "image/png";
    content = avatarData;
  }

  res.writeHead(responseCode, {"content-type": `${contentType};charset=utf-8`});
  res.write(content);
  res.end();
}).listen(port);