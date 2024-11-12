from models import db, User
from werkzeug.security import generate_password_hash
import env

def create_seed_users():
    for user_data in env.USERS:
        username = user_data['username']
        password = user_data['password']
        
        # Check if the user already exists
        if not User.query.filter_by(username=username).first():
            hashed_password = generate_password_hash(password)
            new_user = User(username=username, password=hashed_password)
            db.session.add(new_user)
    
    db.session.commit()
    print("Seed users added!")

if __name__ == "__main__":
    create_seed_users()
