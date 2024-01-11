const Email = require("../../models/email");
const Item = require("../../models/item");
const Vendor = require("../../models/vendor");

module.exports = {
  create,
  getInbox,
  getArchived,
  getProcessed,
  detail,
  exportEmails,
  editEmail,
  deleteEmails,
  archiveEmails,
  returnToInbox,
  getItems,
  getVendors,
  addItem,
  updateItem,
  deleteItem,
};

async function create(req, res) {
  const email = await Email.create(req.body);
  res.json(email);
}

async function getInbox(req, res) {
  const emails = await Email.find({ TransactionStatus : "New"});
  res.json(emails);
}

async function getProcessed(req, res) {
  const emails = await Email.find({ TransactionStatus : "Processed"});
  res.json(emails);
}

async function getArchived(req, res) {
  const emails = await Email.find({ TransactionStatus : "Archived"});
  res.json(emails);
}

async function detail(req, res) {
  const email = await Email.findById(req.params.id);
  res.json(email);
}

async function exportEmails(req, res) {
  const updatedEmails = await Email.updateMany(
    { _id: { $in: req.body } },
    { $set: { TransactionStatus: "Processed" } }
  );
  res.redirect("/api/processing/inbox");
}

async function editEmail(req, res) {
  const updated = await Email.findOneAndReplace({_id: req.params.id}, req.body);
  res.json(updated);
}

async function deleteEmails(req, res) {
  const updatedEmails = await Email.updateMany(
    { _id: { $in: req.body } },
    { $set: { TransactionStatus: "Deleted" } }
  );
  const emails = await Email.find({ TransactionStatus: "New" });
  res.json(emails);
}

async function archiveEmails(req, res) {
  const updatedEmails = await Email.updateMany(
    { _id: { $in: req.body } },
    { $set: { TransactionStatus: "Archived" } }
  );
  res.redirect("/api/processing/inbox");
}

async function returnToInbox(req, res) {
  const updatedEmails = await Email.updateMany(
    { _id: { $in: req.body } },
    { $set: { TransactionStatus: "New" } }
  );
  res.redirect("/api/processing/inbox");
}


// Items
async function getItems(req, res) {
  const items = await Item.find({});
  res.json(items);
}

async function addItem(req, res) {
  const item = await Item.create(req.body);
  res.redirect("/api/catalogue/items");
}

async function updateItem(req, res) {
  const result = await Item.findByIdAndUpdate(req.params.id, req.body, {returnDocument: "after"});
  console.log("REZZY", result);
  const items = await Item.find({});
  res.json(items);
}

async function deleteItem(req, res) {
  const result = await Item.findByIdAndDelete(req.params.id);
  console.log("REZZY", result);
  const items = await Item.find({});
  res.json(items);
}


// Vendors
async function getVendors(req, res){
  const items = await Vendor.find({});
  res.json(items);
}