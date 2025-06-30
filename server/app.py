from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
import os
from server.models import db
from server.routes.user import Signup, Login, Profile, ResetPassword
from server.routes.book import Books, BookByID
from server.routes.reading_list import Reading_List, ReadingListByID
from server.routes.library import LibraryRoute, LibraryByID
from flask_jwt_extended import JWTManager


app = Flask(__name__, static_folder='static', static_url_path='/')
CORS(app, origins=["http://127.0.0.1:5173", "http://localhost:5173"], supports_credentials=True)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "super-secret"
app.secret_key = "secret"
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path=''):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# API Resources
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Profile, '/profile')
api.add_resource(ResetPassword, '/reset-password')

api.add_resource(Books, '/books')
api.add_resource(BookByID, '/books/<int:id>')

api.add_resource(Reading_List, '/reading_list')
api.add_resource(ReadingListByID, '/reading_list/<int:id>')

api.add_resource(LibraryRoute, '/library')
api.add_resource(LibraryByID, '/library/<int:id>')

if __name__=="__main__":
    app.run(debug=True)