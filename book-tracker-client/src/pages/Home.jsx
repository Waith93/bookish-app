import React, {useEffect, useState} from 'react';
import API from '../api/api.js';
import BookCard from '../components/BookCard';
export default function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {API.get('/api/books').then(data => setBooks(data)).catch(console.error);}, []);
  return (
    <div className="bg-black min-h-screen">
      <div className="relative h-[500px] bg-cover bg-center" style={{backgroundImage: `url(${books[0]?.cover_url})`}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
        <div className="absolute bottom-20 left-10">
          <h1 className="text-3xl font-bold !text-red-600">  Welcome to Bookish 📚</h1>

          {/* <h1 className="text-5xl font-extrabold" style={{ color: '#e50914' }}>Welcome to Bookish</h1> */}
          <p className="max-w-xl mt-3 text-lg text-white drop-shadow-md">
            Track your favorite books, build your library, and never forget what you want to read next.
          </p>
        </div>
      </div>
      {/* <div className="p-4">
        <h2 className="text-white text-2xl mb-2">Popular Now</h2>
        <div className="flex overflow-x-scroll scrollbar-hide">
          {books.map(book => <BookCard key={book.id} book={book} />)}
        </div>
        
      </div> */}
      
    </div>
    
  );
}
