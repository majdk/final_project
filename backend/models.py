from datetime import datetime

from flask_login import UserMixin

from backend import db


# from flask_login import UserMixin

class Subscribe(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('travel.id', ondelete='CASCADE'))
    subscriber_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    notifications = db.relationship('Notification', backref='subscribe', cascade='all, delete-orphan',
                                    passive_deletes=True)
    follow_id = db.Column(db.Integer, db.ForeignKey('follow.id', ondelete='CASCADE'), nullable=False)

    def to_json(self):
        json_sub = {'post_id': self.post_id, 'subscriber_id': self.subscriber_id
            , 'notifications': [{'date': i.date_posted, 'id': i.id} for i in self.notifications]}
        return json_sub


class Notification(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    subscribe_id = db.Column(db.Integer, db.ForeignKey('subscribe.id', ondelete='CASCADE'))
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_json(self):
        json_notif = {'notif': self.post_id, 'subscriber_id': self.subscribe_id}
        return json_notif


class Follow(db.Model):
    id=db.Column(db.Integer, primary_key=True,unique=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    subscribes = db.relationship('Subscribe', backref='follow', lazy='dynamic', cascade='all, delete-orphan',
                              passive_deletes=True)

    def to_json(self):
        json_user = {'follower_id': self.follower_id, 'followed_id': self.followed_id,
                     'follower_username':self.follower.username,'followed_username':self.followed.username,
                    'follower_image':self.follower.image_file,'followed_image':self.followed.image_file
                     ,'subscribed_travels':len(self.subscribes.all())}
        return json_user

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    gender = db.Column(db.String(20))
    birth_date = db.Column(db.Date())
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    image_file = db.Column(db.String(30))
    bio = db.Column(db.String(240))
    travels = db.relationship('Travel', backref='traveler', lazy='dynamic', cascade='all, delete-orphan',
                              passive_deletes=True)
    followed = db.relationship('Follow', foreign_keys=[Follow.follower_id],
                               backref=db.backref('follower', lazy='joined'),
                               lazy='dynamic', cascade='all, delete-orphan', passive_deletes=True)
    followers = db.relationship('Follow',
                                foreign_keys=[Follow.followed_id],
                                backref=db.backref('followed', lazy='joined'),
                                lazy='dynamic',
                                cascade='all, delete-orphan', passive_deletes=True)
    subscribed_travels = db.relationship('Subscribe',
                                         backref=db.backref('subscriber', lazy='joined'),
                                         lazy='dynamic', cascade='all, delete-orphan', passive_deletes=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

    def to_json(self):
        json_user = {'id': self.id, 'username': self.username,
                     'followers':len(self.followers.all()),'followed':len(self.followed.all())
                     ,'subscribed_travels':len(self.subscribed_travels.all()),
                     'bio':self.bio,'first_name': self.first_name, 'last_name': self.last_name}
        return json_user

    def get_posts_as_list(self):
        userPosts = [i.to_json() for i in self.travels]
        return userPosts

    def get_posts_as_list_with_sub(self, other_user):
        userPosts = [i.to_json_with_sub_check(other_user) for i in self.travels]
        return userPosts

    def getfollowers(self):
        userfollowers = [i.to_json() for i in self.followers]
        return userfollowers

    def getfollowings(self):
        userfollowed = [i.to_json() for i in self.followed]
        return userfollowed




class Travel(db.Model):
    id = db.Column(db.Integer, primary_key=True,unique=True)
    title = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    country = db.Column(db.Text, nullable=False)
    city = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Text, nullable=False)
    longitude = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    subscribed_users = db.relationship('Subscribe',
                                       backref=db.backref('post', lazy='joined'),
                                       lazy='dynamic', cascade='all, delete-orphan', passive_deletes=True)

    def __repr__(self):
        return f"Travel('{self.date_posted}')"

    def to_json(self):
        json_travel = {'city': self.city, 'country': self.country,
                       'content': self.content, 'title': self.title, 'userid': self.user_id, 'id': self.id
                       ,'start_date':self.start_date,
                       'end_date':self.end_date,
                       'date_posted':self.date_posted,
                       'latitude': self.latitude,
                       'longitude':self.longitude,
                       'username': self.traveler.username,
                       'profile_pic': self.traveler.image_file}
        return json_travel

    def to_json_with_sub_check(self,checkusersub):
        sub=self.subscribed_users.filter_by(subscriber_id=checkusersub).first()
        if not sub:
            isSub = False
        else:
            isSub = True
        json_travel = {'city': self.city, 'country': self.country,
                       'content': self.content, 'title': self.title, 'userid': self.user_id, 'id': self.id,'isSub':isSub
                       ,'start_date':self.start_date,'end_date':self.end_date,
                       'date_posted':self.date_posted,
                       'latitude': self.latitude,
                       'longitude': self.longitude,
                       'username': self.traveler.username,
                       'profile_pic': self.traveler.image_file
                       }
        return json_travel

# db.drop_all()
# db.create_all()
# user = User(id=123, username="mabdalazez", gender="male", email="mabd@gmail.com", password="123123")
# db.session.add(user)
# db.session.commit()
# print(User.query.filter_by(id=123).first())
