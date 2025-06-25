from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, Library

class Library(Resource):
    def get(self):
        user_id = get_jwt_identity()
        items = Library.query.filter_by(user_id=user_id).all()
        return [item.to_dict() for item in items], 200

    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        try:
            item = Library(
                address=data["address"],
                user_id=user_id,
                book_id=data["book_id"]
            )
            db.session.add(item)
            db.session.commit()
            return item.to_dict(), 201
        except (KeyError, ValueError) as e:
            return {"error": str(e)}, 400
