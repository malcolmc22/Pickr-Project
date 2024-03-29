from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_albums():
    demo = Album(
        name='demo@aa.io', user_id=1)
    marnie = Album(
        name='marnie@aa.io', user_id=2)
    bobbie = Album(
        name='bobbie@aa.io', user_id=3)
    malcolm = Album(
        name='malcolm@aa.io', user_id=4)
    alex = Album(
        name='alex@aa.io', user_id=5)
    asuna = Album(
        name='asuna@aa.io', user_id=6)
    malcolm2 = Album(
        name="Mal's Album", user_id=4)
    alex2 = Album(
        name="Alex's Album", user_id=5)
    asuna2 = Album(
        name="Asuna's Album", user_id=6)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(malcolm)
    db.session.add(alex)
    db.session.add(asuna)
    db.session.add(malcolm2)
    db.session.add(alex2)
    db.session.add(asuna2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
