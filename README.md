# bookish-app
is a full-stack web application that allows users to explore, search, and manage books. Users can sign up, log in, browse a dynamic collection of books, and build their own personal reading list.

python -m server.seed

##  Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Flask, Flask-RESTful, SQLAlchemy, Flask-JWT-Extended
- Database: SQLite (dev) or PostgreSQL (prod)
- Authentication: JWT Token-based Auth

##  Features

-  User Authentication (Signup/Login)
-  Search books by title or author
-  Filter books by genre
-  Add books to reading list
-  Remove books from reading list

## Installation

### 1. Clone the repo
git clone https://github.com/Waith93/bookish-app.git
cd bookish-app
## 2. Backend Setup (Flask API)
cd server
pipenv install
pipenv shell
pip install -r requirements.txt
## Create & Seed the Database
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Seed the database
python -m server.seed
## Run the Backend
flask run
## 3. Frontend Setup (React App)
cd book-tracker-client
npm install
npm run dev

And on another terminal 
cd book-tracker-client
npm run dev:css

Ensure the backend is running on http://localhost:5000


## Sample API Endpoints
Method	Endpoint	Description
PATCH/reset-password
GET/profile
GET	/books	List all books
GET	/reading_list	Get current user’s reading list
POST	/signup / /login	Auth endpoints
POST	/reading_list/<book_id>	Add a book to reading list
DELETE	/reading_list/<id>	Remove book from reading list

All protected routes require a valid JWT Token.

## Notes
You must be logged in to add or remove books from your reading list.

JWT token is stored in localStorage and used in all API requests.

For development, use localhost:5173 (React) and localhost:5000 (Flask).

## Author
Stacy Waithera
Chadwick Koo

Inspired by Netflix UI

GitHub

## License
This project is licensed under the MIT License.

## Database link
https://dbdiagram.io/d/6834cd896980ade2eb7e3872