const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendOTP = require('../utils/sendOTP');

function generateToken(user){
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ message: 'Email exists' });
    const hash = password ? await bcrypt.hash(password, 10) : null;
    const user = await User.create({ email, username, password: hash });
    const token = generateToken(user);
    res.json({ user: { id: user._id, email: user.email, username: user.username }, token });
  } catch(err){ res.status(500).json({ message: err.message }); }
};

exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ user: { id: user._id, email: user.email, username: user.username }, token });
  } catch(err){ res.status(500).json({ message: err.message }); }
};

// send OTP for password reset
exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'No user with email' });
    const otp = Math.floor(100000 + Math.random()*900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10*60*1000; // 10 minutes
    await user.save();
    await sendOTP(email, otp);
    res.json({ message: 'OTP sent to email' });
  } catch(err){ res.status(500).json({ message: err.message }); }
};

exports.verifyOTPAndReset = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'No user' });
    if(!user.otp || user.otp !== otp || user.otpExpiry < Date.now())
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.json({ message: 'Password updated' });
  } catch(err){ res.status(500).json({ message: err.message }); }
};
