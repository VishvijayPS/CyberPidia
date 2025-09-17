// populateDb.js
const db = require('./config/db'); // SQLite connection
const mongoose = require('mongoose');
const Book = require('./models/Book'); // MongoDB model

// --- 1. Populate SQLite Tools ---
const tools = [
  {
    name: "Nmap",
    summary: "Network scanning tool to discover hosts and services",
    tags: JSON.stringify(["network", "scanner", "penetration"]),
    usageGuide: "Use `nmap -sV target_ip` to scan services",
    url: "https://nmap.org",
  },
  {
    name: "Wireshark",
    summary: "Network protocol analyzer",
    tags: JSON.stringify(["network", "analyzer", "traffic"]),
    usageGuide: "Open Wireshark and capture packets on desired interface",
    url: "https://www.wireshark.org/",
  },
];

tools.forEach((tool) => {
  const query = `
    INSERT INTO tools (name, summary, tags, usageGuide, url)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(
    query,
    [tool.name, tool.summary, tool.tags, tool.usageGuide, tool.url],
    (err) => {
      if (err) console.error("Error inserting tool:", err.message);
      else console.log(`Inserted tool: ${tool.name}`);
    }
  );
});

// --- 2. Populate MongoDB Books ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cyberpidiaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('MongoDB connected for books');

  const books = [
    {
      title: "Cybersecurity Essentials",
      author: "John Smith",
      summary: "A complete guide to cybersecurity fundamentals",
      url: "https://example.com/book1",
    },
    {
      title: "Ethical Hacking",
      author: "Jane Doe",
      summary: "Learn ethical hacking with hands-on examples",
      url: "https://example.com/book2",
    },
  ];

  try {
    await Book.insertMany(books);
    console.log('Books inserted successfully');
  } catch (err) {
    console.error('Error inserting books:', err.message);
  } finally {
    mongoose.connection.close();
  }
});

// Close SQLite DB after 1 second
setTimeout(() => {
  db.close();
}, 1000);
