import React, { useEffect, useState } from 'react';
import API from '../api/api';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get('/api/books').then(res => setBooks(res.data));
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${books[0]?.cover_url})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-4xl font-bold">Featured Book</h1>
          <p className="max-w-lg mt-2">{books[0]?.description}</p>
        </div>
      </div>
      {/* Carousel Row */}
      <div className="p-4">
        <h2 className="text-white text-2xl mb-2">Popular Now</h2>
        <div className="flex overflow-x-scroll scrollbar-hide">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}