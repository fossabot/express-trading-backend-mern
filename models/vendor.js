const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    batchID: String,
    paymentTerms: String,
    discountRate: String,
    palletCharge: String,
    docType: String,
    ID: String,
    name: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vendor", vendorSchema);
