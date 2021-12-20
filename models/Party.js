const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PartySchema = new Schema({
  title: String,
});

module.exports = mongoose.model("Party", PartySchema);
