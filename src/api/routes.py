"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from flask_cors import CORS

# create flask app
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
   
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)



@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_email = get_jwt_identity()
    print("CURRENT")
    print(current_email)
    user = User.query.filter_by(email=current_email).first()
    print("USER")
    print(user)
    return jsonify({"id": user.id, "email": user.email }), 200


    
    
    
    # response_body = {
    #     "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    # }

    # return jsonify(response_body), 200



# Protect a route with jwt_required, which will kick out requests without a valid JWT