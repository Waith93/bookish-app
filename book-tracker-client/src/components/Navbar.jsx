import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">Bookish</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/books">Books</Link>
            <Link to="/reading-list">My List</Link>
            <Link to="/library">Library</Link>
            <button onClick={logout} className="ml-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
