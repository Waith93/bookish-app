from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from ..models import db, Book

def book_to_dict(book):
    return {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "description": book.description,
        "year": book.publish_year
    }

class Books(Resource):
    def get(self):
        books = Book.query.all()
        return [book.to_dict() for book in books], 200

    def post(self):
        data = request.get_json()

        title = data.get("title")
        author = data.get("author")
        description = data.get("description", "")
        year = data.get("year")

        if not title or not author or not year:
            return {"error": "Missing required fields"}, 400

        new_book = Book(
            title=title,
            author=author,
            description=description,
            publish_year=year
        )
        db.session.add(new_book)
        db.session.commit()

        return book_to_dict(new_book), 201

class BookByID(Resource):
    def get(self, id):
        book = Book.query.filter(Book.id == id).first()
        if not book:
            return {"error": "Book not found"}, 404
        return book_to_dict(book), 200
    
    @jwt_required()
    def patch(self, id):
        book = Book.query.filter(Book.id == id).first()
        if not book:
            return {"error": "Book not found"}, 404

        data = request.get_json()
        book.title = data.get("title", book.title)
        book.author = data.get("author", book.author)
        book.description = data.get("description", book.description)
        book.publish_year = data.get("year", book.publish_year)

        db.session.commit()
        return book_to_dict(book), 200

    @jwt_required()
    def delete(self, id):
        book = Book.query.filter(Book.id == id).first()
        if not book:
            return {"error": "Book not found"}, 404

        db.session.delete(book)
        db.session.commit()
        return {"message": "Book deleted successfully"}, 200