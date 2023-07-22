const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shayota:vx3GuCkh81trjxLr@eti.9gi7ab7.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

const Email = require("./models/email");

const vendors = [];
const emails = [];

function createVendor(vendorId) {
  if (vendors.some(v => v._id === vendorId)) return;
  const vendor = {
    _id: vendorId,
    name: `Imaginary Vendor #${Math.floor(Math.random() * 1000)}`,
  };
  vendors.push(vendor);
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getId() {
  return (
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  );
}

function createEmail(vendorId, date) {
  createVendor(vendorId);
  return {
    vendorID: Math.floor(Math.random() * 9000 + 1000).toString(),
    batchID: "IMPORT",
    date: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(randomDate(new Date(2022, 0, 1), new Date())),
    invoiceNumber: Math.floor(Math.random() * 90000 + 10000).toString(),
    poNumber: Math.floor(Math.random() * 90000 + 10000).toString(),
    siteID: "CA",
    amountDue: Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
    }).format(Math.floor(Math.random() * 90000 + 10000)),
    TransactionStatus: "New",
    lineItems: [
      {
        name: "Salsa Valentina Reedddyyyyy - 12/34oz (1 lt)",
        itemNumber: "74635",
        quantity: 1045,
        price: 18.25,
      },
      {
        name: "Top Ramen Noodles - 24/10oz",
        itemNumber: "23564",
        quantity: 736,
        price: 8.99,
      },
    ],
    gpPoNumber: "374856",
    dateReceived: "5/31/2023 7:07:20 PM",
    emailDocType: "Shipment Invoice",
    keyArray: [
      "https://s3.us-west-1.amazonaws.com/eti.attachments/9bfc7e29-8f15-44c4-b92a-3cb8c5728b0c.pdf",
      "https://s3.us-west-1.amazonaws.com/eti.attachments/6339a31c-29f4-4b59-8bdf-8dacbe156182.pdf",
      "https://s3.us-west-1.amazonaws.com/eti.attachments/391abc05-d6b8-4736-853a-a1adfcc59e13.pdf",
    ],
    glArray: [
      {
        distType: 1,
        accountNumber: "13000-10",
        debitAmt: 19071.25,
        creditAmt: 0,
      },
      {
        distType: 2,
        accountNumber: "13030-10",
        debitAmt: 19071.25,
        creditAmt: 0,
      },
    ],
  };
}

let i = 0;
let vendorId = getId();
let date = randomDate(new Date(2022, 0, 1), new Date());
while (i < 50) {
  if (!(i % 5)) {
    vendorId = getId();
    date = randomDate(new Date(2022, 0, 1), new Date());
  }
  emails.push(createEmail(vendorId, date));
  i++;
}

const start = async function () {
  await Email.deleteMany({});
  const result = await Email.create(emails);
  console.log(`${result} documents created successfully.`);
  mongoose.disconnect(); // Disconnect from MongoDB
};

start();