const express = require("express");
const router = express.Router();
const emailsCtrl = require("../../controllers/api/emails");

// ITEMS //
// GET - '/api/catalogue/items'
router.get("/items", emailsCtrl.getItems);

// PUT - '/api/catalogue/items/:id'
router.put("/items/:id", emailsCtrl.updateItem);

// POST = 'api/catalogue/items'
router.post("/items", emailsCtrl.addItem);

// DELETE = 'api/catalogue/items/:id'
router.delete("/items/:id", emailsCtrl.deleteItem);


// VENDORS //
// GET - '/api/catalogue/vendors'
router.get("/vendors", emailsCtrl.getVendors);

module.exports = router;
