import React from 'react';
export default function BookCard({book}) {
  return (
    <div className="w-40 m-2 flex-shrink-0">
      <img src={book.cover_url} alt={book.title} className="w-full h-60 object-cover rounded-lg" />
      <h3 className="mt-2 text-white text-sm font-semibold">{book.title}</h3>
    </div>
  );
}