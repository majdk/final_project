from flask import request, abort, jsonify, make_response
from backend import app, login_manager
from backend.models import User
from flask_login import login_user, current_user, logout_user, login_required
from flask_jwt_extended import (create_access_token)

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




@app.route("/login", methods=['GET', 'POST'])
def login():
    # print("at login : ")
    if current_user.is_authenticated:
        # logout_user()
        # print("we are here")
        abort(404)
    user_data = request.get_json()
    if not user_data or not 'password' in user_data or not 'email' in user_data:
        print("before 400 1")
        abort(400)

    user = User.query.filter_by(email=user_data['email']).first()

    # print(" the user is :" )
    # print(user)
    # print("user data is :")
    # print(user_data)
    # print(user.password)
    # print(user_data['password'])
    # if user.password == user_data['password']:
    #     print("fuuuck")
    if user and user.password == user_data['password']:
        print("im login")
        login_user(user, remember=True)
        access_token = create_access_token(identity={'id': user.id})
        result = access_token
    else:
        print("before 400 2")
        abort(400)

    return result


@app.route("/users/<int:user_id>", methods=['GET'])
# @login_required
def getUser(user_id):
    # print(user_id)
    # print("at users")
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    # print("before users")
    # print(user)

    return make_response(jsonify({'username': user.username}), 200)

@app.route("/logout", methods=['GET'])
@login_required
def logout():
    # print('logging out')
    logout_user()
    return 'Logged Out', 201


