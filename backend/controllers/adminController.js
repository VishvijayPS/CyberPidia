const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password -otp -otpExpiry');
  res.json(users);
};

exports.getActivities = async (req, res) => {
  const activities = await ActivityLog.find().sort({ timestamp: -1 }).limit(1000);
  res.json(activities);
};
