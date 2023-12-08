from flask import Blueprint, jsonify, session, request
from app.models import User, db, Album, Photo
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

album_routes = Blueprint('albums', __name__)

# get all albums
@album_routes.route('/<int:user_id>')
@login_required
def get_albums(user_id):
    id = current_user.id
    if user_id == id:
        albums = Album.query.filter_by(user_id=id).all()

        return {'Albums': [album.to_dict() for album in albums]}
    else:
        return {"error": "these are not your albums"}

# get album by id
@album_routes.route('/<int:user_id>/<int:album_id>')
@login_required
def get_album_by_id(user_id, album_id):
    id = current_user.id
    albums_owned = Album.query.filter_by(user_id=id).all()

    album_by_id = [album.to_dict() for album in albums_owned if album.id == album_id]
    # print('this is photo -----------', photo_by_id)
    # return 'hi'
    return {'Album': album_by_id}

@album_routes.route('/<int:user_id>/<int:album_id>', methods=["PUT"])
@login_required
def update_album(user_id, album_id):
    id = current_user.id
    if user_id == id:
        album = Album.query.filter_by(user_id=id, id=album_id).first()
        if album:
            # print(album, 'this is album=-----')
            new_name = request.json.get("name")

            if new_name:
                album.name = new_name
            db.session.commit()
            return {"album": album.to_dict()}
        else:
            return {"error": "album does not exist"}, 404
    else:
        return {"error": "these are not your albums"}, 404

@album_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def add_album(user_id):
    id = current_user.id
    if user_id == id:
        album_name = request.json.get("name")

        new_album = Album(
            name = album_name,
            user_id = id
        )
        db.session.add(new_album)
        db.session.commit()

        return new_album.to_dict()
    else:
        return {"error" : "Unauthorized"}, 400

@album_routes.route('/<int:user_id>/<int:album_id>', methods=['DELETE'])
@login_required
def delete_album(user_id, album_id):
    id = current_user.id
    if user_id == id:
        album = Album.query.filter_by(user_id=id, id=album_id).first()

        if album:
            db.session.delete(album)
            db.session.commit()
            return {"message": "album deleted"}
        else:
            return {"error": "album does not exist"}
    else :
        return {"error" : "Unauthorized"}, 400

@album_routes.route('/<int:user_id>/<int:album_id>/add/<int:photo_id>', methods=["PUT"])
@login_required
def add_photo_to_album(user_id, album_id, photo_id):
    id = current_user.id
    if user_id == id:
        photo = Photo.query.filter_by(id = photo_id).first()

        if photo:
            photo.album_id = album_id
        db.session.commit()
        return photo.to_dict()
    else:
        return {"error": "these are not your albums"}
