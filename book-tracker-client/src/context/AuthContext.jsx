import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

const login = async (email, password) => {
  try {
    const res = await api.post('/login', { email, password });
    console.log('Login response:', res);

    if (!res.success) {
      return { success: false, message: res.message || 'Login failed' };
    }

    const { access_token } = res.data;

    if (access_token) {
      localStorage.setItem('token', access_token);
      setToken(access_token);
      return { success: true };
    } else {
      return { success: false, message: 'No token received' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

const signup = async (username, email, password) => {
  return await api.post('/signup', { username, email, password });
};

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, signup, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
