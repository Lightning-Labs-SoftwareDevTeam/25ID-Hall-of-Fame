from models import db, User, Inductee
from werkzeug.security import generate_password_hash
import env
import initial_inductees


def create_seed_users():
    for user_data in env.USERS:
        username = user_data['username']
        password = user_data['password']
        
        if not User.query.filter_by(username=username).first():
            hashed_password = generate_password_hash(password)
            new_user = User(username=username, password=hashed_password)
            db.session.add(new_user)
    
    db.session.commit()
    print("Seed users added!")


def create_seed_inductees():
    for inductee_data in initial_inductees.INDUCTEES:
        name = inductee_data['name']
        rank = inductee_data['rank']
        unit = inductee_data['unit']
        place = inductee_data['place']
        date = inductee_data['date']
        image = inductee_data['image']
        citation = inductee_data['citation']

        new_inductee = Inductee(
            name=name,
            rank=rank,
            unit=unit,
            place=place,
            date=date,
            image=image,
            citation=citation
        )

        db.session.add(new_inductee)
    
    db.session.commit()
    print("Seed inductees added!")


if __name__ == "__main__":
    create_seed_users()
    create_seed_inductees()
