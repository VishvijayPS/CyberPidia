const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/tools', userCtrl.listTools);
router.get('/books', userCtrl.listBooks);
router.get('/courses', userCtrl.listCourses);

router.get('/search', userCtrl.searchAll);

// public activity logging endpoint (could require auth in production)
router.post('/activity', userCtrl.logActivity);

module.exports = router;
