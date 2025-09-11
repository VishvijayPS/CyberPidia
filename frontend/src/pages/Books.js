import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Books(){
  const [books, setBooks] = useState([]);
  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/books`)
      .then(r=>setBooks(r.data))
      .catch(console.error);
  },[]);
  return (
    <div style={{ padding:20 }}>
      <h2>Books</h2>
      <ul>
        {books.map(b => (
          <li key={b._id}><a href={b.url || '#'} target="_blank" rel="noreferrer">{b.title}</a> — {b.author}</li>
        ))}
      </ul>
    </div>
  );
}
