const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const PubNub = require("pubnub");
const routes = require("./config/routes");
const appConfigDevelopment = require("../news-app-api/config/config.json")
  .development;

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/build")));

routes(app);

app.get(new RegExp("^((?!/api).)*$"), function(req, res) {
  res.sendFile(path.join(__dirname, "/public/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

process.pubNubInstace = new PubNub({
  subscribeKey: appConfigDevelopment.pubnubSubscribeKey,
  publishKey: appConfigDevelopment.pubnubPublishKey,
  secretKey: appConfigDevelopment.pubnubSecretKey,
  logVerbosity: true,
  ssl: true
});

module.exports = app;
