from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, Library

class LibraryRoute(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        items = Library.query.filter_by(user_id=user_id).all()
        return [item.to_dict() for item in items], 200

    @jwt_required()
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

class LibraryByID(Resource):
    @jwt_required()
    def patch(self,id):
        user_id = int(get_jwt_identity())
        item = Library.query.filter(Library.id == id).first()

        if not item:
            return {"error": "Item not found"}, 404
        if item.user_id != user_id:
            return {"error": "Unauthorized"}, 403

        data = request.get_json()
        item.address = data.get("address", item.address)

        try:
            db.session.commit()
            return item.to_dict(), 200
        except ValueError as e:
            return {"error": str(e)}, 400

    @jwt_required()
    def delete(self, id):
        user_id = int(get_jwt_identity())
        item = Library.query.filter(Library.id == id).first()

        if not item:
            return {"error": "Item not found"}, 404
        if item.user_id != user_id:
            return {"error": "Unauthorized"}, 403

        db.session.delete(item)
        db.session.commit()
        return {"message": "Library item deleted successfully"}, 200

