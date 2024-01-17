#!/usr/bin/env python3
from flask import Flask, request, make_response, jsonify, session
import copy

from config import app, db
from models import User, Plant, Group, Plant_Family, Article


@app.route('/')
def index():
    return '<h1>HomeGrown Server</h1>'

@app.route("/users", methods=["GET", "POST"])
def users():
    if request.method == "GET":
        users = User.query.all()
        return make_response(jsonify([n.to_dict() for n in users]), 200)
    return make_response(jsonify({"text": "Method not allowed"}), 405)

if __name__ == '__main__':
    app.run(port=5555, debug=True)

