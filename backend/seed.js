const mongoose = require('mongoose');
require('dotenv').config();
const Tool = require('./models/Tool');
const Book = require('./models/Book');
const Course = require('./models/Course');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  await Tool.deleteMany(); await Book.deleteMany(); await Course.deleteMany(); await User.deleteMany();

  await Tool.create([
    { name:'Nmap', summary:'Network scanner', url:'https://nmap.org', tags:['network','scanner'] },
    { name:'Burp Suite', summary:'Web proxy and security testing tool', url:'https://portswigger.net/burp', tags:['web','proxy'] }
  ]);

  await Book.create([
    { title:'Web Application Hacker\'s Handbook', author:'Dafydd Stuttard', url:'' },
    { title:'The Basics of Hacking and Penetration Testing', author:'Patrick Engebretson', url:'' }
  ]);

  await Course.create([
    { title:'Hacker101', provider:'HackerOne', level:'Beginner', url:'https://www.hacker101.com' },
    { title:'OWASP WebGoat', provider:'OWASP', level:'Intermediate', url:'https://owasp.org' }
  ]);

  const pass = await bcrypt.hash('admin123', 10);
  await User.create({ email:'admin@cyberpidia.local', username:'admin', password:pass, role:'admin' });

  console.log('Seeded');
  process.exit(0);
}
seed().catch(e=>{ console.error(e); process.exit(1); });
