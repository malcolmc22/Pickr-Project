from app.models import db, Photo, environment, SCHEMA
from sqlalchemy.sql import text




# Adds a demo albums, you can add other users here if you want
def seed_photos():
    demo = Photo(
        title='Demo Photo', description='we have the good music here', album_id = 1, user_id = 1,
        photo_url='https://pickrphotos.s3.amazonaws.com/download+(1).jpg')
    marnie = Photo(
        title='Marnie Photo', description='im kinda bad at seed data so this is whatever', album_id=2 , user_id = 2,
        photo_url='https://pickrphotos.s3.amazonaws.com/download+(2).jpg')
    bobbie = Photo(
        title='Bobbie Photo', album_id=3, user_id=3,
        photo_url='https://pickrphotos.s3.amazonaws.com/download+(3).jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))

    db.session.commit()
