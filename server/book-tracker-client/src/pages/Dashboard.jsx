import { useEffect, useState } from 'react';
import api from '../api/api'; // make sure this points to your API wrapper

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/books')
      .then(data => setBooks(data))
      .catch(() => setError('Failed to load books'));
  }, []);

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <h1 className="text-3xl font-extrabold text-[#e50914] mb-6">Welcome to Bookish 📚</h1>

      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book.id} className="bg-gray-900 p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold text-[#e50914]">{book.title}</h2>
            <p className="text-gray-300">by {book.author}</p>
            <p className="text-sm text-gray-400 mt-2">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
