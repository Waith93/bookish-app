from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_restful import Api
from .models import db
from server.routes.user import Register, Login, Profile, ResetPassword
from server.routes.book import Books, BookByID
from server.routes.reading_list import Reading_List, ReadingListByID
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret"
app.secret_key = "secret"
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)

@app.route('/')
def home():
    return {"message": "Welcome to Bookish API"}

# API Resources
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(Profile, '/profile')
api.add_resource(ResetPassword, '/reset-password')

api.add_resource(Books, '/books')
api.add_resource(BookByID, '/books/<int:id>')

api.add_resource(Reading_List, '/reading_list')
api.add_resource(ReadingListByID, '/reading_list/<int:id>')