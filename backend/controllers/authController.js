const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const sendOTP = require('../utils/sendOTP');

function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

exports.register = (req, res) => {
  const { email, username, password } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.get(checkQuery, [email], (err, existingUser) => {
    if (err) return res.status(500).json({ message: err.message });
    if (existingUser)
      return res.status(400).json({ message: 'Email already exists' });

    const hash = password ? bcrypt.hashSync(password, 10) : null;
    const insertQuery =
      'INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)';

    db.run(
      insertQuery,
      [email, username, hash, 'user'],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });

        const user = { id: this.lastID, email, username };
        const token = generateToken(user);
        res.json({ user, token });
      }
    );
  });
};

exports.login = (req, res) => {
  const { emailOrUsername, password } = req.body;

  const query =
    'SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1';
  db.get(query, [emailOrUsername, emailOrUsername], (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      user: { id: user.id, email: user.email, username: user.username },
      token,
    });
  });
};

exports.requestPasswordReset = (req, res) => {
  const { email } = req.body;

  const selectQuery = 'SELECT * FROM users WHERE email = ?';
  db.get(selectQuery, [email], (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(400).json({ message: 'No user with email' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min

    const updateQuery =
      'UPDATE users SET otp = ?, otpExpiry = ? WHERE email = ?';
    db.run(updateQuery, [otp, otpExpiry, email], (err) => {
      if (err) return res.status(500).json({ message: err.message });

      sendOTP(email, otp)
        .then(() => res.json({ message: 'OTP sent to email' }))
        .catch((err) =>
          res.status(500).json({ message: 'Failed to send OTP' })
        );
    });
  });
};

exports.verifyOTPAndReset = (req, res) => {
  const { email, otp, newPassword } = req.body;

  const selectQuery = 'SELECT * FROM users WHERE email = ?';
  db.get(selectQuery, [email], (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (
      !user ||
      !user.otp ||
      user.otp !== otp ||
      user.otpExpiry < Date.now()
    )
      return res.status(400).json({ message: 'Invalid or expired OTP' });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const updateQuery =
      'UPDATE users SET password = ?, otp = NULL, otpExpiry = NULL WHERE email = ?';
    db.run(updateQuery, [hashedPassword, email], (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Password updated successfully' });
    });
  });
};
