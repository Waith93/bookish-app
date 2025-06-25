from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password = db.Column(db.String)

    readinglists = relationship('ReadingList', back_populates='user', cascade='all, delete')
    libraries = relationship('Library', back_populates='user', cascade='all, delete')

    serialize_rules = ('-password', '-readinglists.user', '-libraries.user')

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def validate_email(self, key, value):
        if not value or '@' not in value:
            raise ValueError("A valid email is required.")
        return value

    @validates('name', 'password')
    def validate_not_blank(self, key, value):
        if not value or value.strip() == '':
            raise ValueError(f"{key.capitalize()} cannot be blank.")
        return value

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title =  db.Column(db.String)
    author = db.Column(db.String)
    description = db.Column(db.String)
    publish_year = db.Column(db.Integer)

    readinglists = relationship('ReadingList', back_populates='book', cascade='all, delete')
    libraries = relationship('Library', back_populates='book', cascade='all, delete')

    serialize_rules = ('-readinglists.book', '-libraries.book')

    @validates('title', 'author')
    def validate_not_blank(self, key, value):
        if not value or value.strip() == '':
            raise ValueError(f"{key.capitalize()} is required.")
        return value

    @validates('publish_year')
    def validate_year(self, key, value):
        if value and (value < 0 or value > 2100):
            raise ValueError("Publish year must be a valid year.")
        return value

class ReadingList(db.Model, SerializerMixin):
    __tablename__ = 'readinglists'

    id = db.Column(db.Integer, primary_key=True)
    notes = db.Column(db.String)
    status = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    user = db.relationship('User', back_populates='readinglists') 
    book = db.relationship('Book', back_populates='readinglists')

    serialize_rules = ('-user.readinglists', '-book.readinglists')

    @validates('status')
    def validate_status(self, key, value):
        allowed = ['Not Started', 'In Progress', 'Completed']
        if value not in allowed:
            raise ValueError(f"Status must be one of: {', '.join(allowed)}")
        return value

class Library(db.Model, SerializerMixin):
    __tablename__ = 'libraries'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

    user = db.relationship('User', back_populates='libraries')
    book = db.relationship('Book', back_populates='libraries')


    serialize_rules = ('-user.libraries', '-book.libraries')

    @validates('address')
    def validate_address(self, key, value):
        if not value or value.strip() == '':
            raise ValueError("Address cannot be empty.")
        return value
