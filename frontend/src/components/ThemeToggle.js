import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle({ dark, setDark }) {
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 16px',
    borderRadius: 24,
    border: '1px solid #ccc',
    background: dark ? '#0B1E3D' : '#fff',
    color: dark ? '#fff' : '#0B1E3D',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
  };

  const hoverStyle = (e) => {
    e.target.style.background = dark ? '#294174ff' : '#f0f0f0';
  };

  const leaveStyle = (e) => {
    e.target.style.background = dark ? '#0B1E3D' : '#fff';
  };

  return (
    <button
      onClick={() => setDark(!dark)}
      style={buttonStyle}
      onMouseEnter={hoverStyle}
      onMouseLeave={leaveStyle}
    >
      {dark ? <FaSun /> : <FaMoon />}
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
