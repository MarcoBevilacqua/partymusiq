var Mongoose = require("mongoose");

//load database
Mongoose.connect("mongodb://mongodb:27017/partymusiq");
var db = Mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function callback() {
  console.log("Connection with database succeeded.");
});

exports.db = db;
