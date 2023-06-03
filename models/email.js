const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  name: String,
  itemNumber: String,
  quantity: Number,
  price: Number,
});

const glSchema = new Schema({
  distType: Number,
  accountNumber: String,
  debitAmt: Number,
  creditAmt: Number,
});

const emailSchema = new Schema(
  {
    vendorID: String,
    batchID: String,
    date: String,
    invoiceNumber: String,
    poNumber: String,
    siteID: String,
    amountDue: String,
    TransactionStatus: String,
    lineItems: [lineItemSchema],
    gpPoNumber: String,
    dateReceived: String,
    emailDocType: String,
    keyArray: [String],
    glArray: [glSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Email", emailSchema);
