const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/request-reset', auth.requestPasswordReset);
router.post('/reset-password', auth.verifyOTPAndReset);

module.exports = router;
