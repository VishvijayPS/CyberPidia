const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all tools
router.get('/', (req, res) => {
  const query = `SELECT * FROM tools ORDER BY id DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching tools:', err.message);
      return res.status(500).json({ message: 'Failed to fetch tools' });
    }

    // Convert tags from JSON string to array
    const tools = rows.map((t) => ({
      ...t,
      tags: t.tags ? JSON.parse(t.tags) : [],
    }));

    res.json(tools);
  });
});

module.exports = router;
