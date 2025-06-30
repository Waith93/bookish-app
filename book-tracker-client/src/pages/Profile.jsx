// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import API from '../api/api'; 

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/profile')
      .then(res => {
        if (res.success) {
          setProfile(res.data);
        } else {
          setError(res.message);
        }
      })
      .catch(err => {
        console.error("Profile fetch failed:", err);
        setError("Could not load profile.");
      });
  }, []);

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-4">👤 My Profile</h2>
      {profile ? (
        <div className="bg-gray-900 rounded p-4">
          <p><span className="text-gray-400">Username:</span> {profile.username}</p>
          <p><span className="text-gray-400">Email:</span> {profile.email}</p>
          <p><span className="text-gray-400">Password:</span> {profile.password}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
