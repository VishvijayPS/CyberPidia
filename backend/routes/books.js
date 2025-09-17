const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all books
router.get('/', (req, res) => {
  const query = `SELECT * FROM books ORDER BY id DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching books:', err.message);
      return res.status(500).json({ message: 'Failed to fetch books' });
    }
    res.json(rows);
  });
});

module.exports = router;
