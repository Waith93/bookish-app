import { useEffect, useState } from 'react';
import api from '../api/api';
import BookCard from '../components/BookCard';

export default function ReadingList() {
  const [items, setItems] = useState([]);

  const fetchReadingList = async () => {
    try {
      const data = await api.get('/reading_list');
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch reading list:', err);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/reading_list/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  useEffect(() => {
    fetchReadingList();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">📚 My Reading List</h1>
      <div className="flex overflow-x-auto space-x-4">
        {items.map(item => (
          <div key={item.id} className="relative">
            <BookCard book={item.book} />
            <button
              onClick={() => handleRemove(item.id)}
              className="absolute top-1 right-1 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
