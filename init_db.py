from backend import db
from backend.models import User

db.drop_all()
db.create_all()
user = User(id=123, username="mabdalazez", gender="male", email="mabd@gmail.com", password="123123")
user2 = User(id=12, username="majd", gender="male", email="majd@gmail.com", password="123")
db.session.add(user)
db.session.add(user2)
db.session.commit()
print(User.query.filter_by(id=12).first())