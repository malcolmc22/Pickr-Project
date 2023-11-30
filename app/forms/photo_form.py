from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, Email, ValidationError
from app.api.aws import ALLOWED_EXTENSIONS

# If you are using templating in your application,
# you will want to make a minor change to the form in the template file,
# making sure you have set the encryption type on the form as follows:

# <form action="/posts/new" method="POST" enctype="multipart/form-data">
class PhotoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    photo_url = FileField('Image File', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Create Photo')
