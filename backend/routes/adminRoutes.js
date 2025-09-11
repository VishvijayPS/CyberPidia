const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.use(adminOnly);

router.get('/users', adminCtrl.getUsers);
router.get('/activities', adminCtrl.getActivities);

module.exports = router;
