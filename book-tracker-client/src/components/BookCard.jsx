import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-2xl font-bold text-red-600">Bookish</Link>
        <Link to="/books" className="hover:text-red-600">Browse</Link>
        <Link to="/reading-list" className="hover:text-red-600">My List</Link>
        <Link to="/library" className="hover:text-red-600">Library</Link>
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="hover:text-red-600">Logout</button>
        ) : (
          <Link to="/login" className="hover:text-red-600">Login</Link>
        )}
      </div>
    </nav>
  );
}