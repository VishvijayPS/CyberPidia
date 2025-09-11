import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('cyberpidia_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('cyberpidia_token'));

  useEffect(() => {
    if(user) localStorage.setItem('cyberpidia_user', JSON.stringify(user)); else localStorage.removeItem('cyberpidia_user');
    if(token) localStorage.setItem('cyberpidia_token', token); else localStorage.removeItem('cyberpidia_token');
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
  }, [user, token]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
