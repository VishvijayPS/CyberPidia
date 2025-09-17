import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tools`
        );
        setTools(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tools');
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading tools...</p>;
  if (error) return <p style={{ padding: 20, color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Cybersecurity Tools</h2>
      
      {tools.length === 0 ? (
        <p>No tools available.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20
          }}
        >
          {tools.map((t) => (
            <motion.div
              key={t._id}
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
                href={t.url || '#'}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontWeight: 600,
                  color: '#0A84FF',
                  textDecoration: 'none',
                  fontSize: 18
                }}
              >
                {t.name}
              </a>
              
              <p style={{ marginTop: 8, color: '#555' }}>{t.summary}</p>
              
              {t.usageGuide && (
                <p style={{ marginTop: 8, fontSize: 14, color: '#777' }}>
                  <strong>Guide:</strong> {t.usageGuide}
                </p>
              )}
              
              {Array.isArray(t.tags) && t.tags.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {t.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#e0e0e0',
                        padding: '4px 8px',
                        borderRadius: 6,
                        fontSize: 12,
                        color: '#333',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
