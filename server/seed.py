from server.app import app
from server.models import db, Book

books = [
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "description": "A portrait of the Roaring Twenties and a critique of the American Dream.",
        "publish_year": 1925,
        "cover_url": "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    },
    {
        "title": "1984",
        "author": "George Orwell",
        "description": "A dystopian novel set in a totalitarian regime that uses surveillance and mind control.",
        "publish_year": 1949,
        "cover_url": "https://covers.openlibrary.org/b/id/7222241-L.jpg"
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "description": "A young girl's coming-of-age story in the racially segregated American South.",
        "publish_year": 1960,
        "cover_url": "https://covers.openlibrary.org/b/id/8225262-L.jpg"
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "description": "A romantic novel that also critiques the British class system.",
        "publish_year": 1813,
        "cover_url": "https://covers.openlibrary.org/b/id/8315044-L.jpg"
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "description": "A story of teenage angst and alienation.",
        "publish_year": 1951,
        "cover_url": "https://covers.openlibrary.org/b/id/8231856-L.jpg"
    },
    {
        "title": "Brave New World",
        "author": "Aldous Huxley",
        "description": "A futuristic dystopian society where happiness is mandated.",
        "publish_year": 1932,
        "cover_url": "https://covers.openlibrary.org/b/id/8773276-L.jpg"
    },
    {
        "title": "Moby-Dick",
        "author": "Herman Melville",
        "description": "A sea captain's obsession with hunting a white whale.",
        "publish_year": 1851,
        "cover_url": "https://covers.openlibrary.org/b/id/8104611-L.jpg"
    },
    {
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "description": "A fantasy adventure that precedes the Lord of the Rings.",
        "publish_year": 1937,
        "cover_url": "https://covers.openlibrary.org/b/id/6979861-L.jpg"
    },
    {
        "title": "Jane Eyre",
        "author": "Charlotte Brontë",
        "description": "A woman's journey to self-respect and love.",
        "publish_year": 1847,
        "cover_url": "https://covers.openlibrary.org/b/id/8226191-L.jpg"
    },
    {
        "title": "The Lord of the Rings",
        "author": "J.R.R. Tolkien",
        "description": "An epic fantasy trilogy about the battle between good and evil.",
        "publish_year": 1954,
        "cover_url": "https://covers.openlibrary.org/b/id/7559256-L.jpg"
    },
    {
        "title": "Crime and Punishment",
        "author": "Fyodor Dostoevsky",
        "description": "A psychological exploration of guilt and redemption.",
        "publish_year": 1866,
        "cover_url": "https://covers.openlibrary.org/b/id/8235263-L.jpg"
    },
    {
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "description": "A journey of self-discovery and personal legend.",
        "publish_year": 1988,
        "cover_url": "https://covers.openlibrary.org/b/id/8107287-L.jpg"
    },
    {
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J.K. Rowling",
        "description": "The beginning of the famous wizarding saga.",
        "publish_year": 1997,
        "cover_url": "https://covers.openlibrary.org/b/id/7984916-L.jpg"
    },
    {
        "title": "Frankenstein",
        "author": "Mary Shelley",
        "description": "A gothic novel about a scientist who creates life.",
        "publish_year": 1818,
        "cover_url": "https://covers.openlibrary.org/b/id/8225637-L.jpg"
    },
    {
        "title": "The Kite Runner",
        "author": "Khaled Hosseini",
        "description": "A powerful story of friendship, betrayal, and redemption.",
        "publish_year": 2003,
        "cover_url": "https://covers.openlibrary.org/b/id/8231994-L.jpg"
    },
    {
        "title": "Animal Farm",
        "author": "George Orwell",
        "description": "A satirical allegory of the Russian Revolution.",
        "publish_year": 1945,
        "cover_url": "https://covers.openlibrary.org/b/id/8221980-L.jpg"
    },
    {
        "title": "Little Women",
        "author": "Louisa May Alcott",
        "description": "The lives and struggles of four sisters growing up during the American Civil War.",
        "publish_year": 1868,
        "cover_url": "https://covers.openlibrary.org/b/id/8282175-L.jpg"
    },
    {
        "title": "The Book Thief",
        "author": "Markus Zusak",
        "description": "A young girl’s love for books during Nazi Germany.",
        "publish_year": 2005,
        "cover_url": "https://covers.openlibrary.org/b/id/8221463-L.jpg"
    },
    {
        "title": "The Chronicles of Narnia",
        "author": "C.S. Lewis",
        "description": "Children enter a magical world through a wardrobe.",
        "publish_year": 1950,
        "cover_url": "https://covers.openlibrary.org/b/id/8217897-L.jpg"
    },
    {
        "title": "Dracula",
        "author": "Bram Stoker",
        "description": "The original vampire novel that started a genre.",
        "publish_year": 1897,
        "cover_url": "https://covers.openlibrary.org/b/id/8222110-L.jpg"
    }
]

with app.app_context():
    print(" Seeding books")
    db.session.bulk_insert_mappings(Book, books)
    db.session.commit()
