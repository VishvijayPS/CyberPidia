const Tool = require('../models/Tool');
const Book = require('../models/Book');
const Course = require('../models/Course');
const ActivityLog = require('../models/ActivityLog');

// list tools/books/courses (simple)
exports.listTools = async (req, res) => {
  const tools = await Tool.find().limit(200);
  res.json(tools);
};
exports.listBooks = async (req, res) => {
  const books = await Book.find().limit(200);
  res.json(books);
};
exports.listCourses = async (req, res) => {
  const courses = await Course.find().limit(200);
  res.json(courses);
};

// search across collections
exports.searchAll = async (req, res) => {
  const { query } = req.query;
  if(!query) return res.json({ tools: [], books: [], courses: [] });

  const q = new RegExp(query, 'i');
  const [tools, books, courses] = await Promise.all([
    Tool.find({ $or: [{ name: q }, { summary: q }, { tags: q }] }).limit(50),
    Book.find({ $or: [{ title: q }, { author: q }, { summary: q }] }).limit(50),
    Course.find({ $or: [{ title: q }, { provider: q }, { summary: q }] }).limit(50)
  ]);
  res.json({ tools, books, courses });
};

// activity logging
exports.logActivity = async (req, res) => {
  try {
    const { userId, email, pageViewed, meta } = req.body;
    await ActivityLog.create({ userId, email, pageViewed, meta });
    res.json({ message: 'Logged' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
