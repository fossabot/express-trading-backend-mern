const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://shayota:vx3GuCkh81trjxLr@eti.9gi7ab7.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

const Email = require("./models/email");

const start = async function() {
  const result = await Email.updateMany({}, { $set: { TransactionStatus: "New" } })
  console.log(`${result.modifiedCount} documents updated successfully.`);
  mongoose.disconnect(); // Disconnect from MongoDB
}

start();