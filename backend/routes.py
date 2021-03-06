from flask import url_for, request, abort, jsonify, make_response
from PIL import Image
from backend import app, login_manager, bcrypt, db, geolocator
from backend.models import User, Travel, Follow, Subscribe, Notification
from flask_login import login_user, current_user, logout_user, login_required
from flask_jwt_extended import (create_access_token)
import datetime
import os
import secrets
from geopy import distance
import json

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, '../frontend/public/static/images', picture_fn)
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
    if current_user.is_authenticated:
        abort(403)
    data=request.form['user']
    data=json.loads(data)
    if not data or not 'password' in data or not 'username' in data or not 'firstname' in data \
            or not 'lastname' in data or not 'email' in data or not 'bio' in data:
        abort(400)
    check_user = User.query.filter_by(email=data['email']).first()
    if check_user:
        return make_response((jsonify({'error': 'email taken'})), 400)
    check_user = User.query.filter_by(username=data['username']).first()
    if check_user:
        return make_response((jsonify({'error': 'username taken'})), 400)
    if 'file' in request.files:
        file = request.files['file']
        picture_saved_name = save_picture(file)
    else:
        picture_saved_name=""
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], first_name=data['firstname'], last_name=data['lastname'],
                email=data['email'],
                password=hashed_password, bio=data['bio'],image_file=picture_saved_name)
    db.session.add(user)
    db.session.commit()
    return make_response((jsonify({'ok': 'account created'})), 200)

# @app.route("/user/savepic", methods=['POST'])
# def savepic():
#     print("hello")
#     print(request.files)
#     file = request.files['file']
#     print("its me")
#     picture_saved_name=save_picture(file)
#     return picture_saved_name


@app.route("/login", methods=['POST'])
def login():
    if current_user.is_authenticated:
        abort(403)
    user_data = request.get_json()
    if not user_data or not 'password' in user_data or not 'email' in user_data:
        abort(400)

    user = User.query.filter_by(email=user_data['email']).first()

    if user and bcrypt.check_password_hash(user.password, user_data['password']):
        login_user(user, remember=True)
        access_token = create_access_token(identity={'id': user.id})
        result = access_token
    else:
        abort(400)

    return result


@app.route("/user/profile", methods=['POST'])
@login_required
def editprofile():
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    user_data = request.form['user']
    user_data = json.loads(user_data)
    if 'id' in user_data or 'username' in user_data or 'email' in user_data:
        abort(400)
    if 'file' not in request.files:
        picture_path=user.image_file
    else:
        file = request.files['file']
        picture_path = save_picture(file)
    hashed_password = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
    user.first_name = user_data['firstname']
    user.last_name = user_data['lastname']
    user.password = hashed_password
    user.bio = user_data['bio']
    user.image_file=picture_path
    db.session.commit()
    return make_response((jsonify({'ok': 'profile edited'})), 200)


@app.route("/logout", methods=['POST'])
@login_required
def logout():
    logout_user()
    return make_response((jsonify({'ok': 'Logged out'})), 201)


@app.route("/user/<int:user_id>", methods=['GET'])
@login_required
def getUser(user_id):
    current_user_id = current_user.get_id()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    following = user.followers.filter_by(follower_id=current_user_id).first()
    if not following:
        isFollowing = False
    else:
        isFollowing = True

    return make_response(jsonify(
        {'user_id': user.id, 'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name,
         'gender': user.gender, 'birth_date': user.birth_date, 'email': user.email,
         'bio': user.bio,
         'followers': len(user.followers.all()),
         'followed': len(user.followed.all()), 'isfollowing': isFollowing
         ,'image':user.image_file}), 200)


@app.route("/user/posts/<int:user_id>", methods=['GET'])
@login_required
def getUserPosts(user_id):
    current_user_id = current_user.get_id()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    userPosts = user.travels.order_by(Travel.date_posted)
    json_list = [i.to_json_with_sub_check(current_user_id) for i in userPosts]
    print(json_list)
    return make_response(jsonify(json_list), 200)


@app.route("/user/post", methods=['POST'])
@login_required
def addPost():
    data = request.get_json()
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    travel = createPost(data)
    user.travels.append(travel)
    db.session.commit()
    return make_response(jsonify(travel.to_json()), 200)


@app.route("/user/follow/<int:followed_user_id>", methods=['POST'])
@login_required
def follow(followed_user_id):
    user_id = current_user.get_id()
    if not user_id:
        abort(404)
    user = User.query.filter_by(id=user_id).first()
    followed_user = User.query.filter_by(id=followed_user_id).first()
    if not user or not followed_user:
        abort(404)
    follow_instance = Follow(follower_id=user_id, followed_id=followed_user_id)
    db.session.add(follow_instance)
    db.session.commit()

    return make_response(jsonify({'ok':'followed'}), 200)


@app.route("/user/follow/<int:followed_user_id>", methods=['DELETE'])
@login_required
def unfollow(followed_user_id):
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id).first()
    followed_user = User.query.filter_by(id=followed_user_id).first()
    if not user or not followed_user:
        abort(404)

    Follow.query.filter_by(followed_id=followed_user_id, follower_id=user_id).delete(synchronize_session=False)

    db.session.commit()

    return make_response(jsonify({'ok':'unfollowed'}), 200)


@app.route("/user/subscribe/<int:post_id>", methods=['POST'])
@login_required
def subscribe(post_id):
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id).first()
    post = Travel.query.filter_by(id=post_id).first()
    follow = Follow.query.filter_by(follower_id=user_id, followed_id=post.user_id).first()
    if not user or not post or not follow:
        abort(404)
    subInstance = Subscribe(post_id=post_id, subscriber_id=user_id, follow_id=follow.id)
    db.session.add(subInstance)
    db.session.commit()
    return make_response(jsonify({'ok': 'subscribed'}), 200)


