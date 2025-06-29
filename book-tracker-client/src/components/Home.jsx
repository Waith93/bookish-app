import React, { useEffect, useState } from 'react';
import API from '../api/api.js';
import BookCard from '../components/BookCard';
import { data } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

    useEffect(() => {
    API.get('/api/books')
      .then(data => {
        console.log("📚 Fetched books:", data);
        setBooks(data);
      })
      .catch(err => console.error("❌ API Error:", err));
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {error && <p className="text-red-500 text-center p-4">{error}</p>}

      {/* Hero Banner */}
      <div className="relative h-96 bg-cover bg-center"
           style={{
               backgroundImage: `url(${books[0]?.cover_url || '/fallback-cover.jpg'})`,
           }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold text-red-600">Featured Book</h1>
          <p className="max-w-lg mt-2">{books[0]?.description || 'No description available.'}</p>
        </div>
      </div>

      {/* Carousel Row */}
      <div className="p-4">
        <h2 className="text-white text-2xl mb-2">Popular Now</h2>
        <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
