const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://shayota:vx3GuCkh81trjxLr@eti.9gi7ab7.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

const Email = require("./models/email");
const Item = require("./models/item");
const Vendor = require("./models/vendor");

const start = async function() {
  const result = await Email.updateMany({}, { $set: { TransactionStatus: "New" } })
  console.log(`${result.modifiedCount} documents updated successfully.`);
  mongoose.disconnect(); // Disconnect from MongoDB
}

const resetIDs = async function() {
  const emails = await Email.find({});

  const noIDS = emails.map(email => {
    const {_id, ...rest} = email;
    const {_doc} = rest;
    delete _doc._id;
    return _doc;
  });

  await Email.deleteMany({});

  const result = await Email.create(noIDS);
  console.log(result);
  mongoose.disconnect(); // Disconnect from MongoDB
}

const updateDates = async function() {
  const emails = await Email.find({});

  const dates = emails.map(email => {
    email.date = new Date(email.date);
    return email;
  })

  console.log(dates);

}

updateDates();
// start();
// resetIDs();




