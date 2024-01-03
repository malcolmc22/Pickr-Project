from flask import Blueprint, jsonify, session, request
from app.models import User, db, Album, Photo, Like, Comment
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

comments_routes = Blueprint('comments', __name__)
