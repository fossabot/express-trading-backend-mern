const Email = require("../../models/email");

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
  res.redirect("/api/emails/inbox");
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
  res.redirect("/api/emails/inbox");
}

