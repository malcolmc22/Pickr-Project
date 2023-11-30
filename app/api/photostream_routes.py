from flask import Blueprint, jsonify, session, request
from app.models import User, db, Photo
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms.photo_form import PhotoForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws import (
    upload_file_to_s3, get_unique_filename)

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/<int:user_id>/<int:photo_id>')
@login_required
def get_photo_by_id(user_id, photo_id):
    photos_owned = Photo.query.filter_by(user_id=user_id).all()

    photo_by_id = [photo for photo in photos_owned if photo.id == photo_id]
    # print('this is photo -----------', photo)
    return {'Photo': [photo.to_dict() for photo in photo_by_id]}


@photo_routes.route('/<int:user_id>')
@login_required
def get_photos(user_id):
    photos = Photo.query.filter_by(user_id=user_id).all()

    return {'Photos': [photo.to_dict() for photo in photos]}

@photo_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def post_photo(user_id):
    form = PhotoForm()

    if form.validate_on_submit():
        title = form.data['title']
        description = form.data['description']
        photo_url = form.data['photo_url']
        photo_url.filename = get_unique_filename(photo_url.filename)
        upload = upload_file_to_s3(photo_url)

        if "url" not in upload:
            return {"Error": upload}

        url = upload["url"]
        new_photo = Photo(
            title=title,
            user_id=user_id,
            description=description,
            photo_url=url
        )
        db.session.add(new_photo)
        db.session.commit()

        return new_photo.to_dict()

    return 'hi'
