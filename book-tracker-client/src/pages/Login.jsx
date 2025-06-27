import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
   e.preventDefault();
  setError('');
  try {
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/dashboard');  // <-- should redirect
    } else {
      setError('Login failed');  // optional fallback
    }
  } catch (err) {
    setError('Invalid credentials');  // show this if backend returns 401
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-md w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">Log In</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm">Email:</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 text-black placeholder-gray-700 rounded bg-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-sm">Password:</label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 text-black placeholder-gray-700 rounded bg-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full"
        >
          Log In
        </button>

        <p className="mt-4 text-sm text-center">
          Forgot your password?{' '}
          <a href="/reset-password" className="text-red-400 hover:underline">Reset it here</a>
        </p>

        <p className="mt-2 text-sm text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-red-400 hover:underline">Sign up here</a>
        </p>
      </form>
    </div>
  );
}
