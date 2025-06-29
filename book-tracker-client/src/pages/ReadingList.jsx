import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

function ReadingList() {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reading_list", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setReadingList(data))
      .catch((err) => console.error("Error fetching reading list:", err));
  }, []);

  const handleRemove = (readingListId) => {
    fetch(`http://localhost:5000/reading_list/${readingListId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        return res.json();
      })
      .then(() => {
        setReadingList((prev) =>
          prev.filter((item) => item.id !== readingListId)
        );
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Could not remove item. Are you logged in?");
      });
  };

  return (
       <div className="p-8">
        <h1 className="text-3xl font-extrabold text-[#e50914]">Welcome to Bookish 📚</h1>
         {readingList.map((item) => (
          <BookCard
            key={item.id}
            book={item.book}
            onDelete={() => handleRemove(item.id)}
            showDelete={true}
          />
        ))}
      </div>
  );
}

export default ReadingList;