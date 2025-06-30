import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex items-center justify-between shadow-md">
      {/* Logo/Brand */}
      <Link to="/" >
        Home
      </Link>
      



      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-lg">
        <Link to="/books" className="hover:text-red-500 transition">
          Browse
        </Link>
        <Link to="/reading-list" className="hover:text-red-500 transition">
          My List
        </Link>
        <Link to="/library" className="hover:text-red-500 transition">
          Library
        </Link>
        <Link to="/profile" className="text-white hover:text-red-500">
          Profile
        </Link>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="hover:text-red-500 transition focus:outline-none"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:text-red-500 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
