const mongoose = require('mongoose');
const Item = require("./models/item");
const Vendor = require("./models/vendor");
const TEST_URL = "mongodb+srv://shayota:vx3GuCkh81trjxLr@eti.9gi7ab7.mongodb.net/test?retryWrites=true&w=majority";
const items = require("./items.json");
const vendors = require("./vendors.json");

mongoose.connect(TEST_URL);

let db = mongoose.connection;

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

const createItems = async function() {
  await Item.deleteMany({});
  const newItems = await Item.create(items);
  // const newVendors = await Vendor.create(vendors);
  console.log(newItems);
  mongoose.disconnect();
}

createItems()
