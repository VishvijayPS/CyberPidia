// backend/routes/courses.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all courses
router.get('/', async (req, res) => {
  try {
    db.all('SELECT * FROM courses ORDER BY id DESC', [], (err, rows) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(rows);
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
