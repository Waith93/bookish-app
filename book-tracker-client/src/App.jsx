import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import ReadingList from './pages/ReadingList';
import Library from './pages/Library';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import './index.css';
import MustLogin from './pages/MustLogin'; 
import Profile from './pages/Profile';


export default function App() {
  return (
    <div className="bg-black text-white">
      

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/must-login" element={<MustLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/reading-list" element={<ReadingList />} />
          <Route path="/library" element={<Library />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}