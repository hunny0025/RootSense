const express = require('express');
const router = express.Router();
const { getAllIssues, createIssue, updateIssue, deleteIssue, getIssueStats } = require('../controllers/issueController');

router.get('/', getAllIssues);
router.post('/', createIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);
router.get('/stats', getIssueStats);

module.exports = router;
