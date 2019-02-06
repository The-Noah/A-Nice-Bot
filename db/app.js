const fs = require("fs");
const path = require("path");

const express = require("express");
const morgan = require("morgan");

const showdown = require("showdown");
const markdownConverter = new showdown.Converter();

// initialize express
const app = express();
app.use(morgan("dev"));

// middleware which is used for all requests
app.use((req, res, next) => {
  // add headers to the response
  res.header("Content-Type", "application/json");
  
  // make sure we go to the next routes and don't stop here
  next();
});

app.use("/guild/:guild", (req, res) => {
  const guildID = req.params.guild;

  fs.readFile(path.join(__dirname, "data", guildID + ".json"), "utf8", (err, content) => {
    res.status(200).json(JSON.parse(content));
  });
});

app.use("/", (req, res) => {
  res.header("Content-Type", "text/html");

  fs.readFile(path.join(__dirname, "README.md"), "utf8", (err, content) => {
    res.status(200).send(fs.readFileSync(path.join(__dirname, "readme.html"), "utf8") + markdownConverter.makeHtml(content) + "</div>");
  });
});

app.use((req, res, next) => {
  const error = new Error("Unknown request");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
});

module.exports = app;