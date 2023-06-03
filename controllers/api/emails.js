const Email = require("../../models/email");

module.exports = {
  create,
  getAll,
  detail
};

async function create(req, res) {
  const email = await Email.create(req.body);
  res.json(email);
}

async function getAll(req, res) {
  const emails = await Email.find({});
  res.json(emails);
}

async function detail(req, res) {
  const email = await Email.findById(req.params.id);
  res.json(email);
}