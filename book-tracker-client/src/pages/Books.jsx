import React, { useEffect, useState } from 'react';
import API from '../api/api.js';
import BookCard from '../components/BookCard';

export default function Books() {
  const [view, setView] = useState('search'); // 'search' or 'add'
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publish_year: '',
    cover_url: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/books')
      .then(res => {
        if (res.success) {
          setBooks(res.data);
          setFilteredBooks(res.data);
        } else {
          console.error(res.message);
        }
      })
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    API.post('/books', formData)
      .then(res => {
        if (res.success) {
          setMessage('✅ Book added!');
          setBooks([...books, res.data]);
          setFormData({ title: '', author: '', description: '', publish_year: '', cover_url: '' });
          setView('search');
        } else {
          setMessage(`❌ ${res.message}`);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        setMessage('❌ Could not add book');
      });
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView('search')}
          className={`px-4 py-2 rounded ${view === 'search' ? 'bg-red-600' : 'bg-gray-700'}`}
        >
          🔍 Search Books
        </button>
        <button
          onClick={() => setView('add')}
          className={`px-4 py-2 rounded ${view === 'add' ? 'bg-red-600' : 'bg-gray-700'}`}
        >
          ➕ Add Book
        </button>
      </div>

      {view === 'search' && (
        <>
          <h1 className="text-3xl text-red-600 font-bold mb-6">Explore All Books</h1>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="flex-grow px-4 py-2 bg-gray-300 text-black placeholder-gray-600 rounded-l"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-red-600 text-white rounded-r hover:bg-red-700 transition"
            >
              Search
            </button>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No books found.</p>
          )}
        </>
      )}

      {view === 'add' && (
        <>
          <h1 className="text-3xl text-red-600 font-bold mb-6">📚 Add a New Book</h1>
          {message && <p className="mb-4 text-green-400">{message}</p>}
          <form onSubmit={handleAddBook} className="space-y-4 max-w-xl">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-200 text-black"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-200 text-black"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-200 text-black"
              required
            />
            <input
              type="number"
              name="publish_year"
              placeholder="Publish Year"
              value={formData.publish_year}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-200 text-black"
            />
            <input
              type="text"
              name="cover_url"
              placeholder="Cover Image URL"
              value={formData.cover_url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-200 text-black"
            />
            <button
              type="submit"
              className="bg-red-600 px-6 py-2 text-white rounded hover:bg-red-700 transition"
            >
              Add Book
            </button>
          </form>
        </>
      )}
    </div>
  );
}

