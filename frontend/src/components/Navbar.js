import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import './Navbar.css';

function Navbar({ dark, setDark }) {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Cyberpidia</Link>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/tools">Tools</Link>
          <Link to="/books">Books</Link>
          <Link to="/courses">Courses</Link>

          <div className="search-wrapper"><SearchBar /></div>

          <ThemeToggle dark={dark} setDark={setDark} />

          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <button className="nav-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/signup" className="nav-btn">Sign Up</Link>
            </>
          )}

          {user?.role === 'admin' && <Link to="/admin" className="nav-btn">Admin</Link>}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
