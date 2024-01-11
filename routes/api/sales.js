const express = require('express');
const router = express.Router();
const emailsCtrl = require('../../controllers/api/emails');

// GET - '/api/sales/inbox'
router.get('/inbox', emailsCtrl.getInbox);

// GET - '/api/sales/processed'
router.get('/processed', emailsCtrl.getProcessed);

// GET - '/api/sales/archived'
router.get('/archived', emailsCtrl.getArchived);

// GET - '/api/sales/:id'
router.get('/:id', emailsCtrl.detail);

// POST - '/api/emails'
router.post('/', emailsCtrl.create);

// POST - '/api/sales/export'
router.post('/export', emailsCtrl.exportEmails);

// PUT - '/api/sales/:id'
router.put('/:id', emailsCtrl.editEmail);

// POST - '/api/sales/archive'
router.post('/archive', emailsCtrl.archiveEmails);

// DELETE - '/api/sales/delete'
router.delete('/delete', emailsCtrl.deleteEmails);

module.exports = router;