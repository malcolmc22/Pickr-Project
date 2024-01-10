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
    demo2 = Photo(
        title="Demo's Cat", description='How many cat photos does this guy have?!?!', user_id = 1,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-551554_640.jpg')
    marnie2 = Photo(
        title="Marnie's Cat", description='The answer to that question? a bunch', user_id = 2,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-1508613_640.jpg')
    bobbie2 = Photo(
        title="Bobbie's Cat", description="I'm practically a cat dealer at this point", user_id = 3,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-1455468_640.jpg')
    malcolm = Photo(
        title="Malcolm's Cat", description='Yeah I really like cats', user_id = 4,
        photo_url='https://pickrphotos.s3.amazonaws.com/kitty-2948404_640.jpg')
    alex = Photo(
        title="Alex's Cat", description='I am out of ideas so something has to go here', user_id = 5,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-300572_640.jpg')
    asuna = Photo(
        title="Asuna's Cat", description='Mittens', user_id = 6,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-339400_640.jpg')
    malcolm2 = Photo(
        title="Malcolm's Other Cat", description='I gotta use all these seeder photos somehow', user_id = 4,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-3169476_640.jpg')
    alex2 = Photo(
        title="Alex's Other Cat", description='Prepare for trouble', user_id = 5,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-2143332_640.jpg')
    asuna2 = Photo(
        title="Asuna's Other Cat", description='And make it double', user_id = 6,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-3261420_640.jpg')
    malcolm3 = Photo(
        title='Double it', description='Give it to the next person also', user_id = 4,
        photo_url='https://pickrphotos.s3.amazonaws.com/cat-3523992_640.jpg')


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demo2)
    db.session.add(marnie2)
    db.session.add(bobbie2)
    db.session.add(malcolm)
    db.session.add(alex)
    db.session.add(asuna)
    db.session.add(malcolm2)
    db.session.add(alex2)
    db.session.add(asuna2)
    db.session.add(malcolm3)
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
