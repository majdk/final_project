from flask import url_for, request, abort, jsonify, make_response
from PIL import Image
from backend import app, login_manager, bcrypt, db
from backend.models import User
from flask_login import login_user, current_user, logout_user, login_required
from flask_jwt_extended import (create_access_token)
import datetime
import os
import secrets


def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)

    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)
    return picture_fn


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.errorhandler(404)
def not_found(error):
    return make_response((jsonify({'error': 'Not Found'})), 404)


@app.errorhandler(400)
def bad_request(error):
    return make_response((jsonify({'error': 'Bad Request'})), 400)


@app.errorhandler(403)
def forbidden(error):
    return make_response((jsonify({'error': 'Forbidden'})), 403)


@app.route("/user", methods=['POST'])
def register():
    print("he is here")
    if current_user.is_authenticated:
        print("line 49")
        abort(400)
    data = request.get_json()
    print(data)
    if not data or not 'password' in data or not 'username' in data or not 'first_name' in data \
            or not 'last_name' in data or not 'gender' in data or not 'birth_date' in data or not 'email' in data:
        print("aborted after first check")
        abort(400)
    check_user = User.query.filter_by(email=data['email']).first()
    if check_user:
        return 'Email Taken'
    check_user = User.query.filter_by(username=data['username']).first()
    if check_user:
        return 'Username Taken'
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], first_name=data['first_name'], last_name=data['last_name'],
                gender=data['gender'], birth_date=datetime.datetime.now(), email=data['email'],
                password=hashed_password)
    print("oh we got here")
    db.session.add(user)
    db.session.commit()
    return 'Created'


@app.route("/login", methods=['GET', 'POST'])
def login():
    print("at login : ")
    if current_user.is_authenticated:
        # logout_user()
        print("we are here")
        abort(404)
    user_data = request.get_json()
    if not user_data or not 'password' in user_data or not 'email' in user_data:
        print("before 400 1")
        abort(400)

    user = User.query.filter_by(email=user_data['email']).first()

    print(" the user is :" )
    print(user)
    print("user data is :")
    print(user_data)
    print(user.password)
    print(user_data['password'])
    if user and bcrypt.check_password_hash(user.password, user_data['password']):
        print("im login")
        login_user(user, remember=True)
        access_token = create_access_token(identity={'id': user.id})
        result = access_token
    else:
        print('Something wrong')
        abort(400)

    return result


@app.route("/logout", methods=['GET'])
@login_required
def logout():
    print('logging out')
    logout_user()
    return 'Logged Out', 201


@app.route("/users/<int:user_id>", methods=['GET'])
@login_required
def getUser(user_id):
    print(user_id)
    user = User.query.filter_by(username=user_id).first()
    if not user:
        print("why not found")
        abort(404)
    image_file = url_for('static', filename='profile_pics/' + user.image_file)
    return make_response(jsonify({'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name,
                                  'gender': user.gender, 'birth_date': user.birth_date, 'email': user.email,
                                  'image_file': image_file, 'followers': len(user.followers.all()),
                                  'followed': len(user.followed.all())}), 200)

@app.route("/users/<int:user_id>/posts", methods=['GET'])
@login_required
def getUserPosts(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    userPosts = user.travels
    return make_response(jsonify({'user_posts':userPosts}), 200)
