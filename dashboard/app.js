const path = require("path");

const express = require("express");
const morgan = require("morgan");

// initialize express
const app = express();
app.use(morgan("dev"));
//app.set('trust proxy', true);

// setup the main router
//const router = express.Router();

// middleware which is used for all requests
/*router.use((req, res, next) => {
  // add headers to the response
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // make sure we go to the next routes and don't stop here
  next();
});*/

//router.use(express.static("public"));

//app.use("/", router);
app.use(express.static(path.join(__dirname, "public")));

/*app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});*/

/*app.use((req, res, next) => {
  const error = new Error("Unknown request");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.header("Content-Type", "application/json");
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  })
});*/

module.exports = app;