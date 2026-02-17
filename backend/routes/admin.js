const express = require('express');
const router = express.Router();
const { login, status, logout } = require('../controllers/adminController');

router.post('/login', login);
router.get('/status', status);
router.post('/logout', logout);

module.exports = router;
