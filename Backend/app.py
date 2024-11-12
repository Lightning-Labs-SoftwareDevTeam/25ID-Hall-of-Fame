from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension
from flask_jwt_extended import JWTManager, create_access_token
from waitress import serve
from models import db, User
from seed import create_seed_users

import env
import models
import proj_util

import os
import logging

app = Flask(__name__)

CORS(app, origins=env.ALLOWED_ORIGINS, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = env.DB_URI
app.config["SECRET_KEY"] = env.FLASK_SECRETKEY
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {"pool_pre_ping": True}
jwt = JWTManager(app)

if env.DEBUG:
    logging.basicConfig(level=logging.DEBUG, format='{time} - %(levelname)s: %(message)s'.format(time=proj_util.now_hst("string")), filename="log.log", filemode='a')
    debug = DebugToolbarExtension(app)
else:
    logging.basicConfig(level=logging.INFO, format='{time} - %(levelname)s: %(message)s'.format(time=proj_util.now_hst("string")), filename="log.log", filemode='a')

logging.info("Application started!")

models.connect_db(app)
app.app_context().push()
models.db.create_all()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        token = create_access_token(identity=user.username)
        user.token = token
        db.session.commit()
        return jsonify({"token": token}), 200

    return jsonify({"message": "Invalid credentials"}), 401


if __name__ == '__main__':
    create_seed_users()
    if env.DEBUG: print("Running on localhost: http://127.0.0.1:5000")
    serve(app, host="0.0.0.0", port=5000)