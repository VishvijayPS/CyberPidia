const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authMiddleware(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function adminOnly(req, res, next){
  if(!req.user) return res.status(401).json({ message: 'No user' });
  if(req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
}

module.exports = { authMiddleware, adminOnly };
