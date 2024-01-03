from flask import Blueprint, jsonify, session, request
from app.models import User, db, Album, Photo, Like, Comment
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

comments_routes = Blueprint('comments', __name__)

# get comments
@comments_routes.route('/<int:photo_id>')
@login_required
def get_comments(photo_id):
    # id = current_user.id
    comments = Comment.query.filter_by(photo_id=photo_id).all()

    return {'comments': [comment.to_dict() for comment in comments]}

# update comment
@comments_routes.route('/<int:photo_id>/<int:user_id>', methods=["PUT"])
@login_required
def update_comment(photo_id, user_id):
    id = current_user.id
    if user_id == id:
        comment = Comment.query.filter_by(photo_id=photo_id, user_id=id).first()
        if comment:
            new_body = request.json.get("body")

            if new_body:
                comment.body = new_body
            db.session.commit()
            return {"comment": comment.to_dict()}
        else:
            return {"error": "comment does not exist"}, 404
    else:
        return {"error": "Unauthorized"}, 400

# delete comment
@comments_routes.route('/<int:photo_id>/<int:user_id>', methods=["DELETE"])
@login_required
def delete_comment(photo_id, user_id):
    id = current_user.id
    if user_id == id:
        comment = Comment.query.filter_by(photo_id=photo_id, user_id=id).first()
        if comment:
            db.session.delete(comment)
            db.session.commit()
            return {"message": "comment deleted"}
        else:
            return {"error": "comment does not exist"}, 404
    else:
        return {"error": "Unauthorized"}, 400

# post comment
@comments_routes.route('/<int:photo_id>/<int:user_id>', methods=["POST"])
@login_required
def post_comment(photo_id, user_id):
    id = current_user.id
    if user_id == id:
        body = request.json.get("body")

        new_comment = Comment(
            body = body,
            photo_id = photo_id,
            user_id = id
        )
        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()
    else:
        return {"error": "Unauthorized"}, 400
