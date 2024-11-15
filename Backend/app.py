from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension
from flask_jwt_extended import JWTManager, create_access_token
from waitress import serve
from models import db, User, Inductee
from seed import create_seed_users, create_seed_inductees

import env
import models
import proj_util

import os
import logging
import base64

app = Flask(__name__)

CORS(app, origins=env.ALLOWED_ORIGINS, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = env.DB_URI
app.config["SECRET_KEY"] = env.FLASK_SECRETKEY
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {"pool_pre_ping": True}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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


@app.route('/inductees', methods=['GET'])
def get_inductees():
    all_inductees = Inductee.query.all()    
    inductees = []
    for inductee in all_inductees:
        image_base64 = None
        if inductee.image:
            image_base64 = base64.b64encode(inductee.image).decode('utf-8')
        inductees.append({
            "id": inductee.id,
            "name": inductee.name,
            "rank": inductee.rank,
            "unit": inductee.unit,
            "place": inductee.place,
            "date": inductee.date,
            "citation": inductee.citation,
            "category": inductee.category,
            "image": image_base64
        })
    
    return jsonify(inductees), 200


@app.route('/inductees', methods=['POST'])
def add_inductee():
    name = request.form.get("name")
    rank = request.form.get("rank")
    unit = request.form.get("unit")
    place = request.form.get("place")
    date = request.form.get("date")
    citation = request.form.get("citation")
    category = request.form.get("category")
    image_file = request.files.get("image")

    if not name:
        return jsonify({"message": "Name is required"}), 400
    
    if not rank:
        return jsonify({"message": "Rank is required"}), 400
    
    if not unit:
        return jsonify({"message": "Unit is required"}), 400
    
    if not citation:
        return jsonify({"message": "Citation is required"}), 400
    
    image_binary = image_file.read() if image_file else None

    new_inductee = Inductee(
        name=name, 
        rank=rank,
        unit=unit,
        place=place,
        date=date,
        citation=citation,
        image=image_binary,
        category=category
    )
    db.session.add(new_inductee)
    db.session.commit()

    return jsonify({"message": "Inductee added successfully", "id": new_inductee.id}), 201


@app.route('/inductees/<int:id>', methods=['PUT'])
def update_inductee(id):
    name = request.form.get("name")
    rank = request.form.get("rank")
    unit = request.form.get("unit")
    place = request.form.get("place")
    date = request.form.get("date")
    citation = request.form.get("citation")
    category = request.form.get("category")
    image_file = request.files.get("image")

    inductee = Inductee.query.get(id)
    if not inductee:
        return jsonify({"message": "Inductee not found"}), 404

    if name:
        inductee.name = name
    if rank:
        inductee.rank = rank
    if unit:
        inductee.unit = unit
    if place:
        inductee.place = place
    if date:
        inductee.date = date
    if citation:
        inductee.citation = citation
    if image_file:
        inductee.image = image_file.read()
    if category:
        inductee.category = category

    db.session.commit()

    return jsonify({"message": "Inductee updated successfully", "id": inductee.id}), 200


@app.route('/inductees/<int:id>', methods=['DELETE'])
def delete_inductee(id):
    inductee = Inductee.query.get(id)
    if not inductee:
        return jsonify({"message": "Inductee not found"}), 404

    db.session.delete(inductee)
    db.session.commit()

    return jsonify({"message": "Inductee deleted successfully", "id": id}), 200


if __name__ == '__main__':
    create_seed_users()
    #create_seed_inductees()
    if env.DEBUG: print("Running on localhost: http://127.0.0.1:5000")
    serve(app, host="0.0.0.0", port=5000)