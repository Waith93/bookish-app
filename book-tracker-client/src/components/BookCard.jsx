export default function BookCard({ book, onDelete, showDelete = false }) {
  const handleAddToReadingList = () => {
    fetch("http://localhost:5000/reading_list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        book_id: book.id,
        notes: "",
        status: "Not Started",
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add");
        return res.json();
      })
      .then(() => alert(`Added "${book.title}" to your reading list!`))
      .catch(() => alert("Login required to add books."));
  };

  return (
    <div className="bg-gray-800 text-white m-4 p-4 rounded shadow-md w-64 relative">
      <img
        src={book.cover_url}
        alt={book.title}
        className="w-full h-72 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-bold">{book.title}</h3>
      <p className="text-sm italic">{book.author}</p>
      <p className="text-xs mt-2">{book.description}</p>

      {showDelete ? (
        <button
          onClick={onDelete}
          className="mt-4 bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded"
        >
          X Remove from List
        </button>
      ) : (
        <button
          onClick={handleAddToReadingList}
          className="mt-4 bg-[#e50914] hover:bg-red-700 text-white py-1 px-3 rounded"
        >
          ➕ Add to Reading List
        </button>
      )}
    </div>
  );
}