@app.route("/user/subscribe/<int:post_id>", methods=['DELETE'])
@login_required
def unsubscribe(post_id):
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id).first()
    post = Travel.query.filter_by(id=post_id).first()
    if not user or not post:
        abort(404)
    Subscribe.query.filter_by(post_id=post_id, subscriber_id=user_id).delete(synchronize_session=False)
    db.session.commit()
    return make_response(jsonify({'ok': 'unsubscribed'}), 200)


@app.route("/user/post/<int:post_id>", methods=['PUT'])
@login_required
def editpost(post_id):
    data = request.get_json()
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id).first()
    post = Travel.query.filter_by(id=post_id).first()
    if not user or not post or int(post.user_id) != int(user_id):
        abort(404)
    subscribe = Subscribe.query.filter_by(post_id=post_id).all()
    newPost = createPost(data)
    post.title = newPost.title
    post.start_date = newPost.start_date
    post.end_date = newPost.end_date
    post.content = newPost.content
    post.city = newPost.city
    post.country = newPost.country
    post.latitude = newPost.latitude
    post.longitude = newPost.longitude
    for i in subscribe:
        notification = Notification(subscribe_id=i.id)
        i.notifications.append(notification)
    db.session.commit()
    return make_response(jsonify({'ok': 'edited'}), 200)


@app.route("/user/notifications", methods=['GET'])
@login_required
def getNotifications():
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    subscribed_travels = user.subscribed_travels
    json_list = [i.to_json() for i in subscribed_travels]
    print(json_list)
    return make_response(jsonify(json_list), 200)


@app.route("/user", methods=['DELETE'])
@login_required
def deleteAccount():
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id)
    if not user:
        abort(404)
    user.delete(synchronize_session=False)
    db.session.commit()
    logout_user()
    return make_response(jsonify({'ok': 'deleted'}), 200)


@app.route("/user/post/<int:post_id>", methods=['DELETE'])
@login_required
def deletepost(post_id):
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    post = Travel.query.filter_by(id=post_id)
    if not post:
        abort(404)
    post.delete(synchronize_session=False)
    db.session.commit()
    return make_response(jsonify({'ok': 'deleted'}), 200)


@app.route("/user/postfeed", methods=['GET'])
@login_required
def getpostfeed():
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    user = User.query.filter_by(id=user_id).first()
    userPosts = user.get_posts_as_list_with_sub(user_id)
    for i in user.followed.all():
        userPosts = userPosts + i.followed.get_posts_as_list_with_sub(user_id)
    userPosts.sort(key=lambda s: s['date_posted'])
    return make_response(jsonify(userPosts), 200)


@app.route("/user/searchuser/<string:user_tosearch>", methods=['GET'])
@login_required
def searchuser(user_tosearch):
    user = User.query.filter_by(username=user_tosearch).first()
    if not user:
        abort(404)
    user_id = user.id
    return make_response(jsonify(user_id), 200)


@app.route("/user/followers/<int:user_id>", methods=['GET'])
@login_required
def getfollowers(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)

    return make_response(jsonify(user.getfollowers()), 200)


@app.route("/user/following/<int:user_id>", methods=['GET'])
@login_required
def getfollowings(user_id):
    user = User.query.filter_by(id=user_id).first()
    if not user:
        abort(404)
    return make_response(jsonify(user.getfollowings()), 200)


@app.route("/user/search_on_map", methods=['GET'])
@login_required
def search_on_map():
    # data = request.get_json()
    # print(request.params)
    user_id = current_user.get_id()
    if not user_id:
        abort(403)
    # print('got her')
    # if not data or not 'longitude' in data or not 'latitude' in data or not 'km' in data:
    #     abort(404)
    # print('got her')
    # long = data['longitude']
    # lat = data['latitude']
    # km = data['km']
    long = request.args.get('longitude')
    lat = request.args.get('latitude')
    km = request.args.get('km')
    lat_long_tuple = (lat, long)
    print(lat_long_tuple)
    all_travels = Travel.query.all()

    travels_within_radius = []
    for i in all_travels:
        distance_from_center = distance.distance(lat_long_tuple, (i.latitude, i.longitude))
        print((i.latitude, i.longitude))
        print(distance_from_center)
        if distance_from_center <= float(km):
            travels_within_radius.append(i.to_json())
    print(travels_within_radius)
    return make_response(jsonify(travels_within_radius), 200)


@app.route("/getall", methods=['GET'])
def getall():
    users = User.query.all()
    travels = Travel.query.all()
    subscribes = Subscribe.query.all()
    follow = Follow.query.all()
    for i in users:
        print(i.to_json())
    for i in travels:
        print(i.to_json())
    for i in subscribes:
        print(i.to_json())
    for i in follow:
        print(i.to_json())
    return 'done '


def createPost(data):
    if not data or not 'title' in data or not 'start_date' in data or not 'end_date' in data \
            or not 'latitude' in data or not 'longitude' in data or not 'content' in data:
        abort(404)
    lat = data['latitude']
    long = data['longitude']
    location = geolocator.reverse([lat, long])
    if 'address' in location.raw and 'country' in location.raw['address']:
        country = location.raw['address']['country']
        if 'city' in location.raw['address']:
            city = location.raw['address']['city']
        else:
            city = "unknown city"
    else:
        country = "unkown country"
        city = "unknown city"

    datenow = datetime.datetime.now()

    travel = Travel(title=data['title'], start_date=data['start_date'],
                    end_date=data['end_date'], country=country, city=city, latitude=lat, longitude=long
                    , content=data['content'], date_posted=datenow)
    return travel
