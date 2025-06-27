import { createContext, useContext, useState } from 'react';
import api from '../api/api'; // assumes your API helper is in src/api/api.js

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async (email, password) => {
  const res = await api.post('/login', { email, password }); 
  const token = res.access_token || res.data?.access_token;

  if (!token) {
    throw new Error("Login failed: no token returned");
  }

  localStorage.setItem('token', token);
  setToken(token);

  window.location.href = '/dashboard';
};

  const register = async (username, email, password) => {
  const res = await api.post('/register', { username, email, password });
  const token = res.access_token || res.token;

  if (!token) throw new Error("No token returned on register");

  localStorage.setItem('token', token);
  setToken(token);
};

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
