from datetime import datetime

from flask_login import UserMixin

from backend import db


# from flask_login import UserMixin


class Subscribe(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('travel.id'))
    subscriber_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    notifications = db.relationship('Notification', backref='subscribe')


class Notification(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    subscribe_id = db.Column(db.Integer, db.ForeignKey('subscribe.id'))


class Follow(db.Model):
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    followed_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    gender = db.Column(db.String(20))
    birth_date = db.Column(db.Date())
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    image_file = db.Column(db.String(20))
    travels = db.relationship('Travel', backref='traveler', lazy='dynamic')
    followed = db.relationship('Follow', foreign_keys=[Follow.follower_id],
                               backref=db.backref('follower', lazy='joined'),
                               lazy='dynamic', cascade='all, delete-orphan')
    followers = db.relationship('Follow',
                                foreign_keys=[Follow.followed_id],
                                backref=db.backref('followed', lazy='joined'),
                                lazy='dynamic',
                                cascade='all, delete-orphan')

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Travel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    country = db.Column(db.Text, nullable=False)
    city = db.Column(db.Text, nullable=False)
    latitude = db.Column(db.Integer, nullable=False)
    longitude = db.Column(db.Integer, nullable=False)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Travel('{self.date_posted}')"


# db.drop_all()
# db.create_all()
# user = User(id=123, username="mabdalazez", gender="male", email="mabd@gmail.com", password="123123")
# db.session.add(user)
# db.session.commit()
# print(User.query.filter_by(id=123).first())