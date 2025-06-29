from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import db, ReadingList

class Reading_List(Resource):
    @jwt_required()
    def get(self):
        try:
            user_id = get_jwt_identity()
            items = ReadingList.query.filter_by(user_id=user_id).all()

            return [{
                "id": item.id,
                "book": item.book.to_dict()  
            } for item in items], 200

        except Exception as e:
            print("Error fetching reading list:", e)
            return {"error": "Server error fetching reading list"}, 500

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        try:
            item = ReadingList(
                notes=data.get("notes", ""),
                status=data.get("status", "Not Started"),
                user_id=user_id,
                book_id=data["book_id"]
            )
            db.session.add(item)
            db.session.commit()
            return item.to_dict(), 201
        except (KeyError, ValueError) as e:
            return {"error": str(e)}, 400

class ReadingListByID(Resource):
    @jwt_required()
    def get(self, id):
        item = ReadingList.query.get(id)
        if not item:
            return {"error": "Item not found"}, 404

        user_id = int(get_jwt_identity())
        if item.user_id != user_id:
            return {"error": "Unauthorized"}, 403

        return item.to_dict(), 200

    @jwt_required()
    def patch(self, id):
        item = ReadingList.query.get(id)
        if not item:
            return {"error": "Item not found"}, 404

        if item.user_id != int(get_jwt_identity()):
            return {"error": "Unauthorized"}, 403

        data = request.get_json()
        item.notes = data.get("notes", item.notes)
        item.status = data.get("status", item.status)

        try:
            db.session.commit()
            return item.to_dict(), 200
        except ValueError as e:
            return {"error": str(e)}, 400

    @jwt_required()
    def delete(self, id):
        item = ReadingList.query.get(id)
        if not item:
            return {"error": "Item not found"}, 404

        if item.user_id != int(get_jwt_identity()):
            return {"error": "Unauthorized"}, 403

        db.session.delete(item)
        db.session.commit()
        return {"message": "Item deleted"}, 200

