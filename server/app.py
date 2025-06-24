from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from .models import db, Book, User, ReadingList, Library


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "secret"
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)