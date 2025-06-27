import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    localStorage.setItem('token', res.access_token); // fixed here
    setToken(res.access_token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const signup = async (email, password) => {
    const res = await api.post('/register', { email, password });
    localStorage.setItem('token', res.access_token); // fixed here
    setToken(res.access_token);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, signup, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
