from flask import Blueprint, jsonify, session, request
from app.models import User, db, Album, Photo, Like, Comment
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

like_routes = Blueprint('likes', __name__)

# get likes
@like_routes.route('/<int:photo_id>')
@login_required
def get_likes(photo_id):
    # id = current_user.id
    likes = Like.query.filter_by(photo_id=photo_id).all()

    return {'like info': [like.to_dict() for like in likes]}

# delete a like
@like_routes.route('/<int:photo_id>/<int:user_id>' , methods=['DELETE'])
@login_required
def delete_like(photo_id, user_id):
    id = current_user.id
    if user_id == id:
        like = Like.query.filter_by(photo_id = photo_id, user_id = id).first()

        if like:
            db.session.delete(like)
            db.session.commit()
            return {"message": 'you unliked the photo'}
        else:
            return {"error": "you don't have this photo liked"}
    else:
        return {"error" : "Unauthorized"}, 400


# like a photo
@like_routes.route('/<int:photo_id>/<int:user_id>', methods=['POST'])
@login_required
def like_photo(photo_id, user_id):
    id = current_user.id
    if user_id == id:
        like = Like.query.filter_by(photo_id = photo_id, user_id = id).first()
        if not like:
            new_like = Like(
                total = 1,
                photo_id = photo_id,
                user_id = id
            )
            db.session.add(new_like)
            db.session.commit()
            return new_like.to_dict()
        else :
            return {"error": "you already liked this photo"}, 400
    else:
        return {"error" : "Unauthorized"}, 400
