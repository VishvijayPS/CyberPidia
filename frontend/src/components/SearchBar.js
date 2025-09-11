import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!q) return;
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/search?query=${encodeURIComponent(q)}`);
      sessionStorage.setItem('cyber_search_results', JSON.stringify(res.data));
      navigate('/tools');
    } catch (err) {
      alert('Search failed. Try again.');
    }
  };

  const formStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
    background: '#fff',
    borderRadius: 30,
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  };

  const buttonStyle = {
    padding: '10px 15px',
    background: '#0A84FF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s',
  };

  const buttonHover = (e) => {
    e.target.style.background = '#0666d0';
  };

  const buttonLeave = (e) => {
    e.target.style.background = '#0A84FF';
  };

  const inputStyle = {
    flex: 1,
    padding: '10px 15px',
    border: 'none',
    outline: 'none',
    fontSize: 16,
  };

  return (
    <form onSubmit={handleSearch} style={formStyle}>
      <button
        type="submit"
        style={buttonStyle}
        onMouseEnter={buttonHover}
        onMouseLeave={buttonLeave}
      >
        <FaSearch />
      </button>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tools, books, courses..."
        style={inputStyle}
      />
    </form>
  );
}
