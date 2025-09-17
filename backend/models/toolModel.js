const db = require('../config/db');

function getAllTools(callback) {
  db.all('SELECT * FROM tools', [], (err, rows) => {
    callback(err, rows);
  });
}

module.exports = { getAllTools };
