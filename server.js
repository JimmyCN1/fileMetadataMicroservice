"use strict";

var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
require("dotenv").config();

// require and use "multer"...

var app = express();

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   // we're connected!
// });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
