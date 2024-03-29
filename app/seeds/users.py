from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', password='password', first_name='Demolition', last_name='User')
    marnie = User(
        email='marnie@aa.io', password='password', first_name='Marnie', last_name='Joley')
    bobbie = User(
        email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Brown')
    malcolm = User(
        email='malcolm@aa.io', password='password', first_name='Malcolm', last_name='Caleb')
    alex = User(
        email='alex@aa.io', password='password', first_name='Alex', last_name='Alune')
    asuna = User(
        email='asuna@aa.io', password='password', first_name='Asuna', last_name='Araignee')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(malcolm)
    db.session.add(alex)
    db.session.add(asuna)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
