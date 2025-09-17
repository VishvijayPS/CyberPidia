import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/courses`
        );
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading courses...</p>;
  if (error) return <p style={{ padding: 20, color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Recommended Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20
          }}
        >
          {courses.map((c) => (
            <motion.div
              key={c.id}
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
                href={c.url || '#'}
                target="_blank"
                rel="noreferrer"
                style={{ fontWeight: 600, color: '#0A84FF', textDecoration: 'none', fontSize: 18 }}
              >
                {c.title}
              </a>
              <p style={{ marginTop: 8, color: '#555', fontSize: 14 }}>
                Provider: <strong>{c.provider}</strong>
              </p>
              {c.summary && <p style={{ marginTop: 8, color: '#777', fontSize: 13 }}>{c.summary}</p>}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
