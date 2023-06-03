const express = require('express');
const router = express.Router();
const emailsCtrl = require('../../controllers/api/emails');

// GET - '/api/emails'
router.get('/', emailsCtrl.getAll);

// GET - '/api/emails/:id'
router.get('/:id', emailsCtrl.detail);

// POST - '/api/emails'
router.post('/', emailsCtrl.create);


module.exports = router;