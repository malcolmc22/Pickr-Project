from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_comments():
    demo = Comment(
        body='demo@aa.io', user_id=1, photo_id=1, first_name='Demolition', last_name='User')
    marnie = Comment(
        body='marnie@aa.io', user_id=2, photo_id=2, first_name='Marnie', last_name='Joley')
    bobbie = Comment(
        body='bobbie@aa.io', user_id=3, photo_id=3, first_name='Bobbie', last_name='Brown')
    malcolm = Comment(
        body='malcolm@aa.io', user_id=4, photo_id=4, first_name='Malcolm', last_name='Caleb')
    alex = Comment(
        body='alex@aa.io', user_id=5, photo_id=5, first_name='Alex', last_name='Alune')
    asuna = Comment(
        body='asuna@aa.io', user_id=6, photo_id=6, first_name='Asuna', last_name='Araignee')
    malcolm2 = Comment(
        body="Mal's Comment", user_id=4, photo_id=1, first_name='Malcolm', last_name='Caleb')
    alex2 = Comment(
        body="Alex's Comment", user_id=5, photo_id=2, first_name='Alex', last_name='Alune')
    asuna2 = Comment(
        body="Asuna's Comment", user_id=6, photo_id=3, first_name='Asuna', last_name='Araignee')

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
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
