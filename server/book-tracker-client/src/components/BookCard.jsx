import { useAuth } from '../context/AuthContext';
import api from '../api/api';

export default function BookCard({ book }) {
  const { token } = useAuth();

  const handleAdd = async () => {
    try {
      await api.post('/reading_list', { book_id: book.id });
      alert('Added to reading list!');
    } catch (err) {
      alert('Could not add to list');
      console.error(err);
    }
  };

  return (
    <div className="w-40 m-2 flex-shrink-0">
      <img src={book.cover_url} alt={book.title} className="w-full h-60 object-cover rounded-lg" />
      <h3 className="mt-2 text-white text-sm font-semibold">{book.title}</h3>
      {token && (
        <button
          onClick={handleAdd}
          className="mt-1 text-xs text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
        >
          ➕ Add to Reading List
        </button>
      )}
    </div>
  );
}
