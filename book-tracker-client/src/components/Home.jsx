import React, { useEffect, useState } from 'react';
import API from '../api/api.js';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/books') 
      .then(data => {
        console.log("📚 Fetched books:", data);
        setBooks(data);
      })
      .catch(err => {
        console.error("API Error:", err);
        setError("Failed to fetch books. Please check your connection.");
      });
  }, []);

  const featuredBook = books[0];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Display Error */}
      {error && <p className="text-red-500 text-center p-4">{error}</p>}

      {/* ✅ Hero Banner */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${featuredBook?.cover_url || '/fallback-cover.jpg'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        <div className="absolute bottom-16 left-8 max-w-xl">
          <h1 className="text-4xl font-bold text-[#e50914] drop-shadow-md">
            Welcome to Bookish 📚
          </h1>
          <p className="mt-3 text-lg text-white drop-shadow-sm">
            {featuredBook?.description ||
              "Track your favorite books, build your library, and never forget what you want to read next."}
          </p>
        </div>
      </div>

      {/* ✅ Popular Now Carousel */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-3">Popular Now</h2>
        {books.length > 0 ? (
          <div className="flex overflow-x-scroll space-x-4 scrollbar-hide pb-2">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          !error && <p className="text-center text-gray-400">Loading books...</p>
        )}
      </div>
    </div>
  );
}
