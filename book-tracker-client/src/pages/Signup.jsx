import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  const result = await signup(formData.username, formData.email, formData.password);
  if (!result.success) {
    setError(result.message); 
  } else {
    navigate('/dashboard');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-md w-[350px]">
        <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-sm">Username:</label>
          <input
            type="username"
            name="username"
            required
            className="w-full px-3 py-2 text-black placeholder-gray-700 rounded bg-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>

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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-1 text-sm">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            required
            className="w-full px-3 py-2 text-black placeholder-gray-700 rounded bg-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full"
        >
          Create Account
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-red-400 hover:underline">Log in here</a>
        </p>
      </form>
    </div>
  );
}
