from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255))
    photo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    #Relationships
    # users = db.relationship('User')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'photo_id': self.photo_id,
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name
        }
