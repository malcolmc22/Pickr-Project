from flask import Blueprint, jsonify, session, request
from app.models import User, db, Photo
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms.photo_form import PhotoForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws import (
    upload_file_to_s3, get_unique_filename, remove_file_from_s3)

photo_routes = Blueprint('photos', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

# get photo by id
@photo_routes.route('/<int:user_id>/<int:photo_id>')
@login_required
def get_photo_by_id(user_id, photo_id):
    photos_owned = Photo.query.filter_by(user_id=user_id).all()

    photo_by_id = [photo.to_dict() for photo in photos_owned if photo.id == photo_id]
    print('this is photo -----------', photo_by_id)
    # return 'hi'
    return {'Photo': photo_by_id}

# get all photos
@photo_routes.route('/<int:user_id>')
@login_required
def get_photos(user_id):
    photos = Photo.query.filter_by(user_id=user_id).all()

    return {'Photos': [photo.to_dict() for photo in photos]}

# create a photo
@photo_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def post_photo(user_id):
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
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

    return {"error": validation_errors_to_error_messages(form.errors)}, 400

# update a photo
@photo_routes.route('/<int:user_id>/<int:photo_id>', methods=['PUT'])
@login_required
def update_photo(user_id, photo_id):
    id = current_user.id
    photos_owned = Photo.query.filter_by(user_id=id).all()

    new_title = request.json.get("title")
    new_desc = request.json.get("description")

    photo_by_id = [photo for photo in photos_owned if photo.id == photo_id]

    if new_title:
        photo_by_id[0].title = new_title
    if new_desc:
        photo_by_id[0].description = new_desc
    db.session.commit()

    return {"Photo": photo_by_id[0].to_dict()}

# delete a photo
@photo_routes.route('/<int:user_id>/<int:photo_id>', methods=['DELETE'])
@login_required
def delete_photo(user_id, photo_id):
    id = current_user.id
    photo = Photo.query.filter_by(id=photo_id, user_id=id).first()
    if photo:

        url = photo.photo_url
        print(url, 'this is url-----------')
        if url:
            print('you are inside the if -----------')
            remove_file_from_s3(photo.photo_url)

        db.session.delete(photo)
        db.session.commit()
        return {"message": "photo deleted"}
    else :
        return {"error": "photo not found or does not belong to user"}
