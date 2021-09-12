const mongoose = require("mongoose");
const { urlDb } = require("../config");

mongoose.connect(urlDb, {
  useNewUrlParser: true, // <-- no longer necessary
  useUnifiedTopology: true, // <-- no longer necessary
});

const db = mongoose.connection;

module.exports = db;
