import { createContext, useContext, useState } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

const login = async (email, password) => {
  try {
    const res = await api.post('/login', { email, password });
    console.log('Login response:', res); // ✅ Confirm it’s shaped { success, data }

    const { access_token } = res.data; // <-- this was the issue

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

const signup = async (email, password) => {
  return await api.post('/register', { email, password });
};

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, signup, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
