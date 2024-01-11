const express = require('express');
const router = express.Router();
const emailsCtrl = require('../../controllers/api/emails');

// GET - '/api/processing/inbox'
router.get('/inbox', emailsCtrl.getInbox);

// GET - '/api/processing/processed'
router.get('/processed', emailsCtrl.getProcessed);

// GET - '/api/processing/archived'
router.get('/archived', emailsCtrl.getArchived);

// GET - '/api/processing/:id'
router.get('/:id', emailsCtrl.detail);

// POST - '/api/emails'
router.post('/', emailsCtrl.create);

// POST - '/api/processing/export'
router.post('/export', emailsCtrl.exportEmails);

// PUT - '/api/processing/:id'
router.put('/:id', emailsCtrl.editEmail);

// POST - '/api/processing/archive'
router.post('/archive', emailsCtrl.archiveEmails);

// DELETE - '/api/processing/delete'
router.delete('/delete', emailsCtrl.deleteEmails);

// PUT - '/api/processing/returnToInbox
router.put('/returnToInbox', emailsCtrl.returnToInbox);

module.exports = router;