import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/books`
        );
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading books...</p>;
  if (error) return <p style={{ padding: 20, color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Recommended Books</h2>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20
          }}
        >
          {books.map((b) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: 20,
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <a
                href={b.url || '#'}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontWeight: 600,
                  color: '#0A84FF',
                  textDecoration: 'none',
                  fontSize: 18
                }}
              >
                {b.title}
              </a>
              
              <p style={{ marginTop: 8, color: '#555' }}>
                <strong>Author:</strong> {b.author}
              </p>
              
              <p style={{ marginTop: 8, fontSize: 14, color: '#777' }}>
                {b.summary}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
