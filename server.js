"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");

var multer = require("multer");
var upload = multer({ dest: "./uploads" });

require("dotenv").config();

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

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

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file);
  res.json({
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    fileSize: `${req.file.size / 1000}KB`
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node.js listening ...");
});
