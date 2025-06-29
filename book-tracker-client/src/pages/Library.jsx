import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching library books:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-extrabold text-[#e50914]">Welcome to Bookish 📚</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
  );
}

export default Library;


