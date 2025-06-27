from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from ..models import db, User

class Register(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return {"error": "Missing fields"}, 400

        if User.query.filter((User.username == username) | (User.email == email)).first():
            return {"error": "User already exists"}, 409

        user = User(username=username, email=email)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return {"message": "User registered successfully!"}, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            token = create_access_token(identity=str(user.id))
            return {
                    "message": "Login successful",
                    "access_token": token
                   }, 200
        return {"error": "Invalid credentials"}, 401

class Profile(Resource):
    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())
        user = User.query.get(user_id)
        if not user:
            return {"error": "User not found"}, 404

        return {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }, 200

class ResetPassword(Resource):
    @jwt_required()
    def patch(self):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user:
            return {"error": "User not found"}, 404

        data = request.get_json()
        old_password = data.get("old_password")
        new_password = data.get("new_password")

        if not old_password or not new_password:
            return {"error": "Missing password fields"}, 400

        if not user.check_password(old_password):
            return {"error": "Old password is incorrect"}, 401

        if len(new_password) < 6:
            return {"error": "New password must be at least 6 characters long"}, 400

        user.set_password(new_password)
        db.session.commit()

        return {"message": "Password updated successfully"}, 200
