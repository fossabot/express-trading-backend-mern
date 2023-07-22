const express = require('express');
const router = express.Router();
const emailsCtrl = require('../../controllers/api/emails');

// GET - '/api/emails/inbox'
router.get('/inbox', emailsCtrl.getInbox);

// GET - '/api/emails/processed'
router.get('/processed', emailsCtrl.getProcessed);

// GET - '/api/emails/archived'
router.get('/archived', emailsCtrl.getArchived);

// GET - '/api/emails/:id'
router.get('/:id', emailsCtrl.detail);

// POST - '/api/emails'
router.post('/', emailsCtrl.create);

// POST - '/api/emails/export'
router.post('/export', emailsCtrl.exportEmails);

// PUT - '/api/emails/:id'
router.put('/:id', emailsCtrl.editEmail);

// POST - '/api/emails/archive'
router.post('/archive', emailsCtrl.archiveEmails);

// DELETE - '/api/emails/delete'
router.delete('/delete', emailsCtrl.deleteEmails);

module.exports = router;